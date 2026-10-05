const fallbackAttractions = [
  ["osaka-castle", "大阪城", "中央區 · 歷史", ["history", "culture"]],
  ["usj", "日本環球影城", "大阪灣 · 全天", ["anime", "entertainment"]],
  ["abeno-harukas", "阿倍野 Harukas", "天王寺 · 城市景觀", ["views", "culture"]],
  ["shinsaibashi", "心齋橋", "難波 · 街區", ["food", "culture", "shopping"]],
  ["dotonbori", "道頓堀", "難波 · 美食", ["food", "culture"]],
  ["kaiyukan", "大阪海遊館", "大阪灣 · 海洋", ["nature", "family"]],
  ["umeda-sky", "梅田藍天大廈", "梅田 · 景觀", ["views", "culture"]],
  ["nipponbashi", "日本橋電電城", "難波 · 動漫", ["anime", "shopping"]],
  ["minoh", "箕面公園", "北部 · 自然", ["nature", "views"]],
  ["sumiyoshi", "住吉大社", "南部 · 歷史", ["history", "culture"]],
].map(([id, name, detail, interests]) => ({ id, name, detail, interests,
  fullDay: id === "usj", ticket: ["osaka-castle", "usj", "abeno-harukas", "kaiyukan", "umeda-sky"].includes(id) ? "paid" : "free" }));

const state = {
  attractions: fallbackAttractions,
  mustSee: new Set(["osaka-castle", "kaiyukan", "nipponbashi"]),
  customAttractions: [],
  interests: new Set(["culture", "history", "nature", "anime"]),
  budget: "6500", transport: "public", sideTrip: "kobe", pace: "moderate", filter: "all",
  apiBase: localStorage.getItem("journey-agent-api-base") || "",
};
const $ = (selector) => document.querySelector(selector);
const money = (amount, currency = "HKD") => amount == null ? "待核價" : new Intl.NumberFormat("en-HK", { maximumFractionDigits: 0, style: "currency", currency }).format(amount);
const e = (tag, className, value) => { const node = document.createElement(tag); if (className) node.className = className; if (value != null) node.textContent = value; return node; };
const add = (parent, ...children) => { children.forEach((child) => parent.append(child)); return parent; };
const apiUrl = (path) => new URL(path.replace(/^\//, ""), `${(state.apiBase || window.location.origin).replace(/\/$/, "")}/`).toString();

function setDates() {
  const depart = new Date();
  depart.setDate(depart.getDate() + 35);
  const back = new Date(depart);
  back.setDate(back.getDate() + 4);
  const date = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  $("#departure-date").value = date(depart);
  $("#return-date").value = date(back);
  $("#departure-date").min = date(new Date());
}

function renderAttractions() {
  const grid = $("#attraction-grid");
  grid.replaceChildren();
  const filtered = state.attractions.filter((item) => state.filter === "all" || item.interests.includes(state.filter) || (state.filter === "culture" && item.interests.includes("history")) || (state.filter === "anime" && item.interests.includes("entertainment")));
  for (const item of filtered) {
    const selected = state.mustSee.has(item.id);
    const button = e("button", `attraction-card${selected ? " selected" : ""}`);
    button.type = "button";
    button.setAttribute("aria-pressed", String(selected));
    button.style.setProperty("--accent", item.interests.includes("nature") ? "#e7f6ee" : item.interests.includes("anime") ? "#f2edff" : "#ecf3ff");
    add(button, e("span", "district", (item.detail || item.district || "大阪").toUpperCase()), e("strong", "", item.name), e("small", "", item.fullDay ? "建議留出一整天" : item.ticket === "paid" ? "門票需實時核價" : "按區域編排行程"), e("span", "pin", selected ? "✓ 已釘選" : "+ 必去"));
    button.addEventListener("click", () => { if (selected) state.mustSee.delete(item.id); else state.mustSee.add(item.id); renderAttractions(); });
    grid.append(button);
  }
  $("#selected-count").textContent = `已選 ${state.mustSee.size + state.customAttractions.length} 個`;
}

function renderCustomTags() {
  const row = $("#custom-tags"); row.replaceChildren();
  for (const name of state.customAttractions) {
    const button = e("button", "", `${name} ×`);
    button.type = "button";
    button.title = `移除 ${name}`;
    button.addEventListener("click", () => { state.customAttractions = state.customAttractions.filter((x) => x !== name); renderCustomTags(); renderAttractions(); });
    row.append(button);
  }
}

function selectionHandlers() {
  document.querySelectorAll(".choice-row[data-group], .filter-row[data-group]").forEach((row) => {
    row.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button || !row.contains(button)) return;
      const group = row.dataset.group;
      const value = button.dataset.value;
      if (group === "interests") { if (value === "other") { button.classList.toggle("active"); button.setAttribute("aria-pressed", String(button.classList.contains("active"))); $("#custom-interest-wrap").classList.toggle("hidden", !button.classList.contains("active")); return; } if (state.interests.has(value)) state.interests.delete(value); else state.interests.add(value); button.classList.toggle("active"); button.setAttribute("aria-pressed", String(state.interests.has(value))); return; }
      for (const sibling of row.querySelectorAll("button")) { sibling.classList.remove("active"); sibling.setAttribute("aria-pressed", "false"); }
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      if (group === "budget") { state.budget = value; $("#custom-budget-wrap").classList.toggle("hidden", value !== "other"); }
      if (group === "sideTrip") { state.sideTrip = value; $("#custom-side-wrap").classList.toggle("hidden", value !== "other"); }
      if (group === "transport") state.transport = value;
      if (group === "pace") state.pace = value;
      if (group === "filter") { state.filter = value; renderAttractions(); }
    });
  });
  document.querySelectorAll(".choice-row button, .filter-row button").forEach((button) => button.setAttribute("aria-pressed", String(button.classList.contains("active"))));
}

