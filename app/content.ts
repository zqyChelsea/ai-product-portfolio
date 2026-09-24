export const locales = ["zh-cn", "zh-hk", "en"] as const;
export type Locale = (typeof locales)[number];
export type Text = readonly [string, string, string];
export const t = (locale: Locale, text: Text) => text[locales.indexOf(locale)];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;
export const email = "zqyRiver@gmail.com";
export const github = "https://github.com/zqyRiver";
export const linkedin = "https://www.linkedin.com/in/qinye-zhang-247435295/";

export type Section = { title: Text; body: Text; points?: Text[] };
export type Entry = {
  id: string;
  file: string;
  title: Text;
  category: "projects" | "experience";
  date: string;
  role: Text;
  intro: Text;
  tags: string[];
  metric: string;
  metricLabel: Text;
  sections: Section[];
  note?: Text;
};
export const entries: Entry[] = [
  {
    id: "recruiting-agent",
    file: "recruiting-agent.md",
    category: "projects",
    date: "2026.06 — 2026.07",
    title: ["AI 招聘官", "AI 招聘官", "An AI recruiting copilot"],
    role: [
      "产品设计 · 工程实现",
      "產品設計 · 工程實作",
      "Product design · Engineering",
    ],
    intro: [
      "让分散的简历进入同一条工作流，让初筛结论有证据可追溯。AI 帮助整理和判断，最终决定留给人。",
      "讓分散的履歷進入同一條工作流程，讓初篩結論有證據可追溯。AI 協助整理和判斷，最終決定留給人。",
      "One workflow for scattered applications. Evidence behind every screening recommendation. AI supports the decision; people own it.",
    ],
    tags: ["Agent", "Workflow", "Human-in-the-loop"],
    metric: "01 → 04",
    metricLabel: [
      "贯通四轮招聘流程的筛选设计",
      "貫通四輪招聘流程的篩選設計",
      "Screening designed around a four-stage hiring funnel",
    ],
    sections: [
      {
        title: [
          "先找到真正的缺口",
          "先找到真正的缺口",
          "Find the gap, not just the repetitive work",
        ],
        body: [
          "某 AI 公司招聘硬件、C++ 等工程岗位，并逐步拓展机械、电子和深度学习方向。简历分散在社交平台和招聘平台，HR 需要反复切换应用；初筛依赖 HR 与工程师的人工判断。",
          "某 AI 公司招聘硬件、C++ 等工程職位，並逐步拓展機械、電子及深度學習方向。履歷分散在社交及招聘平台，HR 需要反覆切換應用程式；初篩依賴 HR 與工程師的人工判斷。",
          "An AI company recruits hardware and C++ engineers and is expanding into mechanical, electronics and deep-learning roles. Applications arrive across social and recruiting platforms, leaving HR to switch apps and consult engineers manually.",
        ],
        points: [
          [
            "我梳理了「简历初筛 → 技术面 → 笔试 → 综合面」的四轮流程。初筛入围人数与技术面通过人数差距较大，提示早期筛选标准与后续技术要求可能不一致。",
            "我梳理了「履歷初篩 → 技術面試 → 筆試 → 綜合面試」四輪流程。初篩入圍與技術面試通過人數差距較大，提示早期篩選標準與後續技術要求可能不一致。",
            "I mapped résumé screening, technical interviews, written tests and final interviews. The drop-off after screening suggested a possible mismatch between early criteria and later technical expectations.",
          ],
          [
            "因此，目标不只是更快地筛简历，而是让初筛有统一标准，能把有用的证据交给下一轮面试官。",
            "因此，目標不只是更快地篩履歷，而是讓初篩有統一標準，能把有用的證據交給下一輪面試官。",
            "The goal was not simply faster screening. It was consistent criteria and useful evidence for the next interviewer.",
          ],
        ],
      },
      {
        title: [
          "把判断拆成可配置的规则",
          "把判斷拆成可配置的規則",
          "Make the decision structure explicit",
        ],
        body: [
          "将岗位画像、硬性要求与分层评估分开配置。Agent 不只给出推荐结论，还需要说明简历依据、潜在风险和待核实问题；材料缺失不等于能力不足，存疑项交由人工复核。",
          "將職位要求、硬性條件與分層評估分開配置。Agent 不只給出建議，還需要說明履歷依據、潛在風險和待核實問題；資料缺失不等於能力不足，存疑項交由人工覆核。",
          "I separated job profiles, hard requirements and layered assessments. The agent surfaces résumé evidence, risks and questions to verify—not just a recommendation. Missing information is not proof of missing ability; uncertainty goes to human review.",
        ],
      },
      {
        title: [
          "从收集到行动，而不是多一个后台",
          "從收集到行動，而不是多一個後台",
          "Deliver a workflow, not another dashboard",
        ],
        body: [
          "把多渠道简历汇集、自动初筛、状态汇总与飞书定时推送串联起来。消息卡片提供候选人摘要和需要关注的理由，让负责人在日常沟通工具里就能了解进展。",
          "串連多渠道履歷收集、自動初篩、狀態整理與飛書定時推送。訊息卡片提供候選人摘要及值得關注的原因，讓負責人在日常溝通工具中了解進度。",
          "The pipeline connects multi-channel intake, automated screening, status tracking and scheduled Feishu summaries. Candidate cards surface the relevant evidence where decision-makers already work.",
        ],
      },
      {
        title: [
          "怎么判断它真的有用",
          "如何判斷它真的有用",
          "Define success beyond automation",
        ],
        body: [
          "将技术面通过情况、人工复核耗时和误筛反馈作为后续评估方向。它们比「处理了多少份简历」更接近产品价值。目前不将这些目标写成已经达成的提升。",
          "以技術面試通過情況、人工覆核時間和誤篩回饋作為後續評估方向。它們比「處理了多少份履歷」更接近產品價值。目前不將這些目標寫成已達成的提升。",
          "The proposed evaluation looks at technical-interview outcomes, review time and screening-error feedback. These are planned measures, not claimed improvements.",
        ],
      },
    ],
    note: [
      "保密说明：客户、人员、候选人数据及内部地址均已隐去。此处只呈现脱敏后的产品设计，不提供客户系统入口。",
      "保密說明：客戶、個人、候選人資料及內部網址均已隱去。此處只呈現匿名化的產品設計，不提供客戶系統入口。",
      "Confidentiality: client identities, personal data and internal URLs are withheld. This case shares an anonymized design process, not access to the client system.",
    ],
  },
  {
    id: "gptutor",
    file: "gptutor-rag.md",
    category: "projects",
    date: "2024.06 — 2026.04",
    title: [
      "GPTutor：让知识连起来",
      "GPTutor：讓知識連起來",
      "GPTutor: connect the knowledge",
    ],
    role: [
      "核心研发 · RAG 优化",
      "核心研發 · RAG 優化",
      "Core R&D · RAG optimization",
    ],
    intro: [
      "学生需要的是符合课程语境、能够串联章节的回答，而不只是几段看似相关的文字。",
      "學生需要的是符合課程語境、能夠串連章節的回答，而不只是幾段看似相關的文字。",
      "Students need answers grounded in their course, with connections across chapters—not just a few relevant-looking passages.",
    ],
    tags: ["RAG", "Information architecture", "Evaluation"],
    metric: "70% → 91%",
    metricLabel: [
      "50 道跨章节问题的回答相关性与引用正确性评估",
      "50 道跨章節問題的回答相關性與引用正確性評估",
      "Answer relevance / citation correctness evaluation on 50 cross-chapter questions",
    ],
    sections: [
      {
        title: [
          "从学习场景定义检索问题",
          "從學習情境定義檢索問題",
          "Start with how students learn",
        ],
        body: [
          "课程讲义包含表格、公式和跨章节关联。单纯切分文字容易丢失结构；通用模型也可能引入课外知识，让术语和讲授口径不一致。我将课程忠实度、上下文连贯性与响应延迟一起纳入设计。",
          "課程講義包含表格、公式和跨章節關聯。單純切分文字容易丟失結構；通用模型亦可能引入課外知識，令術語和授課內容不一致。我將課程忠實度、上下文連貫性與回應延遲一同納入設計。",
          "Course materials mix tables, formulas and cross-chapter dependencies. Plain text splitting loses structure, while a general model may introduce inconsistent terminology. I considered course fidelity, coherence and latency together.",
        ],
      },
      {
        title: [
          "保留结构，再检索内容",
          "保留結構，再檢索內容",
          "Retrieve content with its structure intact",
        ],
        body: [
          "采用分层分块与元数据增强，为检索单元补充章节标题和段落摘要。这样，模型拿到的不只是孤立片段，还有片段在课程中的位置，减少跨章节问答中的上下文断裂。",
          "採用分層分塊與元資料增強，為檢索單元補充章節標題和段落摘要。模型取得的不只是孤立片段，還有片段在課程中的位置，減少跨章節問答的上下文斷裂。",
          "Hierarchical chunking and metadata enrichment attach chapter titles and paragraph summaries to retrieval units. The model receives both the passage and its place in the course, reducing fragmented context.",
        ],
      },
      {
        title: [
          "用题目与学生反馈交叉验证",
          "以題目與學生回饋交叉驗證",
          "Evaluate answers and the learning experience",
        ],
        body: [
          "在 50 道跨章节问题上，回答相关性与引用正确性评估由 70% 提升至 91%。另有 300 名学生参与问卷，80–85% 认为准确性与连贯性有所改善。方案已在部分通识和低年级课程上线。",
          "在 50 道跨章節問題上，回答相關性與引用正確性評估由 70% 提升至 91%。另有 300 名學生參與問卷，80–85% 認為準確性與連貫性有所改善。方案已於部分通識及低年級課程上線。",
          "On 50 cross-chapter questions, the answer relevance / citation correctness evaluation rose from 70% to 91%. In a separate survey of 300 students, 80–85% reported better accuracy and coherence. The approach was deployed in selected general-education and early-year courses.",
        ],
      },
    ],
    note: [
      "数据口径：题目评估与学生主观反馈是两类证据，不等同于学习成绩提升；考试周访问增长也不能直接归因于 RAG 优化。",
      "數據口徑：題目評估與學生主觀回饋是兩類證據，不等同於學習成績提升；考試週流量增長亦不能直接歸因於 RAG 優化。",
      "Measurement note: task evaluation and student perceptions are distinct evidence; neither establishes a learning-outcome gain. Exam-period traffic is not causal evidence of the RAG changes.",
    ],
  },
  {
    id: "academic-advisor",
    file: "academic-advisor.md",
    category: "projects",
    date: "2025.10 — 2026.05",
    title: ["香港理工大学Agent学术顾问", "Agent 學術顧問", "An academic advisor agent"],
    role: [
      "独立设计与开发",
      "獨立設計與開發",
      "Independent design & development",
    ],
    intro: [
      "选课、毕业要求、学生事务，不应该要求学生先知道「该去哪个网站」。",
      "選科、畢業要求、學生事務，不應要求學生先知道「應該去哪個網站」。",
      "Students should not need to know which university website to visit before they can ask for help.",
    ],
    tags: ["Multi-agent", "Dify", "User research"],
    metric: "74.2",
    metricLabel: [
      "系统可用性量表（SUS）得分",
      "系統可用性量表（SUS）得分",
      "System Usability Scale (SUS) score",
    ],
    sections: [
      {
        title: [
          "信息分散，问题却是连着的",
          "資訊分散，問題卻是連着的",
          "Fragmented information, connected questions",
        ],
        body: [
          "学生的课程、毕业和事务问题横跨多个部门，人工咨询资源有限，原有问答工具也难以理解自然语言。我希望让学生从自己的问题出发，而不是从学校的组织结构出发。",
          "學生的選科、畢業和事務問題跨越多個部門，人工諮詢資源有限，原有問答工具亦難以理解自然語言。我希望讓學生從自己的問題出發，而非從學校的組織架構出發。",
          "Academic and administrative questions span multiple departments. Human support is limited and the previous chatbot struggled with natural language. I wanted the experience to begin with the student’s question, not the institution’s org chart.",
        ],
      },
      {
        title: [
          "让系统会查，也知道何时不答",
          "讓系統懂得查，也知道何時不答",
          "Know how to retrieve—and when to defer",
        ],
        body: [
          "使用 Dify 搭建多 Agent 工作流，整合院系、大学与学生事务知识；以 PDF 转 Markdown 和网页采集流程维护知识库。遇到模糊问题先澄清，超出范围时提供人工咨询路径，并把反馈用于完善知识库。",
          "使用 Dify 建立多 Agent 工作流程，整合學系、大學與學生事務知識；以 PDF 轉 Markdown 及網頁擷取流程維護知識庫。遇到含糊問題先釐清，超出範圍時提供人工諮詢途徑，並以回饋完善知識庫。",
          "I built multi-agent workflows in Dify, bringing together department, university and student-service knowledge through PDF-to-Markdown and web collection pipelines. Ambiguous queries trigger clarification; out-of-scope questions route to human support. Feedback informs knowledge-base updates.",
        ],
      },
      {
        title: [
          "把可用性也当作产品指标",
          "把可用性亦視為產品指標",
          "Treat usability as a product outcome",
        ],
        body: [
          "通过 30 道真实问题对比测试和约 70 名学生问卷进行验证。召回与简单问题准确性评估达到 85–90%，SUS 得分为 74.2；问卷中，对界面、知识与检索的满意反馈约为 90%。",
          "透過 30 道真實問題對比測試及約 70 名學生問卷驗證。召回與簡單問題準確性評估達 85–90%，SUS 得分為 74.2；問卷對介面、知識及檢索的滿意回饋約為 90%。",
          "Validation combined 30 real-question comparisons with a survey of approximately 70 students. Recall / simple-question accuracy evaluation reached 85–90%, with a SUS score of 74.2. Around 90% of survey feedback on the interface, knowledge and retrieval was positive.",
        ],
      },
    ],
    note: [
      "设计边界：涉及心理困扰等敏感问题时，重视专业支持路径，不把对话系统包装成专业人员的替代品。",
      "設計邊界：涉及心理困擾等敏感問題時，重視專業支援途徑，不將對話系統包裝成專業人員的替代品。",
      "Design boundary: for sensitive concerns such as emotional distress, prioritize professional support rather than presenting a chatbot as a substitute for a qualified person.",
    ],
  },
  {
    id: "crawler-research",
    file: "crawler-safety.md",
    category: "projects",
    date: "2025.06 — 2025.08",
    title: [
      "LLM 爬虫安全研究",
      "LLM 爬蟲安全研究",
      "LLM crawler safety research",
    ],
    role: [
      "南洋理工大学 · 本科生暑期研究员",
      "南洋理工大學 · 本科生暑期研究員",
      "Nanyang Technological University · Summer researcher",
    ],
    intro: [
      "当语言模型替我们浏览网页，网页内容也可能反过来影响模型。如何测试这种风险？",
      "當語言模型替我們瀏覽網頁，網頁內容亦可能反過來影響模型。如何測試這種風險？",
      "When language models browse on our behalf, web content can influence their behavior. How do we test that risk?",
    ],
    tags: ["LLM security", "Multi-agent", "Research"],
    metric: "20",
    metricLabel: ["组对比实验", "組對比實驗", "Comparative experiments"],
    sections: [
      {
        title: [
          "把安全问题变成可复现的测试",
          "將安全問題轉成可重現的測試",
          "Turn safety concerns into reproducible tests",
        ],
        body: [
          "围绕对抗场景中的图片提取，构建测试框架与测试集，覆盖三类攻击与两类防御策略，以准确率和召回率衡量不同方法的表现。",
          "圍繞對抗情境中的圖片擷取，建立測試框架與測試集，涵蓋三類攻擊及兩類防禦策略，以準確率和召回率衡量不同方法的表現。",
          "I developed a framework and test set for adversarial image extraction, covering three attack types and two defense strategies, with precision and recall as evaluation measures.",
        ],
      },
      {
        title: [
          "比较不同 Agent 实现路径",
          "比較不同 Agent 實作路徑",
          "Compare agent architectures",
        ],
        body: [
          "研究 LLM-to-Script 与 LLM-Native Crawlers，并通过多 Agent 自动化动态网页提取。完成 20 组对比实验，为后续策略选择提供可比较的依据。",
          "研究 LLM-to-Script 與 LLM-Native Crawlers，並透過多 Agent 自動化動態網頁擷取。完成 20 組對比實驗，為後續策略選擇提供可比較的依據。",
          "I investigated LLM-to-Script and LLM-Native Crawlers and automated dynamic-page extraction with multiple agents. Twenty comparative experiments provided evidence for evaluating alternative strategies.",
        ],
      },
    ],
  },
  {
    id: "meituan",
    file: "meituan-evaluation.md",
    category: "experience",
    date: "2026.07 — 2026.09",
    title: [
      "美团 · 大模型评测",
      "美團 · 大模型評測",
      "Meituan · LLM evaluation",
    ],
    role: [
      "产品部门 · 大模型评测实习生",
      "產品部門 · 大模型評測實習生",
      "Product team · LLM evaluation intern",
    ],
    intro: [
      "不仅看 Code Agent 能否写出代码，更关心它能否在长程、多轮的真实任务里持续推进，并交付可验证的结果。",
      "不只看 Code Agent 能否寫出程式碼，更關心它能否在長程、多輪的真實任務中持續推進，並交付可驗證的結果。",
      "Beyond whether a code agent can write code: can it sustain progress through long-horizon, multi-turn work and deliver verifiable results?",
    ],
    tags: ["Code Agent", "Benchmark", "Evaluation design"],
    metric: "Long-horizon",
    metricLabel: [
      "从真实请求到可验证的评测任务",
      "從真實請求到可驗證的評測任務",
      "From real requests to verifiable evaluation tasks",
    ],
    sections: [
      {
        title: [
          "先研究「评什么」",
          "先研究「評甚麼」",
          "Understand what a benchmark actually measures",
        ],
        body: [
          "阅读论文并复现实验，比较公开 benchmark 在长程代码任务中的优劣。重点关注任务真实性、环境可复现性、行为覆盖范围和评分可解释性，为评测方案选型提供依据。",
          "閱讀論文並重現實驗，比較公開 benchmark 在長程程式碼任務中的優劣。重點關注任務真實性、環境可重現性、行為覆蓋範圍和評分可解釋性，為評測方案選型提供依據。",
          "I read papers and reproduced experiments to compare public benchmarks for long-horizon coding. I focused on realistic tasks, reproducible environments, behavioral coverage and interpretable scoring to inform benchmark selection.",
        ],
      },
      {
        title: [
          "把任务构建写成可执行的规范",
          "將任務建構寫成可執行的規範",
          "Make task construction actionable",
        ],
        body: [
          "撰写长程任务构建任务书，说明真实请求的数据来源类型、筛选条件与任务组成。设计 reward、行为测试与轨迹分析思路，并明确阶段性产物和最终交付的评分标准，让过程与结果都能被检查。",
          "撰寫長程任務建構規範，說明真實請求的資料來源類型、篩選條件與任務組成。設計 reward、行為測試與軌跡分析方法，並明確階段產物及最終交付的評分標準，讓過程與結果均可被檢查。",
          "I wrote a long-horizon task construction specification covering source types, request selection and task composition. It defined reward design, behavior tests, trajectory analysis and scoring criteria for intermediate artifacts and final deliverables.",
        ],
      },
      {
        title: [
          "将多轮对话变成可运行的任务",
          "將多輪對話轉成可運行的任務",
          "Convert conversations into runnable evaluations",
        ],
        body: [
          "参与制定多轮代码任务的一级、二级分类与标注规范，对数千条用户会话进行筛选和标注；基于会话构建多轮任务，搭建最小可行 Demo，验证从数据整理到任务评测的工作流程。",
          "參與制定多輪程式碼任務的一級、二級分類及標註規範，篩選和標註數千條用戶對話；基於對話建構多輪任務，建立最小可行 Demo，驗證從資料整理到任務評測的工作流程。",
          "I co-developed primary and secondary task categories and annotation guidelines, screened and annotated thousands of user sessions, and helped build multi-turn tasks and an MVP demo to validate the construction-to-evaluation workflow.",
        ],
      },
    ],
    note: [
      "仅展示职责与通用方法。内部请求、数据样本、具体评测题目、实现细节和业务指标不公开。",
      "只展示職責與通用方法。內部請求、資料樣本、具體評測題目、實作細節及業務指標不公開。",
      "Only responsibilities and general methods are shared. Internal requests, data samples, evaluation tasks, implementation details and business metrics remain private.",
    ],
  },
  {
    id: "vivacity",
    file: "vivacity-feedback.md",
    category: "experience",
    date: "2025.07 — 2025.08",
    title: [
      "Vivacity · 玩家反馈智能台",
      "Vivacity · 玩家回饋智能台",
      "Vivacity · Player feedback intelligence",
    ],
    role: ["全栈开发工程师", "全端開發工程師", "Full-stack engineer"],
    intro: [
      "让散落在聊天、客服和社区里的声音，成为游戏团队能及时采取行动的反馈。",
      "讓散落在聊天、客服和社群中的聲音，成為遊戲團隊能及時採取行動的回饋。",
      "Turn scattered player conversations into feedback that game teams can act on.",
    ],
    tags: ["TypeScript", "Node.js", "B2B"],
    metric: "500 / day",
    metricLabel: [
      "ChinaJoy 2025 展会期间的日交互量",
      "ChinaJoy 2025 展會期間的每日互動量",
      "Daily interactions during ChinaJoy 2025",
    ],
    sections: [
      {
        title: [
          "从信息噪声中识别产品问题",
          "從資訊雜訊中辨識產品問題",
          "Find product issues in the noise",
        ],
        body: [
          "游戏反馈分散在多个渠道，人工汇总慢，也容易错过关键问题。我参与构建面向游戏工作室的 B2B 看板，将多渠道收集、主题归类和摘要推送整合起来。",
          "遊戲回饋分散於多個渠道，人工整理慢，亦容易錯過關鍵問題。我參與建立面向遊戲工作室的 B2B 看板，整合多渠道收集、主題分類和摘要推送。",
          "Player feedback was fragmented and slow to aggregate manually. I helped build a B2B dashboard for game studios combining multi-channel collection, issue classification and summary delivery.",
        ],
      },
      {
        title: [
          "降低收集成本，保留业务语境",
          "降低收集成本，保留業務語境",
          "Reduce collection effort without losing context",
        ],
        body: [
          "使用 OneBot、TypeScript 与 Node.js 实现 QQ、Discord 机器人及看板，支持无需 @ 机器人的后台收集。通过轻量 NLP 与规则去噪，将反馈归入平衡性、性能、付费体验等主题，并支持按版本和模块查看。",
          "使用 OneBot、TypeScript 與 Node.js 實作 QQ、Discord 機械人及看板，支援毋須 @ 機械人的後台收集。以輕量 NLP 和規則去除雜訊，將回饋分為平衡性、效能、付費體驗等主題，並支援按版本及模組查看。",
          "Using OneBot, TypeScript and Node.js, I built QQ / Discord bots and dashboard features with passive collection. Lightweight NLP and rules filtered noise and classified balance, performance and payment-experience feedback, with version- and module-level views.",
        ],
      },
      {
        title: [
          "在目标客户场景中验证",
          "在目標客戶情境中驗證",
          "Validate with the intended audience",
        ],
        body: [
          "与目标企业开展试用，并在 ChinaJoy 2025 展示，展会期间日交互量约 500。这个数字代表特定活动期间的使用情况，不等同于长期留存或付费转化。",
          "與目標企業開展試用，並於 ChinaJoy 2025 展示，展會期間每日互動量約 500。此數字代表特定活動期間的使用情況，不等同於長期留存或付費轉化。",
          "The product was piloted with target companies and demonstrated at ChinaJoy 2025, with approximately 500 daily interactions during the event. This event-specific figure does not establish long-term retention or paid conversion.",
        ],
      },
    ],
  },
  {
    id: "coxana",
    file: "coxana-recommendation.md",
    category: "experience",
    date: "2024.07 — 2024.08",
    title: [
      "COXANA · 精油推荐体验",
      "COXANA · 精油推薦體驗",
      "COXANA · Conversational recommendations",
    ],
    role: [
      "AI 提示工程师与前端开发助理",
      "AI 提示工程師與前端開發助理",
      "AI prompt engineer & frontend assistant",
    ],
    intro: [
      "从「这些成分是什么」，转向「我该如何选择」。用对话帮助用户理解产品，而不是再增加一页参数。",
      "從「這些成分是甚麼」，轉向「我應如何選擇」。以對話協助用戶理解產品，而非再增加一頁參數。",
      "Move from “what are these ingredients?” to “how do I choose?” Help people understand products through conversation, not another specification sheet.",
    ],
    tags: ["Prompt design", "Frontend", "Commerce"],
    metric: "~10%",
    metricLabel: [
      "同期精油销售额增长；非因果归因",
      "同期精油銷售額增長；非因果歸因",
      "Same-period oil sales growth; not a causal estimate",
    ],
    sections: [
      {
        title: [
          "发现选择过程里的信息缺口",
          "發現選擇過程中的資訊缺口",
          "Identify the missing context in a purchase",
        ],
        body: [
          "原有产品页面偏重成分介绍，缺少使用场景和方法，用户难以将自身需求与产品对应。我提出以对话式推荐补齐这段体验。",
          "原有產品頁面偏重成分介紹，缺少使用情境和方法，用戶難以將自身需要與產品對應。我提出以對話式推薦補足這段體驗。",
          "Product pages emphasized ingredients but lacked usage scenarios and guidance. Customers struggled to connect their needs to a suitable product, so I proposed a conversational recommendation experience.",
        ],
      },
      {
        title: [
          "连接需求理解与产品页面",
          "連接需求理解與產品頁面",
          "Connect the conversation to the product",
        ],
        body: [
          "整理 WhatsApp 与线上论坛中的需求表达，设计提示词流程，并参与聊天机器人与前端集成。回答中提供相关产品入口，形成「描述需求 → 理解推荐 → 查看产品」的连续路径。",
          "整理 WhatsApp 與網上論壇中的需求表達，設計提示詞流程，並參與聊天機械人與前端整合。回答提供相關產品入口，形成「描述需要 → 理解推薦 → 查看產品」的連續路徑。",
          "I organized need expressions from WhatsApp and online forums, designed prompt flows and helped integrate the chatbot with the frontend. Answers link to relevant products, connecting need discovery, recommendation and product exploration.",
        ],
      },
      {
        title: [
          "上线后的观察与边界",
          "上線後的觀察與邊界",
          "Observe outcomes and respect the limits",
        ],
        body: [
          "方案被采纳并上线，对话与页面访问增加，同期精油销售额约增长 10%。这是一项同期业务观察，不声称增长完全由机器人带来；推荐也不应被表述为医疗诊断或疗效保证。",
          "方案獲採納並上線，對話與頁面流量增加，同期精油銷售額約增長 10%。這是同期業務觀察，不聲稱增長完全由機械人帶來；推薦亦不應被表述為醫療診斷或療效保證。",
          "The proposal was adopted and launched. Conversations and page visits increased, with oil sales growing about 10% in the same period. This is an observed association, not a causal claim. Recommendations must not imply medical diagnosis or guaranteed effects.",
        ],
      },
    ],
  },
];

