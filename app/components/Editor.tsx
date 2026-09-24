"use client";

/* Photos are locally compressed WebP assets; no image optimization server on GitHub Pages. */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  asset,
  copy,
  email,
  phones,
  entries,
  fileIds,
  fileName,
  fileTitle,
  fileUrl,
  github,
  linkedin,
  locales,
  t,
  type Locale,
  type Text,
} from "../content";

const label = (a: string, b: string, c: string): Text => [a, b, c];
const glyphs = [
  "const empathy = true;",
  "listen(user);",
  "build → test → learn",
  "0101  /  1010",
  "{ human: first }",
  "return clarity;",
  "</possibilities>",
  "intent → experience",
];

function AcademicFigure({
  locale,
  src,
  number,
  alt,
  caption,
  className = "",
}: {
  locale: Locale;
  src: string;
  number: string;
  alt: Text;
  caption: Text;
  className?: string;
}) {
  return (
    <figure className={`academic-figure ${className}`}>
      <div className="academic-figure-bar">
        <span>FIG. {number}</span>
        <span>{t(locale, label("项目实录", "項目實錄", "Project evidence"))}</span>
      </div>
      <img src={asset(src)} alt={t(locale, alt)} loading="lazy" />
      <figcaption>{t(locale, caption)}</figcaption>
    </figure>
  );
}

function AcademicAdvisorMedia({
  locale,
  slot,
}: {
  locale: Locale;
  slot: "opening" | "architecture" | "workflow" | "knowledge" | "handoff" | "results";
}) {
  if (slot === "opening") {
    return (
      <div className="academic-opening">
        <AcademicFigure
          locale={locale}
          number="01"
          src="/case-assets/academic-advisor/advising-ui.webp"
          alt={label(
            "学术顾问聊天界面，回答带有来源引用",
            "學術顧問聊天介面，答案附有來源引用",
            "Academic advisor chat interface with cited sources",
          )}
          caption={label(
            "学生端主界面：自然语言提问、来源引用与问题报告处在同一条体验路径中。",
            "學生端主介面：自然語言提問、來源引用與問題報告位於同一條體驗路徑。",
            "Student-facing interface: natural-language questions, source citations and issue reporting share one journey.",
          )}
        />
        <AcademicFigure
          locale={locale}
          number="02"
          src="/case-assets/academic-advisor/classroom.webp"
          alt={label(
            "香港理工大学工业中心的 AI 拓展与实践课堂",
            "香港理工大學工業中心的 AI 拓展與實踐課堂",
            "An AI extension and practice class at the PolyU Industrial Centre",
          )}
          caption={label(
            "真实学习情境：学生在 PolyU Industrial Centre 参与 AI 拓展与实践课程。",
            "真實學習情境：學生在 PolyU Industrial Centre 參與 AI 拓展與實踐課程。",
            "Real learning context: students in an AI extension and practice class at the PolyU Industrial Centre.",
          )}
          className="academic-classroom"
        />
      </div>
    );
  }

  if (slot === "architecture") {
    return (
      <AcademicFigure
        locale={locale}
        number="03"
        src="/case-assets/academic-advisor/system-architecture.webp"
        alt={label(
          "学术顾问系统架构图",
          "學術顧問系統架構圖",
          "Academic advisor system architecture",
        )}
        caption={label(
          "系统由学生端顾问、知识维护工具与共享数据层组成；产品体验与后台更新流程被当作一个整体设计。",
          "系統由學生端顧問、知識維護工具及共享資料層組成；產品體驗與後台更新流程被視為一個整體。",
          "The system combines the student advisor, knowledge-maintenance tools and a shared data layer—one product across frontstage and backstage work.",
        )}
      />
    );
  }

  if (slot === "workflow") {
    return (
      <AcademicFigure
        locale={locale}
        number="04"
        src="/case-assets/academic-advisor/agent-workflow.webp"
        alt={label(
          "Dify 中的学术顾问 Agent 工作流",
          "Dify 中的學術顧問 Agent 工作流程",
          "Academic advisor agent workflow in Dify",
        )}
        caption={label(
          "实际 Dify 工作流：意图分类后进入 COMP、全校要求或 SAO 分支；信息不足则进入澄清与安全兜底。",
          "實際 Dify 工作流程：意圖分類後進入 COMP、全校要求或 SAO 分支；資料不足則進入釐清與安全後備。",
          "The production Dify workflow routes intent to COMP, university-wide or SAO branches; missing context enters clarification and safety fallback.",
        )}
      />
    );
  }

  if (slot === "knowledge") {
    return (
      <div className="academic-knowledge">
        <AcademicFigure
          locale={locale}
          number="05"
          src="/case-assets/academic-advisor/dataset-pipeline.webp"
          alt={label(
            "知识库构建流程图",
            "知識庫建立流程圖",
            "Knowledge-base construction pipeline",
          )}
          caption={label(
            "两种资料入口、一套结构化处理方式、三个按使用场景划分的知识库。",
            "兩種資料入口、一套結構化處理方式、三個按使用情境劃分的知識庫。",
            "Two source types, one structured preparation process and three knowledge bases organized by use case.",
          )}
        />
        <div className="academic-duo">
          <AcademicFigure
            locale={locale}
            number="06A"
            src="/case-assets/academic-advisor/pdf-to-markdown.webp"
            alt={label(
              "PDF 转 Markdown 管理界面",
              "PDF 轉 Markdown 管理介面",
              "PDF-to-Markdown administration interface",
            )}
            caption={label(
              "PDF 转 Markdown：批量处理培养方案，保留标题与表格后交给管理员复核。",
              "PDF 轉 Markdown：批量處理培養方案，保留標題與表格後交由管理人員覆核。",
              "PDF to Markdown: batch-process programme documents, preserve structure, then send them for staff review.",
            )}
          />
          <AcademicFigure
            locale={locale}
            number="06B"
            src="/case-assets/academic-advisor/web-crawler.webp"
            alt={label(
              "网页采集平台界面",
              "網頁擷取平台介面",
              "Web-crawling platform interface",
            )}
            caption={label(
              "网页采集：支持站点地图批量采集与单页定点更新，降低政策维护成本。",
              "網頁擷取：支援網站地圖批量擷取及單頁定點更新，降低政策維護成本。",
              "Web collection: sitemap batches and targeted page updates reduce the cost of keeping policies current.",
            )}
          />
        </div>
      </div>
    );
  }

  if (slot === "handoff") {
    return (
      <AcademicFigure
        locale={locale}
        number="07"
        src="/case-assets/academic-advisor/issue-report.webp"
        alt={label(
          "学生问题报告与处理状态界面",
          "學生問題報告與處理狀態介面",
          "Student issue reports and resolution status interface",
        )}
        caption={label(
          "人工接手不是一句提示：问题、类别、处理状态与回复都进入可追踪的记录。",
          "人工接手不是一句提示：問題、類別、處理狀態與回覆都進入可追蹤的記錄。",
          "Human handoff is a traceable workflow: the issue, category, status and response stay visible.",
        )}
      />
    );
  }

  return (
    <div className="academic-results" aria-label={t(locale, label("评测结果", "評測結果", "Evaluation results"))}>
      {[
        ["93.3%", label("意图路由准确率", "意圖路由準確率", "Intent-routing accuracy")],
        ["87%", label("整体检索精度", "整體檢索精準度", "Overall retrieval precision")],
        ["85%", label("认为引用有助核对", "認為引用有助核對", "Said citations aid verification")],
        ["26", label("面对面学生试用", "面對面學生試用", "Face-to-face student tests")],
      ].map(([value, text]) => (
        <div key={value as string}>
          <strong>{value as string}</strong>
          <span>{t(locale, text as Text)}</span>
        </div>
      ))}
    </div>
  );
}

