"use client";

import { useState } from "react";
import { t, type Locale, type Text } from "../content";

const tx = (cn: string, hk: string, en: string): Text => [cn, hk, en];
type SideTrip = "osaka" | "kobe" | "nara" | "other";
type Transport = "rail" | "mixed" | "other";
type Stop = "aquarium" | "umeda" | "anime";

const questions: Text[] = [
  tx("这趟五日游的总预算上限？", "這趟五日遊的總預算上限？", "What is your total budget for five days?"),
  tx("在关西主要怎么移动？", "在關西主要怎樣移動？", "How will you get around Kansai?"),
  tx("大阪以外，要留一天给周边城市吗？", "大阪以外，要留一天給周邊城市嗎？", "Would you spend a day outside Osaka?"),
  tx("哪些地方是必去？可多选。", "哪些地方是必去？可多選。", "Which places are must-sees? Choose more than one."),
];

const stopOptions: { id: Stop; label: Text }[] = [
  { id: "aquarium", label: tx("大阪海游馆", "大阪海遊館", "Osaka Aquarium Kaiyukan") },
  { id: "umeda", label: tx("梅田蓝天大厦", "梅田藍天大廈", "Umeda Sky Building") },
  { id: "anime", label: tx("日本桥动漫街", "日本橋動漫街", "Nipponbashi anime district") },
];

const money = (value: number) =>
  new Intl.NumberFormat("en-HK", { maximumFractionDigits: 0 }).format(value);

