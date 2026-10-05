import { attractions, byId, discoverAttractions } from "./catalog.mjs";
import { searchFlights, searchHotels, searchTickets, searchTransit } from "./providers.mjs";
import { calculateBudget } from "./budget.mjs";
import { enrichPlan } from "./agent.mjs";

const interests = new Set(["culture", "history", "nature", "food", "anime", "views", "shopping", "entertainment"]);
const sideTrips = new Set(["osaka", "kobe", "nara", "other"]);
const slots = [
  { label: "抵达 · 难波", focus: "namba", capacity: 2.5 },
  { label: "城市历史与梅田", focus: "central", capacity: 6.5 },
  { label: "大阪湾", focus: "bay", capacity: 7.5 },
  { label: "近郊或周边城市", focus: "flex", capacity: 6.5 },
  { label: "个人兴趣 · 返程", focus: "namba", capacity: 2.5 },
];

function dateDays(start, end) {
  const a = Date.parse(`${start}T00:00:00Z`);
  const b = Date.parse(`${end}T00:00:00Z`);
  return Number.isFinite(a) && Number.isFinite(b) ? Math.round((b - a) / 86_400_000) : NaN;
}

export function validateRequest(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Request must be an object");
  const departureDate = String(raw.departureDate || "");
  const returnDate = String(raw.returnDate || "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(departureDate) || !/^\d{4}-\d{2}-\d{2}$/.test(returnDate) || dateDays(departureDate, returnDate) !== 4) throw new Error("Choose a valid five-day, four-night date range");
  const budgetHkd = Number(raw.budgetHkd);
  if (!Number.isFinite(budgetHkd) || budgetHkd < 1000 || budgetHkd > 100000) throw new Error("Budget must be between HK$1,000 and HK$100,000");
  const mustSee = Array.isArray(raw.mustSee) ? [...new Set(raw.mustSee)] : [];
  if (mustSee.length > 10 || mustSee.some((id) => !byId.has(id))) throw new Error("Unknown or excessive attraction selection");
  const pickedInterests = Array.isArray(raw.interests) ? [...new Set(raw.interests)] : [];
  if (pickedInterests.length > 8 || pickedInterests.some((id) => !interests.has(id))) throw new Error("Unknown interest selection");
  const customInterests = Array.isArray(raw.customInterests) ? raw.customInterests.map((x) => String(x).trim()).filter(Boolean) : [];
  if (customInterests.length > 3) throw new Error("Choose at most three custom interests");
  if (customInterests.some((x) => x.length > 80)) throw new Error("Custom interest is too long");
  const sideTrip = String(raw.sideTrip || "osaka");
  if (!sideTrips.has(sideTrip)) throw new Error("Unknown side-trip choice");
  const transport = String(raw.transport || "public");
  if (!["public", "mixed"].includes(transport)) throw new Error("Choose public transport or a transit/taxi mix");
  const pace = String(raw.pace || "moderate");
  if (!["relaxed", "moderate", "packed"].includes(pace)) throw new Error("Unknown pace");
  const customAttractions = Array.isArray(raw.customAttractions)
    ? raw.customAttractions.map((x) => String(x).trim()).filter(Boolean) : [];
  if (customAttractions.length > 3) throw new Error("Choose at most three custom attractions");
  if (customAttractions.some((x) => x.length > 80)) throw new Error("Custom attraction is too long");
  const customSideTrip = sideTrip === "other" ? String(raw.customSideTrip || "").trim().slice(0, 80) : "";
  if (sideTrip === "other" && !customSideTrip) throw new Error("Name the other side-trip destination");
  return { origin: "HKG", arrivalAirport: "KIX", departureDate, returnDate, budgetHkd, mustSee, interests: pickedInterests, customInterests, sideTrip, customSideTrip, transport, pace, customAttractions };
}

function dayPreferences(place) {
  if (place.id === "usj") return [2];
  if (place.district === "namba") return [0, 4, 1];
  if (place.district === "central" || place.district === "kita") return [1, 3];
  if (place.district === "bay") return [2, 3];
  if (place.district === "tennoji" || place.district === "south" || place.district === "north") return [3, 1];
  return [3, 1];
}

function fits(day, place, pace) {
  const factor = pace === "relaxed" ? 0.75 : pace === "packed" ? 1.15 : 1;
  if (day.sideTrip) return false;
  if (place.fullDay && day.stops.length > 0) return false;
  if (day.stops.some((item) => item.fullDay)) return false;
  return day.stops.reduce((sum, item) => sum + item.hours, 0) + place.hours <= day.capacity * factor;
}

export function buildRoute(request) {
  const days = slots.map((slot, index) => ({ day: index + 1, date: new Date(Date.parse(`${request.departureDate}T00:00:00Z`) + index * 86_400_000).toISOString().slice(0, 10), ...slot, stops: [], sideTrip: null, transit: [], note: index === 0 || index === 4 ? "航班时间未核实；抵达/返程日留出缓冲。" : "按区域编排，实际车次与营业时间待核实。" }));
  if (request.sideTrip !== "osaka") {
    days[3].sideTrip = request.sideTrip === "kobe" ? "神户一日游" : request.sideTrip === "nara" ? "奈良一日游" : `${request.customSideTrip}一日游（待核实）`;
    days[3].focus = request.sideTrip;
  }
  const unresolved = request.customAttractions.map((name) => ({ name, reason: "自定义景点尚无可靠位置资料，需确认后再插入路线。" }));
  const pinned = request.mustSee.map((id) => byId.get(id)).filter(Boolean).sort((a, b) => Number(Boolean(b.fullDay)) - Number(Boolean(a.fullDay)) || b.hours - a.hours);
  for (const place of pinned) {
    const preferred = dayPreferences(place);
    const candidate = preferred.find((index) => fits(days[index], place, request.pace));
    if (candidate === undefined) unresolved.push({ id: place.id, name: place.name, reason: "五日行程容量不足；请放宽节奏、减少必去景点或取消周边一日游。" });
    else days[candidate].stops.push({ ...place, pinned: true });
  }
  const suggestions = discoverAttractions(request.interests, []).filter((place) => !request.mustSee.includes(place.id) && place.match > 0 && !place.fullDay);
  for (const day of days) {
    if (day.sideTrip || day.stops.some((x) => x.fullDay)) continue;
    for (const place of suggestions) {
      if (day.stops.length >= (day.day === 1 || day.day === 5 ? 1 : 2)) break;
      if (days.some((item) => item.stops.some((stop) => stop.id === place.id))) continue;
      if (day.day === 2 && !["central", "kita"].includes(place.district)) continue;
      if (day.day === 3 && place.district !== "bay") continue;
      if ([1, 5].includes(day.day) && place.district !== "namba") continue;
      if (day.day === 4 && day.stops.some((stop) => stop.pinned) && !day.stops.some((stop) => stop.district === place.district)) continue;
      const preferred = dayPreferences(place);
      if (!preferred.includes(day.day - 1) || !fits(day, place, request.pace)) continue;
      day.stops.push({ ...place, pinned: false });
    }
  }
  for (const day of days) {
    day.stops.sort((a, b) => Number(b.pinned) - Number(a.pinned) || a.district.localeCompare(b.district));
  }
  const placed = new Set(days.flatMap((day) => day.stops.map((stop) => stop.id)));
  for (const id of request.mustSee) if (!placed.has(id) && !unresolved.some((x) => x.id === id)) unresolved.push({ id, name: byId.get(id).name, reason: "未能安排；需人工调整。" });
  return { days, unresolved };
}

function legsFor(day, stops) {
  const places = day.sideTrip ? [day.focus] : stops.map((x) => x.district);
  const legs = day.day === 1 ? [{ day: day.day, from: "kix", to: "namba" }] : [];
  let from = "namba";
  for (const to of places) {
    if (to !== from) legs.push({ day: day.day, from, to });
    from = to;
  }
  if (from !== "namba") legs.push({ day: day.day, from, to: "namba" });
  if (day.day === 5) legs.push({ day: day.day, from: "namba", to: "kix" });
  return legs;
}

function permutations(items) {
  if (items.length <= 1) return [items];
  return items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map((rest) => [item, ...rest]));
}

