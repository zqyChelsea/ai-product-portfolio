import test from "node:test";
import assert from "node:assert/strict";
import { buildRoute, planTrip, validateRequest } from "../lib/planner.mjs";
import { calculateBudget } from "../lib/budget.mjs";
import { enrichPlan } from "../lib/agent.mjs";

const request = {
  departureDate: "2026-11-15", returnDate: "2026-11-19", budgetHkd: 6500,
  transport: "public", sideTrip: "kobe", pace: "moderate",
  interests: ["culture", "history", "nature", "anime"],
  mustSee: ["osaka-castle", "kaiyukan", "nipponbashi"],
};

test("requires a real five-day date range and a bounded budget", () => {
  assert.equal(validateRequest(request).arrivalAirport, "KIX");
  assert.throws(() => validateRequest({ ...request, returnDate: "2026-11-20" }), /five-day/);
  assert.throws(() => validateRequest({ ...request, budgetHkd: 0 }), /Budget/);
  assert.throws(() => validateRequest({ ...request, mustSee: ["not-in-catalog"] }), /attraction/);
});

test("never silently drops selected must-sees", () => {
  const selected = ["usj", "kaiyukan", "osaka-castle", "umeda-sky", "abeno-harukas", "shinsaibashi", "dotonbori", "nipponbashi", "minoh", "sumiyoshi"];
  const route = buildRoute(validateRequest({ ...request, mustSee: selected }));
  const placed = route.days.flatMap((day) => day.stops.map((x) => x.id));
  const unresolved = route.unresolved.map((x) => x.id);
  for (const id of selected) assert(placed.includes(id) || unresolved.includes(id), `Must-see ${id} vanished`);
  assert(route.days[2].stops.some((x) => x.id === "usj"));
  assert.equal(route.days[2].stops.length, 1, "Full-day theme park must not be crowded");
});

test("fixture mode is visibly sample and budget sums only selected transit legs", async () => {
  const result = await planTrip(request, { DATA_MODE: "fixture", MEALS_JPY_PER_DAY: "3000" });
  assert.equal(result.provenance.dataMode, "fixture");
  assert.equal(result.budget.status, "sample");
  assert.equal(result.agent.status, "not-configured");
  assert.equal(result.quotes.flights.status, "fixture");
  assert.equal(result.quotes.selectedFlight.destination, "KIX");
  assert(result.days.some((day) => day.sideTrip === "神户一日游"));
  const selectedTransit = result.days.flatMap((day) => day.transit).reduce((sum, x) => sum + x.amount, 0);
  assert.equal(result.budget.breakdown.transitJpy, selectedTransit);
  assert(result.days[0].transit.some((leg) => leg.from === "kix" && leg.to === "namba"));
  assert(result.days[4].transit.some((leg) => leg.from === "namba" && leg.to === "kix"));
});

test("live mode without licensed gateways never claims real price or affordability", async () => {
  const result = await planTrip(request, { DATA_MODE: "live", TRIP_BASE_URL: "xxxxx-url", TRIP_API_KEY: "xxxxx-api", TRANSIT_BASE_URL: "xxxxx-url", TRANSIT_API_KEY: "xxxxx-api", JPY_PER_HKD: "xxxxx-rate" });
  assert.equal(result.quotes.flights.status, "unavailable");
  assert.equal(result.quotes.hotels.status, "unavailable");
  assert.equal(result.quotes.transit.status, "unavailable");
  assert.equal(result.budget.status, "unknown");
  assert.equal(result.budget.totalHkd, null);
});

test("missing costs are not treated as zero", () => {
  const result = calculateBudget({ capHkd: 6500, flight: null, hotel: null, transit: null, tickets: null, days: 5, mealsJpyPerDay: 3000, jpyPerHkd: 19, mode: "live" });
  assert.equal(result.status, "unknown");
  assert.equal(result.totalHkd, null);
  assert(result.unknown.includes("flight"));
});

test("licensed gateway contract can complete a live plan without fixture fallback", async () => {
  const previous = globalThis.fetch;
  const now = new Date().toISOString();
  globalThis.fetch = async (url, options) => {
    const payload = JSON.parse(options.body);
    const path = String(url);
    let optionsList = [];
    if (path.endsWith("/flights/search")) optionsList = [{ id: "f1", title: "HKG KIX", origin: "HKG", destination: "KIX", amount: 2100, currency: "HKD", source: "Mock licensed gateway", quotedAt: now }];
    if (path.endsWith("/hotels/search")) optionsList = [{ id: "h1", title: "Four nights Namba", amount: 2200, currency: "HKD", source: "Mock licensed gateway", quotedAt: now }];
    if (path.endsWith("/attractions/quotes")) optionsList = payload.ids.map((id) => ({ id, amount: 1300, currency: "JPY", source: "Mock licensed gateway", quotedAt: now }));
    if (path.endsWith("/routes/batch")) optionsList = payload.legs.map((leg, index) => ({ id: `r${index}`, ...leg, amount: 300, currency: "JPY", mode: "rail+walk", durationMinutes: 28, transfers: 0, source: "Mock licensed gateway", quotedAt: now }));
    return new Response(JSON.stringify({ options: optionsList }), { status: 200, headers: { "content-type": "application/json" } });
  };
  try {
    const result = await planTrip(request, { DATA_MODE: "live", TRIP_BASE_URL: "https://gateway.example/", TRIP_API_KEY: "test-key", TRANSIT_BASE_URL: "https://gateway.example/", TRANSIT_API_KEY: "test-key", JPY_PER_HKD: "19", MEALS_JPY_PER_DAY: "3000" });
    assert.equal(result.quotes.flights.status, "live");
    assert.equal(result.quotes.transit.status, "live");
    assert.equal(result.budget.status, "within");
    assert(result.days.some((day) => day.routeMethod === "verified-transit"));
  } finally { globalThis.fetch = previous; }
});

test("configured language model enriches trade-offs without owning factual fields", async () => {
  const previous = globalThis.fetch;
  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(options.body);
    assert.equal(body.model, "test-model");
    assert.equal(body.response_format.type, "json_object");
    return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify({ summary: "海游馆与梅田分开安排，少走回头路。", suggestions: ["先核对机票和酒店。"] }) } }] }), { status: 200 });
  };
  try {
    const result = await enrichPlan({ request, route: buildRoute(validateRequest(request)), budget: { status: "unknown" }, warnings: [] }, { LLM_BASE_URL: "https://model.example/v1", LLM_API_KEY: "test-key", LLM_MODEL: "test-model" });
    assert.equal(result.status, "ready");
    assert.match(result.summary, /海游馆/);
  } finally { globalThis.fetch = previous; }
});
