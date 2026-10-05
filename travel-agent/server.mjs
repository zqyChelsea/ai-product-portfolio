import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { attractions, officialSources } from "./lib/catalog.mjs";
import { planTrip } from "./lib/planner.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4300);
const host = process.env.HOST || "127.0.0.1";
const allowedOrigins = new Set((process.env.ALLOWED_ORIGIN || `http://localhost:${port}`).split(",").map((x) => x.trim()).filter(Boolean));
const hits = new Map();
const maxBody = 64_000;

function send(res, status, body, type = "application/json; charset=utf-8", headers = {}) {
  const content = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, { "content-type": type, "content-length": Buffer.byteLength(content), "cache-control": "no-store", "x-content-type-options": "nosniff", "referrer-policy": "no-referrer", "content-security-policy": "default-src 'self'; connect-src 'self' http://localhost:* https:; img-src 'self' data:; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'", ...headers });
  res.end(content);
}

function cors(req) {
  const origin = req.headers.origin;
  if (!origin) return {};
  return allowedOrigins.has(origin) ? { "access-control-allow-origin": origin, "access-control-allow-methods": "GET, POST, OPTIONS", "access-control-allow-headers": "content-type", vary: "Origin" } : null;
}

function rateLimited(req) {
  const ip = req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const bucket = hits.get(ip) || { start: now, count: 0 };
  if (now - bucket.start > 60_000) { bucket.start = now; bucket.count = 0; }
  bucket.count += 1;
  hits.set(ip, bucket);
  return bucket.count > 20;
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > maxBody) throw new Error("Request too large");
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new Error("Invalid JSON"); }
}

export const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const path = requestUrl.pathname;
  const allow = cors(req);
  if (path.startsWith("/api/") && !allow) return send(res, 403, { error: "Origin is not allowed" });
  if (req.method === "OPTIONS" && path.startsWith("/api/")) return send(res, 204, "", "text/plain", allow);
  if (path === "/api/status" && req.method === "GET") {
    const live = process.env.DATA_MODE === "live";
    return send(res, 200, { dataMode: live ? "live" : "fixture", llmConfigured: Boolean(process.env.LLM_API_KEY && !process.env.LLM_API_KEY.startsWith("xxxxx-")),
      flightsConfigured: live && Boolean(process.env.TRIP_API_KEY && !process.env.TRIP_API_KEY.startsWith("xxxxx-")), transitConfigured: live && Boolean(process.env.TRANSIT_API_KEY && !process.env.TRANSIT_API_KEY.startsWith("xxxxx-")),
      message: live ? "Supplier gateways must return normalized, fresh quotes; check each result status." : "Sample supplier data only. No live fare, inventory or timetable is shown." }, "application/json; charset=utf-8", allow);
  }
  if (path === "/api/attractions" && req.method === "GET") return send(res, 200, { attractions, officialSources }, "application/json; charset=utf-8", allow);
  if (path === "/sample-plan.json" && req.method === "GET") {
    const start = new Date(); start.setDate(start.getDate() + 35);
    const end = new Date(start); end.setDate(end.getDate() + 4);
    const date = (value) => value.toISOString().slice(0, 10);
    const sample = await planTrip({ departureDate: date(start), returnDate: date(end), budgetHkd: 6500, transport: "public", sideTrip: "kobe", pace: "moderate", interests: ["culture", "history", "nature", "anime"], mustSee: ["osaka-castle", "kaiyukan", "nipponbashi"] }, { DATA_MODE: "fixture", MEALS_JPY_PER_DAY: "3000" });
    return send(res, 200, sample);
  }
  if (path === "/api/plan" && req.method === "POST") {
    if (rateLimited(req)) return send(res, 429, { error: "Too many planning requests; try again shortly" }, "application/json; charset=utf-8", allow);
    if (!String(req.headers["content-type"] || "").startsWith("application/json")) return send(res, 415, { error: "JSON request required" }, "application/json; charset=utf-8", allow);
    try {
      const body = await readJson(req);
      const result = await planTrip(body);
      return send(res, 200, result, "application/json; charset=utf-8", allow);
    } catch (error) {
      return send(res, error.message === "Request too large" ? 413 : 400, { error: error.message }, "application/json; charset=utf-8", allow);
    }
  }
  const staticFiles = new Map([["/", ["index.html", "text/html; charset=utf-8"]], ["/index.html", ["index.html", "text/html; charset=utf-8"]], ["/app.js", ["app.js", "text/javascript; charset=utf-8"]], ["/styles.css", ["styles.css", "text/css; charset=utf-8"]]]);
  if (req.method === "GET" && staticFiles.has(path)) {
    const [name, mime] = staticFiles.get(path);
    try { return send(res, 200, await readFile(join(root, "public", name), "utf8"), mime); }
    catch { return send(res, 500, "Static file unavailable", "text/plain; charset=utf-8"); }
  }
  return send(res, 404, { error: "Not found" });
});

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  server.listen(port, host, () => console.log(`Kansai Journey Agent listening on http://${host}:${port}`));
}