function routeCandidates(days) {
  const seen = new Set();
  const legs = [];
  for (const day of days) {
    for (const ordering of permutations(day.stops)) {
      for (const leg of legsFor(day, ordering)) {
        const key = `${leg.day}:${leg.from}:${leg.to}`;
        if (!seen.has(key)) { seen.add(key); legs.push(leg); }
      }
    }
  }
  return legs;
}

function distance(a, b) {
  const lat = (a.latitude - b.latitude) * 111;
  const lon = (a.longitude - b.longitude) * 91;
  return Math.hypot(lat, lon);
}

function geoScore(stops) {
  const base = { latitude: 34.668, longitude: 135.502 };
  const sequence = [base, ...stops, base];
  return sequence.slice(1).reduce((sum, item, index) => sum + distance(sequence[index], item), 0);
}

function chooseOrder(day, transitOptions) {
  if (day.sideTrip || day.stops.length < 2) return { stops: day.stops, legs: legsFor(day, day.stops), method: "single-route" };
  const choices = permutations(day.stops).map((stops) => {
    const legs = legsFor(day, stops);
    const quotes = legs.map((leg) => transitOptions.find((x) => x.day === leg.day && x.from === leg.from && x.to === leg.to && recent(x)));
    const complete = quotes.every(Boolean);
    const score = complete ? quotes.reduce((sum, x) => sum + x.durationMinutes + x.amount / 30 + (x.transfers || 0) * 5, 0) : Infinity;
    return { stops, legs, complete, score, geo: geoScore(stops) };
  });
  const verified = choices.filter((x) => x.complete).sort((a, b) => a.score - b.score || a.geo - b.geo)[0];
  const chosen = verified || choices.sort((a, b) => a.geo - b.geo)[0];
  return { stops: chosen.stops, legs: chosen.legs, method: verified ? "verified-transit" : "geographic-draft" };
}