function GptutorEvidence({ locale }: { locale: Locale }) {
  return (
    <div className="project-photo-duo gptutor-evidence">
      <AcademicFigure
        locale={locale}
        number="01"
        src="/case-assets/gptutor/simulation-editor.webp"
        alt={label(
          "GPTutor 实践模拟配置后台",
          "GPTutor 實踐模擬配置後台",
          "GPTutor practice-simulation configuration interface",
        )}
        caption={label(
          "产品后台：课程团队可以配置场景背景、检查动作、动作说明与预期反馈。",
          "產品後台：課程團隊可以設定場景背景、檢查動作、動作說明及預期回饋。",
          "Product workspace: course teams can configure the setting, examination actions, instructions and expected feedback.",
        )}
      />
      <AcademicFigure
        locale={locale}
        number="02"
        src="/case-assets/gptutor/forum-showcase.webp"
        alt={label(
          "GPTutor 在 Global AI Forum 的现场展示",
          "GPTutor 在 Global AI Forum 的現場展示",
          "GPTutor demonstration at the Global AI Forum",
        )}
        caption={label(
          "从后台到现场：GPTutor 以可操作 Demo 参与 Global AI Forum 展示。",
          "從後台到現場：GPTutor 以可操作 Demo 參與 Global AI Forum 展示。",
          "From workspace to public demo: GPTutor was presented as a hands-on experience at the Global AI Forum.",
        )}
      />
    </div>
  );
}

function VivacityEvidence({
  locale,
  slot,
}: {
  locale: Locale;
  slot: "collaboration" | "field";
}) {
  if (slot === "collaboration") {
    return (
      <AcademicFigure
        locale={locale}
        number="01"
        src="/case-assets/vivacity/remote-collaboration.webp"
        alt={label(
          "Vivacity 团队线上与线下协作会议",
          "Vivacity 團隊線上與線下協作會議",
          "Vivacity team working across remote and in-person collaboration",
        )}
        caption={label(
          "团队协作现场：线上成员与线下成员一起对齐产品与开发进度；画面中的姓名标签已隐去。",
          "團隊協作現場：線上成員與線下成員共同對齊產品及開發進度；畫面中的姓名標籤已隱去。",
          "Team collaboration: remote and in-person teammates align product and development work. Visible name labels have been removed.",
        )}
        className="vivacity-collaboration"
      />
    );
  }

  return (
    <div className="project-photo-duo vivacity-field">
      <AcademicFigure
        locale={locale}
        number="02"
        src="/case-assets/vivacity/team-moment.webp"
        alt={label(
          "Vivacity 团队实习期间的线下相聚",
          "Vivacity 團隊實習期間的線下相聚",
          "An informal Vivacity team moment during the internship",
        )}
        caption={label(
          "工作之外的团队时刻：顺畅协作也来自日常沟通与彼此信任。",
          "工作以外的團隊時刻：順暢協作亦來自日常溝通與彼此信任。",
          "A team moment beyond the work itself: good collaboration also grows from everyday communication and trust.",
        )}
      />
      <AcademicFigure
        locale={locale}
        number="03"
        src="/case-assets/vivacity/chinajoy.webp"
        alt={label(
          "ChinaJoy 2025 展会现场",
          "ChinaJoy 2025 展會現場",
          "ChinaJoy 2025 exhibition floor",
        )}
        caption={label(
          "ChinaJoy 2025：离开数据看板，回到玩家、内容与游戏文化真实发生的现场。",
          "ChinaJoy 2025：離開資料看板，回到玩家、內容與遊戲文化真實發生的現場。",
          "ChinaJoy 2025: stepping beyond the dashboard into the environment where players, content and game culture meet.",
        )}
      />
    </div>
  );
}

function AsciiFlower() {
  const rows = Array.from({ length: 29 }, (_, y) =>
    Array.from({ length: 59 }, (_, x) => {
      const dx = (x - 29) / 2,
        dy = y - 14,
        r = Math.sqrt(dx * dx + dy * dy),
        a = Math.atan2(dy, dx);
      const edge = 9.2 + 3.5 * Math.cos(a * 5 + 0.5);
      if (r < 2.8) return "@";
      if (r < edge && r > edge - 2.5) return "+*#"[Math.abs(x + y) % 3];
      if (r < edge) return (x + y) % 3 === 0 ? ":" : ".";
      return " ";
    }).join(""),
  ).join("\n");
  return (
    <pre className="ascii-flower" aria-hidden="true">
      {rows}
    </pre>
  );
}