function requestData() {
  const budgetHkd = state.budget === "other" ? Number($("#custom-budget").value) : Number(state.budget);
  const sideTrip = state.sideTrip;
  return { departureDate: $("#departure-date").value, returnDate: $("#return-date").value, budgetHkd,
    transport: state.transport, sideTrip, customSideTrip: sideTrip === "other" ? $("#custom-side").value.trim() : "",
    pace: state.pace, interests: [...state.interests], customInterests: $("#custom-interest-wrap").classList.contains("hidden") ? [] : [$("#custom-interest").value.trim()].filter(Boolean), mustSee: [...state.mustSee], customAttractions: state.customAttractions };
}

function checkForm(data) {
  if (!data.departureDate || !data.returnDate) return "請先選擇出發和回程日期。";
  const diff = (Date.parse(`${data.returnDate}T00:00:00Z`) - Date.parse(`${data.departureDate}T00:00:00Z`)) / 86_400_000;
  if (diff !== 4) return "目前的案例是五日四夜，回程日期請設為出發後第四天。";
  if (!Number.isFinite(data.budgetHkd) || data.budgetHkd < 1000) return "請設定至少 HK$1,000 的總預算。";
  if (data.sideTrip === "other" && !data.customSideTrip) return "請寫下想去的周邊城市。";
  return null;
}