export default function KansaiPlannerDemo({ locale }: { locale: Locale }) {
  const tr = (value: Text) => t(locale, value);
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const [budget, setBudget] = useState(6500);
  const [transport, setTransport] = useState<Transport>("rail");
  const [sideTrip, setSideTrip] = useState<SideTrip>("kobe");
  const [stops, setStops] = useState<Stop[]>(["aquarium", "umeda", "anime"]);
  const [custom, setCustom] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customTransport, setCustomTransport] = useState("");
  const [customSideTrip, setCustomSideTrip] = useState("");
  const [customStop, setCustomStop] = useState("");
  const [flightQuote, setFlightQuote] = useState("");
  const [hotelQuote, setHotelQuote] = useState("");
  const [activeDay, setActiveDay] = useState(0);

  const next = () => {
    setCustom("");
    if (step === questions.length - 1) setFinished(true);
    else setStep((current) => current + 1);
  };
  const toggleStop = (id: Stop) =>
    setStops((selected) =>
      selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id],
    );
  const flight = Number(flightQuote);
  const hotel = Number(hotelQuote);
  const hasQuotes = flightQuote !== "" && hotelQuote !== "" && flight >= 0 && hotel >= 0;
  const left = budget - flight - hotel;
  const dayBudget = Math.floor(left / 5);
  const transportText =
    transport === "rail"
      ? tr(tx("铁路／地铁＋步行", "鐵路／地鐵＋步行", "Rail / metro + walking"))
      : transport === "mixed"
        ? tr(tx("铁路为主，必要时短程打车", "鐵路為主，必要時短程乘的士", "Mostly rail, short taxis if needed"))
        : customTransport || tr(tx("自定义交通", "自訂交通", "Custom transport"));
  const sideTripText =
    sideTrip === "kobe"
      ? tr(tx("神户", "神戶", "Kobe"))
      : sideTrip === "nara"
        ? tr(tx("奈良", "奈良", "Nara"))
        : sideTrip === "other"
          ? customSideTrip || tr(tx("自选周边", "自選周邊", "Custom side trip"))
          : tr(tx("大阪市内", "大阪市內", "Osaka only"));

  const days: { area: Text; title: Text; stops: Text[]; reason: Text }[] = [
    {
      area: tx("难波 · 抵达", "難波 · 抵達", "Namba · arrival"),
      title: tx("先安顿，再认识大阪", "先安頓，再認識大阪", "Arrive, settle in, meet Osaka"),
      stops: [
        tx("香港 → 关西机场（航班待核价）", "香港 → 關西機場（航班待核價）", "Hong Kong → Kansai airport (flight quote needed)"),
        transport === "other"
          ? tx("前往难波并入住（交通方式待核实）", "前往難波並入住（交通方式待核實）", "Reach Namba and check in (transport to verify)")
          : tx("乘公共交通前往难波、办理入住", "乘公共交通前往難波、辦理入住", "Transit to Namba and check in"),
        tx("道顿堀／心斋桥轻松散步", "道頓堀／心齋橋輕鬆散步", "Easy Dotonbori / Shinsaibashi walk"),
      ],
      reason: tx("抵达日不塞满景点，酒店选在交通方便的区域。", "抵達日不塞滿景點，酒店選在交通方便的區域。", "Arrival day stays light; the hotel base prioritises transit access."),
    },
    {
      area: tx("大阪城 · 梅田", "大阪城 · 梅田", "Osaka Castle · Umeda"),
      title: tx("历史与城市天际线", "歷史與城市天際線", "History and skyline"),
      stops: [
        tx("大阪城公园与历史漫步", "大阪城公園與歷史漫步", "Osaka Castle Park and history walk"),
        ...(stops.includes("umeda")
          ? [tx("梅田蓝天大厦", "梅田藍天大廈", "Umeda Sky Building")]
          : [tx("梅田街区自由探索", "梅田街區自由探索", "Explore Umeda at your own pace")]),
      ],
      reason: tx("把梅田留在北部城市日，不与大阪湾强行拼接。", "把梅田留在北部城市日，不與大阪灣硬湊。", "Umeda belongs to the northern city day, not an Osaka Bay detour."),
    },
    {
      area: tx("大阪湾", "大阪灣", "Osaka Bay"),
      title: tx("给海边留出完整半天", "給海邊留出完整半天", "Give the bay room to breathe"),
      stops: [
        ...(stops.includes("aquarium")
          ? [tx("大阪海游馆（门票待核价）", "大阪海遊館（門票待核價）", "Osaka Aquarium Kaiyukan (ticket quote needed)")]
          : [tx("天保山海边漫步", "天保山海邊漫步", "Tempozan waterfront walk")]),
        tx("天保山周边与港区风景", "天保山周邊與港區風景", "Tempozan and the harbour area"),
      ],
      reason: tx("同一区域慢慢走；是否购票由剩余预算决定。", "同一區域慢慢行；是否購票視乎餘下預算。", "Stay in one area; decide on paid entry after the budget check."),
    },
    {
      area:
        sideTrip === "kobe"
          ? tx("神户一日", "神戶一日", "Kobe day trip")
          : sideTrip === "nara"
            ? tx("奈良一日", "奈良一日", "Nara day trip")
            : sideTrip === "other"
              ? tx("自选周边", "自選周邊", "Chosen side trip")
              : tx("大阪近郊", "大阪近郊", "Osaka surroundings"),
      title:
        sideTrip === "osaka"
          ? tx("给自然留一天", "給自然留一天", "A slower day in nature")
          : tx("用一天看见另一面", "用一天看見另一面", "One day, a different side of Kansai"),
      stops:
        sideTrip === "kobe"
          ? [transport === "other" ? tx("前往神户（交通待核实）", "前往神戶（交通待核實）", "Reach Kobe (transport to verify)") : tx("铁路前往神户", "乘鐵路前往神戶", "Rail to Kobe"), tx("北野／港口择一，避免两头赶", "北野／港口擇一，避免兩邊趕", "Choose Kitano or the harbour; do not rush both")]
          : sideTrip === "nara"
            ? [transport === "other" ? tx("前往奈良（交通待核实）", "前往奈良（交通待核實）", "Reach Nara (transport to verify)") : tx("铁路前往奈良", "乘鐵路前往奈良", "Rail to Nara"), tx("奈良公园与历史街区", "奈良公園與歷史街區", "Nara Park and historic streets")]
            : sideTrip === "other"
              ? [tx("前往自选目的地（路线待核实）", "前往自選目的地（路線待核實）", "Travel to chosen destination (route to verify)"), tx("留出返程余量", "預留回程時間", "Leave time for the return")]
              : [tx("箕面公园自然步道", "箕面公園自然步道", "Minoh Park nature walk"), tx("返回大阪休息", "返回大阪休息", "Return to Osaka and rest")],
      reason: tx("周边只占一天；是否跨城由用户决定。", "周邊只佔一天；是否跨城由用戶決定。", "A side trip takes one day and is always the traveller's choice."),
    },
    {
      area: tx("日本桥 · 返程", "日本橋 · 回程", "Nipponbashi · departure"),
      title: tx("把兴趣放进真实行程", "把興趣放進真實行程", "Leave space for personal interests"),
      stops: [
        ...(stops.includes("anime")
          ? [tx("日本桥动漫街／电电城", "日本橋動漫街／電電城", "Nipponbashi anime district / Den Den Town")]
          : [tx("市区自由活动", "市區自由活動", "Free time in the city")]),
        ...(customStop ? [tx(`自选：${customStop}`, `自選：${customStop}`, `Your stop: ${customStop}`)] : []),
        tx("预留往机场的交通与安检时间", "預留往機場的交通與安檢時間", "Allow time for airport transfer and security"),
      ],
      reason: tx("最后一天随航班时间调整，不给返程制造压力。", "最後一天按航班時間調整，不為回程添壓力。", "The last day adapts to the flight time instead of creating departure stress."),
    },
  ];

  return (
    <section className="kansai-demo" aria-label={tr(tx("关西规划交互原型", "關西規劃互動原型", "Interactive Kansai planning prototype"))}>
      <div className="kansai-demo-head">
        <div>
          <span className="kansai-kicker">INTERACTIVE CONCEPT / 01</span>
          <h2>{tr(tx("试着规划一次关西五日游", "試着規劃一次關西五日遊", "Try planning five days in Kansai"))}</h2>
          <p>{tr(tx("香港出发 · 独行 · 适中节奏 · 自然、历史与动漫", "香港出發 · 獨行 · 適中節奏 · 自然、歷史與動漫", "From Hong Kong · solo · moderate pace · nature, history and anime"))}</p>
        </div>
        <span className="kansai-live">{tr(tx("独立原型", "獨立原型", "Independent prototype"))}</span>
      </div>
      <div className="kansai-workspace">
        <div className="kansai-assistant">
          <div className="kansai-pane-title"><span className="kansai-spark">✦</span>{tr(tx("行程助手", "行程助手", "Planning assistant"))}</div>
          <div className="kansai-message">
            <span className="kansai-step">{finished ? tr(tx("已确认偏好", "已確認偏好", "Preferences set")) : `${String(step + 1).padStart(2, "0")} / 04`}</span>
            <h3>{finished ? tr(tx("先看能否成行，再看去哪儿。", "先看能否成行，再看去哪裏。", "Check feasibility, then decide where to go.")) : tr(questions[step])}</h3>
            {!finished && step === 0 && (
              <div className="kansai-choices">
                {[5000, 6500, 8000].map((amount) => (
                  <button className={budget === amount ? "selected" : ""} key={amount} onClick={() => { setBudget(amount); next(); }}>HK$ {money(amount)}</button>
                ))}
                <button onClick={() => setCustom("budget")}>{tr(tx("其他金额", "其他金額", "Other amount"))} ＋</button>
              </div>
            )}
            {!finished && step === 1 && (
              <div className="kansai-choices">
                <button className={transport === "rail" ? "selected" : ""} onClick={() => { setTransport("rail"); next(); }}>{tr(tx("铁路／地铁＋步行", "鐵路／地鐵＋步行", "Rail / metro + walking"))}</button>
                <button className={transport === "mixed" ? "selected" : ""} onClick={() => { setTransport("mixed"); next(); }}>{tr(tx("公共交通＋短程打车", "公共交通＋短程的士", "Transit + short taxis"))}</button>
                <button onClick={() => setCustom("transport")}>{tr(tx("其他方式", "其他方式", "Something else"))} ＋</button>
              </div>
            )}
            {!finished && step === 2 && (
              <div className="kansai-choices">
                {([
                  ["osaka", tx("只玩大阪", "只玩大阪", "Osaka only")],
                  ["kobe", tx("神户一日", "神戶一日", "A day in Kobe")],
                  ["nara", tx("奈良一日", "奈良一日", "A day in Nara")],
                ] as const).map(([id, label]) => (
                  <button className={sideTrip === id ? "selected" : ""} key={id} onClick={() => { setSideTrip(id); next(); }}>{tr(label)}</button>
                ))}
                <button onClick={() => setCustom("side")}>{tr(tx("其他地方", "其他地方", "Another place"))} ＋</button>
              </div>
            )}
            {!finished && step === 3 && (
              <>
                <div className="kansai-choices">
                  {stopOptions.map(({ id, label }) => (
                    <button aria-pressed={stops.includes(id)} className={stops.includes(id) ? "selected" : ""} key={id} onClick={() => toggleStop(id)}>{stops.includes(id) ? "✓ " : "+ "}{tr(label)}</button>
                  ))}
                  <button onClick={() => setCustom("stop")}>{tr(tx("其他必去地点", "其他必去地點", "Another must-see"))} ＋</button>
                </div>
                <button className="kansai-primary" onClick={next}>{tr(tx("生成示例路线", "生成示例路線", "Build sample route"))} →</button>
              </>
            )}
            {custom && !finished && (
              <form className="kansai-custom" onSubmit={(event) => {
                event.preventDefault();
                if (custom === "budget") {
                  const parsed = Number(customBudget);
                  if (parsed < 1 || !Number.isFinite(parsed)) return;
                  setBudget(parsed);
                  next();
                } else if (custom === "transport") {
                  if (!customTransport.trim()) return;
                  setTransport("other");
                  next();
                } else if (custom === "side") {
                  if (!customSideTrip.trim()) return;
                  setSideTrip("other");
                  next();
                } else {
                  if (!customStop.trim()) return;
                  setCustom("");
                }
              }}>
                <label htmlFor="kansai-other">{tr(tx("选项里没有？写在这里", "選項裏沒有？寫在這裏", "Not listed? Add your answer"))}</label>
                <div><input id="kansai-other" required type={custom === "budget" ? "number" : "text"} min={custom === "budget" ? 1 : undefined} value={custom === "budget" ? customBudget : custom === "transport" ? customTransport : custom === "side" ? customSideTrip : customStop} onChange={(event) => {
                  const value = event.target.value;
                  if (custom === "budget") setCustomBudget(value);
                  else if (custom === "transport") setCustomTransport(value);
                  else if (custom === "side") setCustomSideTrip(value);
                  else setCustomStop(value);
                }} placeholder={custom === "budget" ? "HK$" : tr(tx("输入你的想法", "輸入你的想法", "Your answer"))} />
                <button type="submit">↗</button></div>
              </form>
            )}
            {finished && (
              <div className="kansai-summary">
                <span>{tr(tx("预算", "預算", "Budget"))}<strong>HK$ {money(budget)}</strong></span>
                <span>{tr(tx("交通", "交通", "Transport"))}<strong>{transportText}</strong></span>
                <span>{tr(tx("活动范围", "活動範圍", "Travel radius"))}<strong>{sideTripText}</strong></span>
                <button onClick={() => { setStep(0); setFinished(false); }}>{tr(tx("重新选择偏好", "重新選擇偏好", "Edit preferences"))} ↗</button>
              </div>
            )}
          </div>
          <div className="kansai-assistant-foot">{tr(tx("选择优先 · 没有合适选项才输入", "優先點選 · 沒有合適選項才輸入", "Choose first · type only when needed"))}</div>
        </div>
        <div className="kansai-plan">
          <div className="kansai-pane-title">{tr(tx("五日行程", "五日行程", "Five-day plan"))}<span>01—05</span></div>
          <div className="kansai-day-tabs" role="tablist" aria-label={tr(tx("选择日期", "選擇日期", "Choose a day"))}>
            {days.map((_, index) => <button role="tab" aria-selected={activeDay === index} className={activeDay === index ? "active" : ""} key={index} onClick={() => setActiveDay(index)}>{tr(tx("第", "第", "DAY "))}{locale === "en" ? index + 1 : `${index + 1}天`}</button>)}
          </div>
          <div className="kansai-day-list">
            {days.map((day, index) => (
              <button className={`kansai-day-card ${activeDay === index ? "active" : ""}`} key={index} onClick={() => setActiveDay(index)} aria-label={`${index + 1}: ${tr(day.title)}`}>
                <span className="kansai-card-index">0{index + 1}</span>
                <span><small>{tr(day.area)}</small><strong>{tr(day.title)}</strong><span className="kansai-stop-line">{day.stops.map(tr).join(" → ")}</span></span>
              </button>
            ))}
          </div>
        </div>
        <div className="kansai-inspector">
          <div className="kansai-pane-title">{tr(tx("路线与预算", "路線與預算", "Route & budget"))}<span>↗</span></div>
          <div className="kansai-zone-board">
            <span className="kansai-map-label">{tr(tx("空间示意 · 非比例地图", "空間示意 · 非比例地圖", "Area sketch · not to scale"))}</span>
            <div className="kansai-zone zone-north">{tr(tx("北部 / 梅田", "北部 / 梅田", "North / Umeda"))}</div>
            <div className="kansai-zone zone-east">{tr(tx("东部 / 大阪城", "東部 / 大阪城", "East / Osaka Castle"))}</div>
            <div className="kansai-zone zone-south">{tr(tx("南部 / 难波", "南部 / 難波", "South / Namba"))}</div>
            <div className="kansai-zone zone-bay">{tr(tx("西部 / 大阪湾", "西部 / 大阪灣", "West / Osaka Bay"))}</div>
            <div className="kansai-zone zone-trip">{sideTripText}</div>
          </div>
          <div className="kansai-day-detail">
            <span>DAY 0{activeDay + 1} / {tr(days[activeDay].area)}</span>
            <strong>{tr(days[activeDay].title)}</strong>
            <p>{tr(days[activeDay].reason)}</p>
          </div>
          <div className="kansai-budget">
            <span className="kansai-kicker">BUDGET GATE / HKD</span>
            <div className="kansai-quote-grid">
              <label>{tr(tx("往返机票实查总价", "來回機票實查總價", "Actual return flight quote"))}<input inputMode="numeric" min="0" type="number" value={flightQuote} onChange={(event) => setFlightQuote(event.target.value)} placeholder="HK$ —" /></label>
              <label>{tr(tx("四晚酒店实查总价", "四晚酒店實查總價", "Actual four-night hotel quote"))}<input inputMode="numeric" min="0" type="number" value={hotelQuote} onChange={(event) => setHotelQuote(event.target.value)} placeholder="HK$ —" /></label>
            </div>
            {hasQuotes ? (
              <p className={left < 0 ? "kansai-over-budget" : ""}>{left < 0
                ? tr(tx(`已超预算 HK$ ${money(Math.abs(left))}；先换航班或住宿。`, `已超預算 HK$ ${money(Math.abs(left))}；先換航班或住宿。`, `Over budget by HK$ ${money(Math.abs(left))}; revisit the flight or hotel.`))
                : tr(tx(`扣除机酒后余 HK$ ${money(left)}，约 HK$ ${money(dayBudget)}／天；还需覆盖交通、餐饮和门票。`, `扣除機票酒店後餘 HK$ ${money(left)}，約 HK$ ${money(dayBudget)}／天；仍需支付交通、餐飲及門票。`, `HK$ ${money(left)} remains after flight and hotel, or roughly HK$ ${money(dayBudget)}/day for transit, food and tickets.`))}</p>
            ) : <p>{tr(tx("先填入你查到的机票与酒店价格，才判断这条路线是否付得起。", "先填入你查到的機票及酒店價格，再判斷這條路線是否負擔得起。", "Enter real flight and hotel quotes before judging affordability."))}</p>}
            <small>{tr(tx("未接入实时库存；景点开放时间、车次与票价也需出发前核实。", "未接入即時庫存；景點開放時間、班次及票價亦需出發前核實。", "No live inventory. Verify opening hours, train schedules and ticket prices before travel."))}</small>
          </div>
        </div>
      </div>
    </section>
  );
}