export default function Editor({
  locale,
  file,
}: {
  locale: Locale;
  file: string;
}) {
  const tr = (text: Text) => t(locale, text);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [intro, setIntro] = useState(false);
  const [tabs, setTabs] = useState(
    ["readme", file].filter((v, i, a) => a.indexOf(v) === i),
  );
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const main = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.documentElement.lang =
      locale === "zh-cn" ? "zh-CN" : locale === "zh-hk" ? "zh-HK" : "en";
    main.current?.scrollTo(0, 0);
    let saved: string[] = [];
    try {
      saved = JSON.parse(sessionStorage.getItem("qinye-tabs") || "[]");
    } catch {
      /* storage may be unavailable */
    }
    const nextTabs = Array.from(
      new Set(["readme", ...saved.filter((id) => fileIds.includes(id)), file]),
    );
    const frame = requestAnimationFrame(() => {
      setTabs(nextTabs);
      setMenu(false);
    });
    try {
      sessionStorage.setItem("qinye-tabs", JSON.stringify(nextTabs));
    } catch {
      /* optional persistence */
    }
    return () => cancelAnimationFrame(frame);
  }, [file, locale]);

  useEffect(() => {
    document
      .querySelector(".file-tab.active")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [tabs, file]);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("qinye-intro-v2") === "seen";
      sessionStorage.setItem("qinye-intro-v2", "seen");
    } catch {
      /* optional persistence */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const frame = requestAnimationFrame(() => setIntro(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!intro) return;
    const timer = setTimeout(() => setIntro(false), 1800);
    return () => clearTimeout(timer);
  }, [intro]);
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearch((v) => !v);
      }
      if (event.key === "Escape") {
        setMenu(false);
        setIntro(false);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);
  useEffect(() => {
    if (search) dialog.current?.showModal();
    else dialog.current?.close();
  }, [search]);
  const closeTab = (id: string) => {
    const next = tabs.filter((tab) => tab !== id);
    setTabs(next);
    try {
      sessionStorage.setItem("qinye-tabs", JSON.stringify(next));
    } catch {
      /* optional persistence */
    }
  };
  const entry = entries.find((e) => e.id === file);
  const group = entry?.category || "personal";
  const sidebarGroup = (
    id: "personal" | "projects" | "experience",
    ids: string[],
  ) => (
    <div className="tree-group" key={id}>
      <button
        className="folder"
        aria-expanded={!collapsed.includes(id)}
        onClick={() =>
          setCollapsed((v) =>
            v.includes(id) ? v.filter((x) => x !== id) : [...v, id],
          )
        }
      >
        <span>{collapsed.includes(id) ? "›" : "⌄"}</span>
        <span className="folder-icon">▱</span>
        {tr(copy[id])}
        <small>{ids.length.toString().padStart(2, "0")}</small>
      </button>
      {!collapsed.includes(id) &&
        ids.map((id) => (
          <Link
            key={id}
            href={fileUrl(locale, id)}
            className={`tree-file ${file === id ? "selected" : ""}`}
            aria-current={file === id ? "page" : undefined}
            title={tr(fileTitle(id))}
          >
            <span className={`file-icon ${id === "contact" ? "json" : ""}`}>
              {id === "contact" ? "{}" : "M↓"}
            </span>
            <span>{fileName(id)}</span>
            {file === id && <i />}
          </Link>
        ))}
    </div>
  );
  return (
    <div className="editor-shell">
      <a className="skip-link" href="#content">
        {tr(label("跳到正文", "跳至正文", "Skip to content"))}
      </a>
      <header className="titlebar">
        <div className="window-brand">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <Link href={fileUrl(locale, "readme")}>
            QZ<span> / workspace</span>
          </Link>
        </div>
        <button
          className="command-trigger"
          aria-label={tr(copy.search)}
          onClick={() => setSearch(true)}
        >
          <span>⌕</span>
          <span>{tr(copy.search)}</span>
          <kbd>⌘ K</kbd>
        </button>
        <nav className="languages" aria-label="Language">
          {locales.map((l) => (
            <Link
              href={fileUrl(l, file)}
              key={l}
              lang={l === "zh-cn" ? "zh-CN" : l === "zh-hk" ? "zh-HK" : "en"}
              aria-current={l === locale ? "true" : undefined}
            >
              {l === "zh-cn" ? "简" : l === "zh-hk" ? "繁" : "EN"}
            </Link>
          ))}
        </nav>
      </header>
      <aside
        className="activity-rail"
        aria-label={tr(label("快捷导航", "快捷導覽", "Quick navigation"))}
      >
        <Link
          href={fileUrl(locale, "readme")}
          aria-label={tr(copy.back)}
          className="rail-active"
        >
          ▤
        </Link>
        <button aria-label={tr(copy.search)} onClick={() => setSearch(true)}>
          ⌕
        </button>
        <Link
          href={fileUrl(locale, "about")}
          aria-label={tr(fileTitle("about"))}
        >
          ☺
        </Link>
        <a href={`mailto:${email}`} aria-label="Email" className="rail-bottom">
          ↗
        </a>
      </aside>
      {menu && (
        <button
          className="sidebar-scrim"
          aria-label={tr(copy.close)}
          onClick={() => {
            setMenu(false);
            menuButton.current?.focus();
          }}
        />
      )}
      <aside
        className={`sidebar ${menu ? "is-open" : ""}`}
        aria-label={tr(copy.menu)}
      >
        <div className="explorer-label">
          EXPLORER <span>···</span>
        </div>
        <div className="workspace-root">
          ⌄ &nbsp; QINYE’S PORTFOLIO <span>✳</span>
        </div>
        <nav>
          {sidebarGroup("personal", ["readme", "about", "resume", "contact"])}
          {sidebarGroup(
            "projects",
            entries.filter((e) => e.category === "projects").map((e) => e.id),
          )}
          {sidebarGroup(
            "experience",
            entries.filter((e) => e.category === "experience").map((e) => e.id),
          )}
        </nav>
        <div className="sidebar-note">
          <span className="tiny-dot" />
          {tr(copy.open)}
          <p>
            {tr(
              label(
                "认真做产品，也认真感受生活。",
                "認真做產品，也認真感受生活。",
                "Build thoughtfully. Live curiously.",
              ),
            )}
          </p>
          <div>
            <a href={github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </aside>
      <div className="editor-area">
        <div className="tabbar">
          <button
            ref={menuButton}
            className="mobile-menu"
            aria-label={tr(copy.menu)}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            ☰
          </button>
          <div className="tabs">
            {tabs.map((id) => (
              <div
                className={`file-tab ${id === file ? "active" : ""}`}
                key={id}
              >
                <Link
                  href={fileUrl(locale, id)}
                  aria-current={file === id ? "page" : undefined}
                >
                  <span className="file-icon">M↓</span>
                  {fileName(id)}
                </Link>
                {id !== file && id !== "readme" ? (
                  <button
                    aria-label={`${tr(copy.close)} ${fileName(id)}`}
                    onClick={() => closeTab(id)}
                  >
                    ×
                  </button>
                ) : (
                  <span className="tab-dot">{id === file ? "●" : ""}</span>
                )}
              </div>
            ))}
          </div>
          <span className="split-icon" aria-hidden="true">
            ◫
          </span>
        </div>
        <div className="breadcrumbs">
          <span>{tr(copy[group])}</span>
          <span>›</span>
          <span className="file-icon">M↓</span>
          {fileName(file)}
          <span className="preview-label">
            {tr(label("阅读视图", "閱讀檢視", "Reading view"))}
          </span>
        </div>
        <main ref={main} id="content" tabIndex={-1} className="document-scroll">
          <div className="line-numbers" aria-hidden="true">
            {Array.from({ length: 80 }, (_, i) => (
              <span key={i}>{String(i + 1).padStart(2, "0")}</span>
            ))}
          </div>
          <article
            className={`document ${file === "readme" ? "home-document" : ""}`}
            key={`${locale}-${file}`}
          >
            {file === "readme" && (
              <>
                <div className="eyebrow">
                  <span className="tiny-dot" /> HELLO, WORLD.{" "}
                  <span className="edition">PORTFOLIO / 2026</span>
                </div>
                <div className="hero-grid">
                  <div className="hero-copy">
                    <h1>
                      {tr(
                        label(
                          "你好，我是张沁烨。",
                          "你好，我是張沁燁。",
                          "Hi, I’m Qinye.",
                        ),
                      )}
                      <span className="cursor" aria-hidden="true" />
                    </h1>
                    <p className="hero-description">
                      {tr(
                        label(
                          "我对 AI 产品充满兴趣，关注以用户为导向的产品设计，以及真实应用场景中的工程实践。我关心前沿技术能拓展怎样的边界，也关心它为什么值得被做出来。「已识乾坤大，犹怜草木青。」我相信，科技与人文的交汇，能让产品既有解决问题的能力，也有体察人的温度。",
                          "我對 AI 產品充滿興趣，關注以用戶為導向的產品設計，以及真實應用場景中的工程實踐。我關心前沿技術能拓展怎樣的邊界，也關心它為何值得被做出來。「已識乾坤大，猶憐草木青。」我相信，科技與人文的交匯，能讓產品既有解決問題的能力，也有體察人的溫度。",
                          "I’m deeply interested in AI products, with a focus on user-centered design and engineering for real-world applications. I care about the boundaries emerging technologies can push—and why they are worth building. A line of Chinese poetry captures a belief I hold close: ‘Having seen the vastness of the world, I still cherish its smallest growing things.’ I believe bringing technology and the humanities together can help us build products that solve problems with care for the people who use them.",
                        ),
                      )}
                    </p>
                    <div className="hero-actions">
                      <Link
                        className="primary-button"
                        href={fileUrl(locale, "recruiting-agent")}
                      >
                        {tr(copy.explore)} <span>↗</span>
                      </Link>
                      <Link
                        className="text-button"
                        href={fileUrl(locale, "resume")}
                      >
                        {tr(copy.resume)} <span>→</span>
                      </Link>
                    </div>
                  </div>
                  <div className="hero-art">
                    <AsciiFlower />
                    <div className="art-caption">
                      <span>human_first.ts</span>
                      <span>✳</span>
                    </div>
                  </div>
                </div>
                <div className="proof-strip">
                  <div>
                    <span>01 / PRODUCT</span>
                    <strong>
                      {tr(
                        label(
                          "从问题到工作流",
                          "從問題到工作流程",
                          "Problem → workflow",
                        ),
                      )}
                    </strong>
                    <p>Agent · RAG · Human-in-the-loop</p>
                  </div>
                  <div>
                    <span>02 / EVALUATION</span>
                    <strong>
                      {tr(
                        label(
                          "让产品价值可验证",
                          "讓產品價值可驗證",
                          "Evidence, not just demos",
                        ),
                      )}
                    </strong>
                    <p>
                      {tr(
                        label(
                          "实习经历 · Code Agent 长程与多轮评测",
                          "實習經歷 · Code Agent 長程與多輪評測",
                          "Internship · Long-horizon & multi-turn Code Agent evaluation",
                        ),
                      )}
                    </p>
                  </div>
                  <div>
                    <span>03 / BUILDING</span>
                    <strong>
                      {tr(
                        label(
                          "能设计，也能实现",
                          "能設計，也能實作",
                          "Design it. Build it.",
                        ),
                      )}
                    </strong>
                    <p>
                      {tr(
                        label(
                          "在真实案例中锻炼工程能力",
                          "在真實案例中鍛鍊工程能力",
                          "Building engineering skills through real projects",
                        ),
                      )}
                    </p>
                  </div>
                </div>
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">SELECTED FILES</span>
                    <h2>
                      {tr(
                        label(
                          "一些认真解决的问题",
                          "一些認真解決的問題",
                          "Problems I’ve worked on",
                        ),
                      )}
                    </h2>
                  </div>
                  <span className="section-count">04 FILES</span>
                </div>
                <div className="project-list">
                  {entries
                    .filter((e) => e.category === "projects")
                    .map((e, i) => (
                      <Link
                        href={fileUrl(locale, e.id)}
                        key={e.id}
                        className="project-row"
                      >
                        <span className="project-number">0{i + 1}</span>
                        <div>
                          <div className="project-row-top">
                            <h3>{tr(e.title)}</h3>
                            <span className="project-arrow">↗</span>
                          </div>
                          <p>{tr(e.intro)}</p>
                          <div className="project-tags">
                            {e.tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="row-art" aria-hidden="true">
                          {["{↗}", "≋", "✳", "⌘"][i]}
                        </div>
                      </Link>
                    ))}
                </div>
                <div className="home-bottom">
                  <div>
                    <span className="eyebrow">
                      A PERSON, NOT JUST A PROFILE.
                    </span>
                    <h2>
                      {tr(
                        label(
                          "屏幕之外，也保持好奇。",
                          "螢幕以外，也保持好奇。",
                          "Curiosity beyond the screen.",
                        ),
                      )}
                    </h2>
                    <p>
                      {tr(
                        label(
                          "历史文化、动漫游戏、户外的风。它们提醒我，产品面对的始终是具体的人。",
                          "歷史文化、動漫遊戲、戶外的風。它們提醒我，產品面對的始終是具體的人。",
                          "History, anime, games, and time outdoors. They remind me that every product is for real people.",
                        ),
                      )}
                    </p>
                    <Link
                      className="text-button"
                      href={fileUrl(locale, "about")}
                    >
                      {tr(fileTitle("about"))} →
                    </Link>
                  </div>
                  <Link
                    href={fileUrl(locale, "about")}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <img
                      src={asset("/profile/life-3.webp")}
                      alt=""
                      width="1600"
                      height="1200"
                      loading="lazy"
                    />
                  </Link>
                </div>
              </>
            )}
            {file === "about" && (
              <>
                <PageHeading
                  eyebrow="ABOUT THE PERSON"
                  title={tr(
                    label(
                      "你好，我是张沁烨。",
                      "你好，我是張沁燁。",
                      "Hi, I’m Qinye Zhang.",
                    ),
                  )}
                  subtitle={tr(
                    label(
                      "你也可以叫我 River。我感兴趣的职业方向是AI产品经理，希望能做出真正在用户情景中能发挥价值的产品。",
                      "你也可以叫我 River。我感興趣的職業方向是 AI 產品經理，希望做出能在真實使用情境中為用戶帶來價值的產品。",
                      "You can also call me River. I’m interested in a career in AI product management, building products that bring real value to people in the situations where they use them.",
                    ),
                  )}
                />
                <figure className="portrait">
                  <img
                    src={asset("/profile/life-3.webp")}
                    width="1600"
                    height="1200"
                    alt={tr(
                      label(
                        "在森林溪流旁的张沁烨",
                        "在森林溪流旁的張沁燁",
                        "Qinye beside a forest stream",
                      ),
                    )}
                  />
                  <figcaption>
                    01 /{" "}
                    {tr(
                      label(
                        "走出屏幕，走进自然。",
                        "走出螢幕，走進自然。",
                        "Away from the screen, into nature.",
                      ),
                    )}
                  </figcaption>
                </figure>
                <div className="prose">
                  <h2>
                    {tr(
                      label(
                        "理性地构建，感性地观察。",
                        "理性地建構，感性地觀察。",
                        "Build with rigor. Observe with empathy.",
                      ),
                    )}
                  </h2>
                  <p>
                    {tr(
                      label(
                        "我的背景是计算机科学与应用数学，在AI产品设计、前后端开发、模型评测等方面均有真实的工程经历。我喜欢从现实生活发掘潜在的痛点，把模糊的需求拆开，找到真正的问题，再通过原型和实验一步步验证。",
                        "我的背景是電腦科學與應用數學，在 AI 產品設計、前後端開發、模型評測等方面都有實際工程經驗。我喜歡從日常生活發掘潛在痛點，拆解模糊的需求，找到真正的問題，再透過原型和實驗逐步驗證。",
                        "My background is in computer science and applied mathematics, with hands-on engineering experience in AI product design, frontend and backend development, and model evaluation. I like spotting potential pain points in everyday life, unpacking ambiguous needs, and identifying the real problem before testing ideas through prototypes and experiments.",
                      ),
                    )}
                  </p>
                  <p>
                    {tr(
                      label(
                        "工作之外，我热爱历史文化，也喜欢动漫和音乐；有空时我会到处旅游，沉浸式体验当地的生活。我喜爱探寻不同的时代、故事和生活方式，让我愿意聆听他人的背景和想法，而不是急着替别人定义需求。",
                        "工作以外，我熱愛歷史文化，也喜歡動漫和音樂；有空時會四處旅行，深入體驗當地生活。我喜歡探索不同的時代、故事和生活方式，這讓我願意聆聽他人的背景與想法，而非急着替別人定義需求。",
                        "Outside work, I love history and culture, anime and music. When I have time, I travel and immerse myself in local life. Exploring different eras, stories and ways of living encourages me to listen to people’s backgrounds and perspectives rather than rush to define their needs for them.",
                      ),
                    )}
                  </p>
                  <p>
                    {tr(
                      label(
                        "我在意产品的人文关怀：产品的呈现与交互是否容易理解，是否能持续解决用户可能面临的各种问题，系统在真实应用中所能触及的边界，以及能否真正做到让用户信任、对用户负责。这些不应该是产品完成后的修饰，而是设计一开始就该考虑的事情。",
                        "我在意產品的人文關懷：產品的呈現與互動是否容易理解，能否持續解決用戶可能遇到的不同問題，系統在真實應用中的能力邊界，以及能否真正值得用戶信任、對用戶負責。這些不應是產品完成後的修飾，而是設計一開始就應考慮的事情。",
                        "I care about the human side of products: whether their presentation and interactions are easy to understand, whether they can keep addressing the different problems users face, and where their capabilities end in real-world use. Above all, I care about whether a product earns people’s trust and takes responsibility for them. These considerations belong at the start of design, not as finishing touches.",
                      ),
                    )}
                  </p>
                </div>
                <div className="life-grid">
                  {[1, 2].map((n) => (
                    <figure key={n}>
                      <img
                        src={asset(`/profile/life-${n}.webp`)}
                        width="850"
                        height="1133"
                        loading="lazy"
                        alt={tr(
                          n === 1
                            ? label(
                                "旅行中的张沁烨",
                                "旅途中的張沁燁",
                                "Qinye on a trip",
                              )
                            : label(
                                "演出现场的张沁烨",
                                "演出現場的張沁燁",
                                "Qinye at a live show",
                              ),
                        )}
                      />
                      <figcaption>
                        0{n + 1} /{" "}
                        {tr(
                          n === 1
                            ? label(
                                "在旅行中发现不同。",
                                "在旅途中發現不同。",
                                "Finding new perspectives.",
                              )
                            : label(
                                "为喜欢的故事和音乐奔赴。",
                                "為喜歡的故事和音樂奔赴。",
                                "Making time for what I love.",
                              ),
                        )}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            )}
            {file === "resume" && <Resume locale={locale} />}
            {file === "contact" && (
              <>
                <PageHeading
                  eyebrow="LET’S MAKE SOMETHING USEFUL"
                  title={tr(
                    label(
                      "从一次交流开始。",
                      "從一次交流開始。",
                      "Let’s start a conversation.",
                    ),
                  )}
                  subtitle={tr(
                    label(
                      "正在寻找 AI 产品经理机会。如果你也关心好用、可信、有温度的 AI 产品，欢迎联系我。",
                      "正在尋找 AI 產品經理機會。如果你也關心好用、可信、有溫度的 AI 產品，歡迎聯絡我。",
                      "I’m looking for AI product manager opportunities. If you care about useful, trustworthy and thoughtful AI products, I’d love to talk.",
                    ),
                  )}
                />
                <pre className="contact-code">
                  {JSON.stringify(
                    {
                      name: tr(copy.name),
                      role: "AI Product Manager",
                      email,
                      phone_hk: phones[0].display,
                      phone_mainland: phones[1].display,
                      status: "open_to_work",
                    },
                    null,
                    2,
                  )}
                </pre>
                <div className="contact-links">
                  <a href={`mailto:${email}`}>Email ↗</a>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(email);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      } catch {
                        window.location.href = `mailto:${email}`;
                      }
                    }}
                  >
                    {copied
                      ? tr(label("已复制", "已複製", "Copied"))
                      : tr(label("复制邮箱", "複製電郵", "Copy email"))}
                  </button>
                  <a href={linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                  <a href={github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                </div>
                <div className="contact-phones">
                  {phones.map((phone) => (
                    <a key={phone.href} href={phone.href}>
                      <span>{tr(phone.label)}</span>
                      <strong>{phone.display}</strong>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
                <p className="contact-note">
                  {tr(
                    label(
                      "本网站仅展示公开信息与脱敏案例，不公开内部系统、真实用户对话或候选人资料。",
                      "本網站只展示公開資訊與匿名案例，不公開內部系統、真實用戶對話或候選人資料。",
                      "This site shares public information and anonymized cases only. Internal systems, real user conversations and candidate records are not published.",
                    ),
                  )}
                </p>
              </>
            )}
            {entry && (
              <>
                <PageHeading
                  eyebrow={`${entry.category === "projects" ? "PROJECT" : "EXPERIENCE"} / ${entry.date}`}
                  title={tr(entry.title)}
                  subtitle={tr(entry.intro)}
                />
                <div className="case-meta">
                  <span>{tr(entry.role)}</span>
                  <div>
                    {entry.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="case-metric">
                  <strong>{entry.metric}</strong>
                  <span>{tr(entry.metricLabel)}</span>
                  <span className="metric-symbol" aria-hidden="true">
                    ↗
                  </span>
                </div>
                {entry.id === "academic-advisor" && (
                  <AcademicAdvisorMedia locale={locale} slot="opening" />
                )}
                {entry.id === "vivacity" && (
                  <VivacityEvidence locale={locale} slot="collaboration" />
                )}
                {entry.id === "recruiting-agent" && (
                  <div
                    className="pipeline"
                    aria-label={tr(
                      label(
                        "简历处理流程",
                        "履歷處理流程",
                        "Résumé processing workflow",
                      ),
                    )}
                  >
                    {[
                      label("多渠道汇集", "多渠道收集", "Intake"),
                      label("岗位规则", "職位規則", "Criteria"),
                      label("Agent 初筛", "Agent 初篩", "Agent screening"),
                      label("飞书摘要", "飛書摘要", "Feishu summary"),
                      label("人工复核", "人工覆核", "Human review"),
                    ].map((item, i) => (
                      <div key={i}>
                        <span>0{i + 1}</span>
                        {tr(item)}
                      </div>
                    ))}
                  </div>
                )}
                <div className="case-sections">
                  {entry.sections.map((section, i) => (
                    <div className="case-chapter" key={i}>
                      <section className="case-section">
                        <span className="section-index">0{i + 1}</span>
                        <div>
                          <h2>{tr(section.title)}</h2>
                          <p>{tr(section.body)}</p>
                          {section.points?.map((point, j) => (
                            <p key={j}>{tr(point)}</p>
                          ))}
                        </div>
                      </section>
                      {entry.id === "academic-advisor" && i === 0 && (
                        <AcademicAdvisorMedia locale={locale} slot="architecture" />
                      )}
                      {entry.id === "academic-advisor" && i === 1 && (
                        <AcademicAdvisorMedia locale={locale} slot="workflow" />
                      )}
                      {entry.id === "academic-advisor" && i === 2 && (
                        <AcademicAdvisorMedia locale={locale} slot="knowledge" />
                      )}
                      {entry.id === "academic-advisor" && i === 3 && (
                        <AcademicAdvisorMedia locale={locale} slot="handoff" />
                      )}
                      {entry.id === "academic-advisor" && i === 5 && (
                        <AcademicAdvisorMedia locale={locale} slot="results" />
                      )}
                      {entry.id === "gptutor" && i === 2 && (
                        <GptutorEvidence locale={locale} />
                      )}
                      {entry.id === "vivacity" && i === 2 && (
                        <VivacityEvidence locale={locale} slot="field" />
                      )}
                    </div>
                  ))}
                </div>
                {entry.note && (
                  <aside className="case-note">
                    <span>ⓘ</span>
                    <p>{tr(entry.note)}</p>
                  </aside>
                )}
                <div className="next-file">
                  <span>{tr(copy.next)}</span>
                  <Link
                    href={fileUrl(
                      locale,
                      entries[(entries.indexOf(entry) + 1) % entries.length].id,
                    )}
                  >
                    {tr(
                      entries[(entries.indexOf(entry) + 1) % entries.length]
                        .title,
                    )}{" "}
                    ↗
                  </Link>
                </div>
              </>
            )}
            <footer className="document-footer">
              <span>© 2026 QINYE ZHANG</span>
              <span>
                {tr(
                  label(
                    "以好奇心开始，以真实价值落地。",
                    "以好奇心開始，以真實價值落地。",
                    "Start with curiosity. Build for real value.",
                  ),
                )}
              </span>
              <a href={`mailto:${email}`}>SAY HELLO ↗</a>
            </footer>
          </article>
        </main>
      </div>
      <footer className="statusbar">
        <span>
          ⑂ main <span className="status-check">✓</span>
        </span>
        <span className="status-message">{tr(copy.open)}</span>
        <button onClick={() => setIntro(true)}>
          {tr(copy.replay)} <span>↻</span>
        </button>
        <span className="status-format">UTF-8 &nbsp; Markdown</span>
        <span>
          {locale === "en"
            ? "EN"
            : locale === "zh-cn"
              ? "简体中文"
              : "繁體中文"}
        </span>
        <span aria-hidden="true">♧</span>
      </footer>
      <dialog
        ref={dialog}
        className="search-dialog"
        onCancel={() => setSearch(false)}
        onClick={(event) => {
          if (event.target === dialog.current) setSearch(false);
        }}
      >
        <div className="search-heading">
          <input
            autoFocus
            aria-label={tr(copy.search)}
            placeholder={tr(copy.search)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setSearch(false)} aria-label={tr(copy.close)}>
            Esc
          </button>
        </div>
        <div className="search-results">
          {fileIds
            .filter((id) =>
              `${fileName(id)} ${tr(fileTitle(id))}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((id) => (
              <Link
                key={id}
                href={fileUrl(locale, id)}
                onClick={() => {
                  setSearch(false);
                  setQuery("");
                }}
              >
                <span className="file-icon">M↓</span>
                <span>
                  {tr(fileTitle(id))}
                  <small>{fileName(id)}</small>
                </span>
                <span>↵</span>
              </Link>
            ))}
          {!fileIds.some((id) =>
            `${fileName(id)} ${tr(fileTitle(id))}`
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && (
            <p>
              {tr(
                label("没有匹配的文件", "沒有相符的檔案", "No matching files"),
              )}
            </p>
          )}
        </div>
      </dialog>
      {intro && (
        <div className="intro-overlay">
          <div className="rain" aria-hidden="true">
            {Array.from({ length: 32 }, (_, i) => (
              <span
                key={i}
                style={{
                  left: `${(i * 3.23) % 100}%`,
                  animationDelay: `${(i % 8) * -0.16}s`,
                  animationDuration: `${1.1 + (i % 5) * 0.16}s`,
                }}
              >
                {glyphs[i % glyphs.length]}
              </span>
            ))}
          </div>
          <div className="intro-center">
            <span>QZ / WORKSPACE</span>
            <h2>
              {tr(
                label(
                  "好产品，从理解开始。",
                  "好產品，從理解開始。",
                  "Good products start with understanding.",
                ),
              )}
            </h2>
            <p>
              loading ideas, not just files<span>_</span>
            </p>
          </div>
          <button className="skip-intro" onClick={() => setIntro(false)}>
            {tr(copy.skip)} ↗
          </button>
        </div>
      )}
    </div>
  );
}

function PageHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="page-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-subtitle">{subtitle}</p>
    </header>
  );
}

function Resume({ locale }: { locale: Locale }) {
  const tr = (text: Text) => t(locale, text);
  const education = [
    [
      "2026.09 — 2027.10",
      label(
        "香港中文大学",
        "香港中文大學",
        "The Chinese University of Hong Kong",
      ),
      label("计算机科学 · 硕士", "電腦科學 · 碩士", "MSc · Computer Science"),
    ],
    [
      "2022.09 — 2026.08",
      label(
        "香港理工大学",
        "香港理工大學",
        "The Hong Kong Polytechnic University",
      ),
      label(
        "计算机科学与应用数学 · 学士｜2022/23 院长荣誉榜",
        "電腦科學與應用數學 · 學士｜2022/23 院長嘉許名單",
        "BSc · Computer Science & Applied Mathematics | Dean’s Honours List 2022/23",
      ),
    ],
    [
      "2023.06 — 2023.08",
      label(
        "伦敦大学学院 UCL",
        "倫敦大學學院 UCL",
        "University College London",
      ),
      label(
        "数据科学 · 暑期交换课程",
        "數據科學 · 暑期交流課程",
        "Data Science · Summer exchange",
      ),
    ],
  ] as const;
  return (
    <>
      <PageHeading
        eyebrow="RÉSUMÉ / UPDATED 2026.09"
        title={`${tr(copy.name)} / River`}
        subtitle={tr(
          label(
            "AI 产品经理。以用户问题为起点，结合产品设计、工程实现与评测，让想法走到可用。",
            "AI 產品經理。以用戶問題為起點，結合產品設計、工程實作與評測，讓想法走到可用。",
            "AI product manager. Starting with user problems, I combine product design, engineering and evaluation to turn ideas into useful experiences.",
          ),
        )}
      />
      <div className="resume-contact">
        <a href={`mailto:${email}`}>{email} ↗</a>
        <a href={linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href={github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <button onClick={() => window.print()}>
          {tr(label("打印 / 保存 PDF", "列印 / 儲存 PDF", "Print / save PDF"))}{" "}
          ↓
        </button>
      </div>
      <section className="resume-section">
        <h2>{tr(label("教育背景", "教育背景", "Education"))}</h2>
        {education.map(([date, title, body]) => (
          <div className="resume-row" key={date}>
            <time>{date}</time>
            <div>
              <h3>{tr(title)}</h3>
              <p>{tr(body)}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h2>{tr(copy.experience)}</h2>
        {entries
          .filter((e) => e.category === "experience")
          .map((e) => (
            <div className="resume-row" key={e.id}>
              <time>{e.date}</time>
              <div>
                <Link href={fileUrl(locale, e.id)}>
                  <h3>{tr(e.title)} ↗</h3>
                </Link>
                <span className="resume-role">{tr(e.role)}</span>
                <p>{tr(e.intro)}</p>
                <ul>
                  {e.sections.map((s, i) => (
                    <li key={i}>{tr(s.body)}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </section>
      <section className="resume-section">
        <h2>{tr(label("项目与研究", "項目與研究", "Projects & research"))}</h2>
        {entries
          .filter((e) => e.category === "projects")
          .map((e) => (
            <div className="resume-row" key={e.id}>
              <time>{e.date}</time>
              <div>
                <Link href={fileUrl(locale, e.id)}>
                  <h3>{tr(e.title)} ↗</h3>
                </Link>
                <span className="resume-role">{tr(e.role)}</span>
                <p>{tr(e.intro)}</p>
                <p>{tr(e.sections[e.sections.length - 1].body)}</p>
              </div>
            </div>
          ))}
      </section>
      <section className="resume-section">
        <h2>{tr(label("校园与实践", "校園與實踐", "Community & practice"))}</h2>
        <div className="resume-row">
          <time>2024.09 — 2025.05</time>
          <div>
            <h3>PolyU EAGLE</h3>
            <p>
              {tr(
                label(
                  "参与国际交流与尼泊尔学校的实地访谈，关注卫生与资源限制，设计可就地取材的太阳能室内通风方案。编写建造、维修与维护手册，获项目采纳并用于其他学校。",
                  "參與國際交流及尼泊爾學校實地訪談，關注衞生與資源限制，設計可就地取材的太陽能室內通風方案。編寫建造、維修及保養手冊，獲項目採納並用於其他學校。",
                  "Participated in international exchange and field interviews at a school in Nepal. Designed a locally sourced solar-powered ventilation approach around sanitation and resource constraints. Construction and maintenance guides were adopted for use in other schools.",
                ),
              )}
            </p>
          </div>
        </div>
        <div className="resume-row">
          <time>2023.03 — 2023.07</time>
          <div>
            <h3>
              {tr(
                label(
                  "PolyU COMP1004 · 助教",
                  "PolyU COMP1004 · 助教",
                  "PolyU COMP1004 · Teaching assistant",
                ),
              )}
            </h3>
            <p>
              {tr(
                label(
                  "设计 AI 入门课程与练习，开展 4 次辅导课，学生满意度高于院系平均。",
                  "設計 AI 入門課程與練習，主持 4 次導修課，學生滿意度高於學系平均。",
                  "Designed introductory AI lessons and exercises, delivered four tutorials, and received student satisfaction above the department average.",
                ),
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="resume-section">
        <h2>
          {tr(
            label(
              "创业、奖项与发表",
              "創業、獎項與發表",
              "Ventures, awards & publication",
            ),
          )}
        </h2>
        <ul className="achievement-list">
          <li>
            <strong>
              {tr(
                label(
                  "Kiwi AI · 联合创始人",
                  "Kiwi AI · 聯合創辦人",
                  "Kiwi AI · Co-founder",
                ),
              )}
            </strong>
            <p>
              {tr(
                label(
                  "面向香港大学生的 AI 学习与办公应用，参与前端与核心 Agent 工作流开发。",
                  "面向香港大學生的 AI 學習與辦公應用，參與前端及核心 Agent 工作流程開發。",
                  "AI learning and productivity tools for Hong Kong university students; frontend and core agent workflow development.",
                ),
              )}
            </p>
          </li>
          <li>
            <strong>HK Techathon+ 2025</strong>
            <p>
              {tr(
                label(
                  "铜奖；获香港科技园 Ideation 计划有条件录取。",
                  "銅獎；獲香港科技園 Ideation 計劃有條件取錄。",
                  "Bronze award; conditional acceptance into HKSTP’s Ideation programme.",
                ),
              )}
            </p>
          </li>
          <li>
            <strong>PolyU Micro Fund · HKD 100K</strong>
            <p>
              {tr(
                label(
                  "2024–25 首批资助，用于产品开发、推广与品牌建设。",
                  "2024–25 首批資助，用於產品開發、推廣及品牌建設。",
                  "First cohort of 2024–25 funding for development, marketing and brand building.",
                ),
              )}
            </p>
          </li>
          <li>
            <strong>PromptCraft-RAG · 2025</strong>
            <p>
              Zhang, Q. Applied and Computational Engineering, 154(1), 137–144.
            </p>
            <a
              href="https://doi.org/10.54254/2755-2721/2025.TJ23129"
              target="_blank"
              rel="noreferrer"
            >
              DOI ↗
            </a>
          </li>
        </ul>
      </section>
      <section className="resume-section">
        <h2>{tr(label("工具与能力", "工具與能力", "Tools & capabilities"))}</h2>
        <div className="skill-grid">
          <div>
            <h3>AI & Product</h3>
            <p>
              RAG · Agent workflows · Prompt engineering · Evaluation · Dify ·
              LangChain
            </p>
          </div>
          <div>
            <h3>Engineering</h3>
            <p>
              Python · TypeScript / JavaScript · React / Vue · Next.js · Node.js
              · HTML / CSS
            </p>
          </div>
          <div>
            <h3>Data & Infrastructure</h3>
            <p>PyTorch · TensorFlow · NumPy · Redis · Docker</p>
          </div>
          <div>
            <h3>{tr(label("语言", "語言", "Languages"))}</h3>
            <p>
              {tr(
                label(
                  "普通话：母语 · 英语：工作语言 · 粤语：日常交流",
                  "普通話：母語 · 英語：工作語言 · 粵語：日常交流",
                  "Mandarin: native · English: working proficiency · Cantonese: conversational",
                ),
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