async function checkConnection() {
  state.apiBase = $("#api-base").value.trim();
  localStorage.setItem("journey-agent-api-base", state.apiBase);
  try {
    const response = await fetch(apiUrl("api/status"), { signal: AbortSignal.timeout(6000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const status = await response.json();
    $("#connection-dot").classList.add("on");
    $("#check-connection").textContent = status.dataMode === "live" ? "已連接 · 正式數據模式" : "已連接 · 樣例數據模式";
    const catalog = await fetch(apiUrl("api/attractions"), { signal: AbortSignal.timeout(6000) });
    if (catalog.ok) { const data = await catalog.json(); if (Array.isArray(data.attractions)) { state.attractions = data.attractions.map((item) => ({ ...item, name: fallbackAttractions.find((known) => known.id === item.id)?.name || item.name, detail: fallbackAttractions.find((known) => known.id === item.id)?.detail || item.district })); renderAttractions(); } }
  } catch {
    $("#connection-dot").classList.remove("on");
    $("#check-connection").textContent = "未連接：請檢查服務 URL / CORS";
  }
}

function sourceStatus(name, source) {
  const row = e("div", "source-row");
  const time = source?.quotedAt ? new Date(source.quotedAt).toLocaleString("zh-HK", { timeZone: "Asia/Hong_Kong", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "";
  const status = source?.status === "live" ? `已報價 · ${source.source || "已驗證"} · ${time}` : source?.status === "fixture" ? "樣例數據 · 非實時" : "未獲取 · 待核價";
  add(row, e("span", "", name), e("b", source?.status === "unavailable" ? "unknown" : "", status));
  return row;
}

function renderResult(data, sample = false) {
  const root = $("#result-content"); root.replaceChildren();
  const mode = data.provenance?.dataMode === "live" && !sample ? "live" : "sample";
  root.append(e("div", `mode-banner${mode === "live" ? " live" : ""}`, mode === "live" ? "已連接授權數據源。每筆報價仍需查看來源與時間，落單前請在供應商頁面再確認。" : `樣例方案 · 機票、酒店、交通及匯率均為測試數據，不能用於預訂或判斷實際花費。${sample ? "此固定樣例不會隨當前選項改變。" : ""}`));
  root.append(e("h3", "result-title", "五天，慢慢走得通。"));
  root.append(e("p", "result-subtitle", `${data.request?.departureDate || "五日"} 出發 · 香港 → 關西機場 · ${data.request?.sideTrip === "kobe" ? "神戶一日" : data.request?.sideTrip === "nara" ? "奈良一日" : "大阪周邊"}`));
  const map = e("div", "route-map");
  map.append(e("span", "route-map-caption", "關西區域示意 · 非導航地圖"));
  const position = { bay: [15, 55], kita: [59, 22], central: [66, 48], namba: [58, 72], tennoji: [74, 84], north: [42, 12], south: [51, 89], kobe: [8, 29], nara: [88, 58] };
  const seen = new Set();
  for (const day of data.days || []) {
    const districts = day.sideTrip ? [day.focus] : day.stops?.map((stop) => stop.district) || [];
    for (const district of districts) {
      if (!position[district] || seen.has(district)) continue;
      seen.add(district);
      const marker = e("span", "route-map-marker", `${district.toUpperCase()} · D${day.day}`);
      marker.style.left = `${position[district][0]}%`;
      marker.style.top = `${position[district][1]}%`;
      map.append(marker);
    }
  }
  root.append(map);
  const days = e("div", "result-days");
  const dayLabels = ["抵達 · 難波", "城市歷史與梅田", "大阪灣", "近郊或周邊城市", "個人興趣 · 回程"];
  for (const day of data.days || []) {
    const card = e("article", "result-day");
    const heading = e("div", "result-day-heading"); add(heading, e("span", "", `DAY ${String(day.day).padStart(2, "0")}`), e("strong", "", dayLabels[day.day - 1] || day.label)); card.append(heading);
    card.append(e("small", "", `${day.date} · ${day.sideTrip ? "周邊城市一日" : day.focus} · ${[1, 5].includes(day.day) ? "航班時間待核實，保留抵達／返程緩衝。" : "按區域編排；班次與營業時間待核實。"}`));
    if (day.sideTrip) card.append(e("div", "result-stop pinned", day.focus === "kobe" ? "神戶一日遊" : day.focus === "nara" ? "奈良一日遊" : day.sideTrip));
    for (const stop of day.stops || []) {
      const row = e("div", `result-stop${stop.pinned ? " pinned" : ""}`); row.append(document.createTextNode(fallbackAttractions.find((known) => known.id === stop.id)?.name || stop.name));
      if (stop.pinned) row.append(e("em", "", "你選的必去"));
      card.append(row);
    }
    if (!day.stops?.length && !day.sideTrip) card.append(e("div", "result-stop", "保留彈性時段，按當日狀態調整。"));
    const verifiedLegs = day.transit || [];
    card.append(e("div", "result-transit", verifiedLegs.length ? `交通：${verifiedLegs.map((leg) => `${leg.from} → ${leg.to} · ${leg.durationMinutes} 分鐘 · ${money(leg.amount, leg.currency)}`).join("；")}（${mode === "live" ? "供應商回傳" : "樣例"}）` : "交通路線與費用尚未核實；請到 JR / Osaka Metro 官方查詢。"));
    days.append(card);
  }
  root.append(days);
  const offers = e("div", "offer-list");
  for (const [kind, offer] of [["往返機票", data.quotes?.selectedFlight], ["四晚酒店", data.quotes?.selectedHotel]]) {
    const card = e("div", "offer-card");
    const left = e("div"); add(left, e("small", "", kind), e("strong", "", mode === "sample" && offer ? kind === "往返機票" ? "香港 ↔ 關西機場 · 樣例航班" : "難波交通便利酒店 · 樣例" : offer?.title || "尚待供應商報價"));
    const right = e("div"); right.append(e("b", "", offer ? money(offer.amount, offer.currency) : "待核價"));
    if (offer?.bookingUrl && mode === "live") { const link = e("a", "", "到供應商核對 ↗"); link.href = offer.bookingUrl; link.target = "_blank"; link.rel = "noopener noreferrer"; right.append(link); }
    card.append(left, right); offers.append(card);
  }
  root.append(offers);
  const budget = e("div", `budget-card${data.budget?.status === "over" ? " over" : data.budget?.status === "unknown" ? " unknown" : ""}`);
  const total = data.budget?.totalHkd;
  add(budget, e("small", "", "TOTAL BUDGET / HKD"), e("strong", "", total == null ? "仍缺關鍵報價" : money(total)), e("p", "", total == null ? `無法判斷是否低於 ${money(data.budget?.capHkd || 0)}；缺少：${(data.budget?.unknown || []).join("、")}` : `${data.budget?.status === "sample" ? "樣例估算" : data.budget?.status === "over" ? "已超預算" : "目前在預算內"} · 上限 ${money(data.budget.capHkd)} · 餘額 ${money(data.budget.remainingHkd)}。包含餐費假設，尚需核對實際支付條款。`));
  root.append(budget);
  const sources = e("div", "source-list"); sources.append(e("h3", "", "價格與路線來自哪裏？"));
  add(sources, sourceStatus("往返機票", data.quotes?.flights), sourceStatus("四晚住宿", data.quotes?.hotels), sourceStatus("區域交通", data.quotes?.transit), sourceStatus("付費景點", data.quotes?.tickets)); root.append(sources);
  const verify = e("div", "verify-links");
  for (const [text, url] of [["JR 西日本時刻・票價 ↗", "https://www.jr-odekake.net/railroad/index.html"], ["Osaka Metro 路線・票價 ↗", "https://kensaku.osakametro.co.jp/route/howto/en.html"]]) { const link = e("a", "", text); link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; verify.append(link); }
  root.append(verify);
  if (data.agent) {
    const agent = e("div", "agent-summary"); add(agent, e("h3", "", data.agent.status === "ready" ? "✦ Agent 的取捨" : "✦ 規劃說明"), e("p", "", data.agent.status === "not-configured" ? "目前由可檢查的路線規則生成示例；接入語言模型後，Agent 會解釋取捨與調整方向。" : data.agent.summary)); root.append(agent);
  }
  if (data.unresolved?.length || data.warnings?.length) {
    const box = e("div", "warnings"); box.append(e("h3", "", "出發前仍要確認")); const list = e("ul");
    const warningText = (value) => ({
      "样例价格仅用于演示流程，并非实时可订价格。": "樣例價格只供展示流程，並非即時可訂價格。",
      "报价或汇率缺失，不能判定是否在预算内。": "報價或匯率缺失，不能判斷是否在預算內。",
      "当前已核价方案超出预算，请更换航班、住宿或付费景点。": "目前已核價方案超出預算，請調整航班、住宿或付費景點。",
      "你钉选的环球影城与海游馆分别占用大阪湾两天；若要减少跨区往返，可考虑调整其中一项。": "你釘選的環球影城與海遊館分別佔用大阪灣兩天；若要減少跨區往返，可考慮調整其中一項。",
    })[value] || value;
    for (const warning of [...new Set(data.warnings || [])]) list.append(e("li", "", warningText(warning)));
    box.append(list); root.append(box);
  }
}

function showError(message) {
  const root = $("#result-content");
  root.replaceChildren(e("div", "error-box", message));
}

async function plan() {
  const data = requestData(); const error = checkForm(data);
  if (error) { showError(error); $("#result").scrollIntoView({ behavior: "smooth" }); return; }
  const button = $("#plan-button"); button.disabled = true; button.textContent = "正在核對數據與路線…";
  try {
    const response = await fetch(apiUrl("api/plan"), { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data), signal: AbortSignal.timeout(35000) });
    if (!response.ok) { const problem = await response.json().catch(() => ({})); throw new Error(problem.error || `HTTP ${response.status}`); }
    renderResult(await response.json());
  } catch (caught) {
    showError(`未能連接規劃服務：${caught.message}。請在左側「連接你的規劃服務」填入已部署的後端 URL；也可先查看明確標註的樣例方案。`);
    const sample = e("button", "", "查看樣例方案 ↗"); sample.type = "button"; sample.addEventListener("click", loadSample); $("#result-content").append(sample);
  } finally { button.disabled = false; button.innerHTML = "✦ 規劃並檢查 <span>→</span>"; $("#result").scrollIntoView({ behavior: "smooth" }); }
}

async function loadSample() {
  try {
    const response = await fetch(new URL("sample-plan.json", window.location.href), { cache: "no-store" });
    if (!response.ok) throw new Error("樣例檔案未部署");
    renderResult(await response.json(), true);
    $("#result").scrollIntoView({ behavior: "smooth" });
  } catch (error) { showError(`暫時無法載入樣例：${error.message}`); }
}

setDates();
selectionHandlers();
renderAttractions();
$("#api-base").value = state.apiBase;
$("#check-connection").addEventListener("click", checkConnection);
$("#add-attraction").addEventListener("click", () => {
  const name = $("#custom-attraction").value.trim();
  if (!name || state.customAttractions.length >= 3 || state.customAttractions.includes(name)) return;
  state.customAttractions.push(name); $("#custom-attraction").value = ""; renderCustomTags(); renderAttractions();
});
$("#custom-attraction").addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); $("#add-attraction").click(); } });
$("#plan-button").addEventListener("click", plan);
$("#sample-button").addEventListener("click", loadSample);
checkConnection();