export const extraFiles = ["readme", "about", "resume", "contact"] as const;
export const fileIds = [...extraFiles, ...entries.map((e) => e.id)];
export const fileName = (id: string) =>
  ({
    readme: "README.md",
    about: "about-me.md",
    resume: "resume.md",
    contact: "contact.json",
  })[id] ||
  entries.find((e) => e.id === id)?.file ||
  "README.md";
export const fileTitle = (id: string): Text =>
  (
    ({
      readme: ["开始阅读", "開始閱讀", "Start here"],
      about: ["关于我", "關於我", "About me"],
      resume: ["简历一览", "履歷一覽", "Résumé"],
      contact: ["保持联系", "保持聯絡", "Get in touch"],
    }) as Record<string, Text>
  )[id] || entries.find((e) => e.id === id)!.title;
export const fileUrl = (locale: Locale, id: string) =>
  id === "readme" ? `/${locale}/` : `/${locale}/files/${id}/`;
export const copy = {
  name: ["张沁烨", "張沁燁", "Qinye Zhang"] as Text,
  role: ["AI 产品经理", "AI 產品經理", "AI Product Manager"] as Text,
  open: [
    "正在寻找 AI 产品机会",
    "正在尋找 AI 產品機會",
    "Open to AI product opportunities",
  ] as Text,
  projects: ["项目", "項目", "projects"] as Text,
  experience: ["实习经历", "實習經歷", "experience"] as Text,
  personal: ["关于我", "個人", "personal"] as Text,
  explore: ["打开重点项目", "開啟重點項目", "Explore the work"] as Text,
  resume: ["查看简历", "查看履歷", "View résumé"] as Text,
  search: ["搜索文件…", "搜尋檔案…", "Search files…"] as Text,
  close: ["关闭", "關閉", "Close"] as Text,
  skip: ["跳过动画", "略過動畫", "Skip intro"] as Text,
  replay: ["重播代码雨", "重播程式碼雨", "Replay code rain"] as Text,
  menu: ["打开文件目录", "開啟檔案目錄", "Open explorer"] as Text,
  next: ["接着阅读", "繼續閱讀", "Read next"] as Text,
  back: ["回到首页", "返回首頁", "Back to start"] as Text,
};
