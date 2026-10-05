const unavailable = (reason) => ({ status: "unavailable", reason, options: [], source: null, quotedAt: null });
const configured = (value) => Boolean(value && !value.startsWith("xxxxx-"));
const isHttpsOrLocal = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname));
  } catch { return false; }
};

async function gateway(base, key, path, payload) {
  if (!configured(base) || !configured(key) || !isHttpsOrLocal(base)) throw new Error("Provider gateway is not configured with an allowed URL");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8500);
  try {
    const response = await fetch(new URL(path, `${base.replace(/\/$/, "")}/`), {
      method: "POST",
      headers: { "content-type": "application/json", "authorization": `Bearer ${key}` },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}`);
    const data = await response.json();
    if (!data || !Array.isArray(data.options)) throw new Error("Provider response did not match normalized contract");
    return data;
  } finally { clearTimeout(timer); }
}

function finiteAmount(value) { return Number.isFinite(value) && value >= 0 && value < 1_000_000; }
function freshQuote(item) { const age = Date.now() - Date.parse(item.quotedAt); return Number.isFinite(age) && age >= -60_000 && age <= 30 * 60_000; }
function cleanQuote(item, type) {
  if (!item || typeof item !== "object" || !finiteAmount(item.amount) || !["HKD", "JPY"].includes(item.currency)) return null;
  if (typeof item.source !== "string" || !item.source || !item.quotedAt || Number.isNaN(Date.parse(item.quotedAt))) return null;
  const bookingUrl = typeof item.bookingUrl === "string" && isHttpsOrLocal(item.bookingUrl) ? item.bookingUrl : null;
  return { id: String(item.id || `${type}-${item.amount}`), amount: item.amount, currency: item.currency, source: item.source.slice(0, 100), quotedAt: item.quotedAt, bookingUrl,
    origin: item.origin ? String(item.origin).toUpperCase() : undefined,
    destination: item.destination ? String(item.destination).toUpperCase() : undefined,
    title: String(item.title || type).slice(0, 120),
    district: item.district ? String(item.district) : undefined,
    durationMinutes: Number.isFinite(item.durationMinutes) ? item.durationMinutes : undefined,
    transfers: Number.isInteger(item.transfers) ? item.transfers : undefined,
  };
}

function fixtureFlight(request) {
  return { status: "fixture", source: "Sample supplier fixture — not live", quotedAt: new Date().toISOString(), options: [
    { id: "sample-hkg-kix", title: "香港 ↔ 关西机场 · 样例航班", amount: 2250, currency: "HKD", source: "Sample supplier fixture — not live", quotedAt: new Date().toISOString(), origin: request.origin, destination: "KIX", bookingUrl: null },
  ] };
}
function fixtureHotel() {
  return { status: "fixture", source: "Sample supplier fixture — not live", quotedAt: new Date().toISOString(), options: [
    { id: "sample-namba-hotel", title: "难波交通便利酒店 · 样例", amount: 2200, currency: "HKD", source: "Sample supplier fixture — not live", quotedAt: new Date().toISOString(), district: "namba", bookingUrl: null },
  ] };
}
function fixtureTransit(legs) {
  return { status: "fixture", source: "Sample transit fixture — not live", quotedAt: new Date().toISOString(), options: legs.map((leg, index) => ({
    id: `sample-leg-${index}`, day: leg.day, from: leg.from, to: leg.to, mode: "rail+walk", amount: leg.from === "kix" || leg.to === "kix" ? 1200 : leg.from === leg.to ? 0 : 420, currency: "JPY", durationMinutes: leg.from === "kix" || leg.to === "kix" ? 55 : leg.from === leg.to ? 18 : 45, transfers: leg.from === "kix" || leg.to === "kix" ? 0 : leg.from === leg.to ? 0 : 1, source: "Sample transit fixture — not live", quotedAt: new Date().toISOString(), bookingUrl: null,
  })) };
}

const sampleTickets = { "osaka-castle": 1200, "usj": 9200, "abeno-harukas": 2000, "kaiyukan": 2700, "umeda-sky": 2000 };
export async function searchTickets(ids, request, env = process.env) {
  if (!ids.length) return { status: env.DATA_MODE === "live" ? "live" : "fixture", options: [], source: "No paid attractions", quotedAt: new Date().toISOString() };
  if (env.DATA_MODE !== "live") return { status: "fixture", source: "Sample attraction prices — not live", quotedAt: new Date().toISOString(), options: ids.map((id) => ({ id, amount: sampleTickets[id] ?? 0, currency: "JPY", source: "Sample attraction prices — not live", quotedAt: new Date().toISOString(), title: id, bookingUrl: null })) };
  try {
    const data = await gateway(env.TRIP_BASE_URL, env.TRIP_API_KEY, "attractions/quotes", { ids, date: request.departureDate, currency: "JPY" });
    const options = data.options.map((x) => cleanQuote(x, "ticket")).filter((x) => x && freshQuote(x) && x.currency === "JPY" && ids.includes(x.id));
    return ids.every((id) => options.some((x) => x.id === id)) ? { status: "live", options, source: options[0].source, quotedAt: options[0].quotedAt } : unavailable("Ticket gateway did not price every selected paid attraction");
  } catch (error) { return unavailable(`Attraction ticket provider: ${error.message}`); }
}

export async function searchFlights(request, env = process.env) {
  if (env.DATA_MODE !== "live") return fixtureFlight(request);
  try {
    const data = await gateway(env.TRIP_BASE_URL, env.TRIP_API_KEY, "flights/search", { origin: request.origin, destination: "KIX", departureDate: request.departureDate, returnDate: request.returnDate, passengers: 1, currency: "HKD" });
    const options = data.options.map((x) => cleanQuote(x, "flight")).filter((x) => x && freshQuote(x) && x.origin === request.origin && x.destination === "KIX" && x.currency === "HKD");
    return options.length ? { status: "live", options, source: options[0].source, quotedAt: options[0].quotedAt } : unavailable("No verified HKG–KIX flight quote returned");
  } catch (error) { return unavailable(`Flight provider: ${error.message}`); }
}

export async function searchHotels(request, env = process.env) {
  if (env.DATA_MODE !== "live") return fixtureHotel();
  try {
    const data = await gateway(env.TRIP_BASE_URL, env.TRIP_API_KEY, "hotels/search", { city: "Osaka", checkIn: request.departureDate, checkOut: request.returnDate, rooms: 1, adults: 1, currency: "HKD", preferredDistricts: ["namba", "umeda"] });
    const options = data.options.map((x) => cleanQuote(x, "hotel")).filter((x) => x && freshQuote(x) && x.currency === "HKD");
    return options.length ? { status: "live", options, source: options[0].source, quotedAt: options[0].quotedAt } : unavailable("No verified Osaka hotel quote returned");
  } catch (error) { return unavailable(`Hotel provider: ${error.message}`); }
}

export async function searchTransit(legs, request, env = process.env) {
  if (env.DATA_MODE !== "live") return fixtureTransit(legs);
  if (!legs.length) return { status: "live", options: [], source: "No transfer legs", quotedAt: new Date().toISOString() };
  try {
    const data = await gateway(env.TRANSIT_BASE_URL, env.TRANSIT_API_KEY, "routes/batch", { legs, departureDate: request.departureDate, transport: request.transport, avoidDriving: request.transport === "public" });
    const options = data.options.map((x) => {
      const quote = cleanQuote(x, "transit");
      if (!quote || !x.from || !x.to || !Number.isFinite(x.durationMinutes) || !Number.isInteger(x.day)) return null;
      return { ...quote, day: x.day, from: String(x.from), to: String(x.to), mode: String(x.mode || "rail+walk") };
    }).filter(Boolean);
    const safe = options.filter((item) => item.currency === "JPY" && freshQuote(item) && (request.transport !== "public" || !/car|taxi|drive/i.test(item.mode)));
    const matches = legs.every((leg) => safe.some((item) => item.day === leg.day && item.from === leg.from && item.to === leg.to));
    return matches ? { status: "live", options: safe, source: safe[0].source, quotedAt: safe[0].quotedAt } : unavailable("Transit gateway did not return every requested public-transport leg");
  } catch (error) { return unavailable(`Transit provider: ${error.message}`); }
}