function cheapest(options) { return options.length ? [...options].sort((a, b) => a.amount - b.amount)[0] : null; }
function recent(quote) { return quote && Date.now() - Date.parse(quote.quotedAt) < 30 * 60 * 1000 && Date.parse(quote.quotedAt) <= Date.now() + 60_000; }

export async function planTrip(raw, env = process.env) {
  const request = validateRequest(raw);
  const route = buildRoute(request);
  const candidates = routeCandidates(route.days);
  const paidIds = [...new Set(route.days.flatMap((day) => day.stops.filter((x) => x.ticket === "paid").map((x) => x.id)))];
  const [flights, hotels, transit, tickets] = await Promise.all([
    searchFlights(request, env), searchHotels(request, env), searchTransit(candidates, request, env), searchTickets(paidIds, request, env),
  ]);
  const flight = cheapest(flights.options.filter(recent));
  const hotel = cheapest(hotels.options.filter(recent));
  const chosenLegs = [];
  for (const day of route.days) {
    const chosen = chooseOrder(day, transit.options);
    day.stops = chosen.stops;
    day.routeMethod = chosen.method;
    chosenLegs.push(...chosen.legs);
    day.transit = chosen.legs.map((leg) => transit.options.find((x) => x.day === leg.day && x.from === leg.from && x.to === leg.to && recent(x)) || null).filter(Boolean).map((x) => ({ from: x.from, to: x.to, mode: x.mode, durationMinutes: x.durationMinutes, amount: x.amount, currency: x.currency, source: x.source, quotedAt: x.quotedAt }));
  }
  const transitComplete = transit.status !== "unavailable" && route.days.every((day) => day.transit.length === chosenLegs.filter((leg) => leg.day === day.day).length);
  const transitQuote = transitComplete ? route.days.flatMap((day) => day.transit).reduce((sum, x) => sum + x.amount, 0) : null;
  const ticketQuote = tickets.status !== "unavailable" && tickets.options.length === paidIds.length && tickets.options.every(recent)
    ? tickets.options.reduce((sum, x) => sum + x.amount, 0) : null;
  const budget = calculateBudget({ capHkd: request.budgetHkd, flight, hotel, transit: transitQuote, tickets: ticketQuote, days: 5,
    mealsJpyPerDay: Number(env.MEALS_JPY_PER_DAY || 3000), jpyPerHkd: env.DATA_MODE === "live" ? Number(env.JPY_PER_HKD) : 19, mode: env.DATA_MODE === "live" ? "live" : "fixture" });
  for (const day of route.days) {
    day.stops = day.stops.map(({ id, name, en, district, hours, interests: tags, pinned, ticket }) => ({ id, name, en, district, hours, interests: tags, pinned, ticket, ticketQuote: tickets.options.find((x) => x.id === id) || null }));
  }
  const warnings = [
    ...route.unresolved.map((item) => `${item.name}：${item.reason}`),
    ...request.customInterests.map((item) => `自定义偏好「${item}」已记录，但景点目录没有对应标签；需人工核对新增建议。`),
    ...[flights, hotels, transit, tickets].filter((x) => x.status === "unavailable").map((x) => x.reason),
  ];
  if (route.days.filter((day) => day.stops.some((stop) => stop.district === "bay")).length > 1) warnings.push("你钉选的环球影城与海游馆分别占用大阪湾两天；若要减少跨区往返，可考虑调整其中一项。");
  if (budget.status === "unknown") warnings.push("报价或汇率缺失，不能判定是否在预算内。");
  if (budget.status === "sample") warnings.push("样例价格仅用于演示流程，并非实时可订价格。");
  if (budget.status === "over") warnings.push("当前已核价方案超出预算，请更换航班、住宿或付费景点。");
  const agent = await enrichPlan({ request, route, budget, warnings }, env);
  return { request, days: route.days, unresolved: route.unresolved, quotes: { flights, hotels, transit, tickets, selectedFlight: flight, selectedHotel: hotel }, budget, warnings, agent, provenance: { dataMode: env.DATA_MODE === "live" ? "live" : "fixture", generatedAt: new Date().toISOString() } };
}

export { attractions };
