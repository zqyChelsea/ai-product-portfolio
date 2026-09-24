export const locales = ["zh-cn", "zh-hk", "en"] as const;
export type Locale = (typeof locales)[number];
export type Text = readonly [string, string, string];
export const t = (locale: Locale, text: Text) => text[locales.indexOf(locale)];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;
export const email = "zqy.river@gmail.com";
export const phones = [
  {
    label: ["香港", "香港", "Hong Kong"] as Text,
    display: "+852 63144816",
    href: "tel:+85263144816",
  },
  {
    label: ["中国大陆", "中國內地", "Mainland China"] as Text,
    display: "+86 18252616365",
    href: "tel:+8618252616365",
  },
];
export const github = "https://github.com/zqyChelsea";
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
        points: [
          [
            "我没有先问“模型能生成什么”，而是从学生最容易卡住的跨章节追问出发：答案需要引用哪一段、缺了什么上下文、什么时候应该承认材料不足。",
            "我沒有先問「模型能生成甚麼」，而是從學生最容易卡住的跨章節追問出發：答案需要引用哪一段、欠缺甚麼語境、何時應該承認資料不足。",
            "I did not begin with what the model could generate. I began with the cross-chapter questions that tend to block students: which passage should support the answer, what context is missing, and when should the system admit that the material is insufficient?",
          ],
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
          "让教师能够配置，而不是等待工程师修改",
          "讓教師可以自行配置，而非等待工程師修改",
          "Let educators configure the experience",
        ],
        body: [
          "GPTutor 不只是一只聊天机器人。以眼科实践模拟为例，课程团队可以在后台设置场景背景、检查动作、动作说明与预期反馈。教学意图被拆成可编辑字段，教师能够调整任务，学生则在更具体的情境里练习判断。模型能力因此进入课程设计，而不是停留在一个通用对话框里。",
          "GPTutor 不只是一個聊天機械人。以眼科實踐模擬為例，課程團隊可以在後台設定場景背景、檢查動作、動作說明及預期回饋。教學意圖被拆成可編輯欄位，教師可以調整任務，學生則在更具體的情境中練習判斷。模型能力因而進入課程設計，而非停留在一個通用對話框內。",
          "GPTutor is more than a chatbot. In an ophthalmic practice simulation, for example, course teams can configure the setting, examination actions, instructions and expected feedback. Teaching intent becomes editable fields: educators can adjust the task, while students practise judgment in a concrete scenario. The model becomes part of course design instead of remaining a generic chat box.",
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
        points: [
          [
            "项目也以现场 Demo 的形式参与 Global AI Forum 展示。公开展示迫使我们把复杂的技术路径讲成一段几分钟内就能看懂、能够亲手体验的产品故事。",
            "項目亦以現場 Demo 形式參與 Global AI Forum 展示。公開展示促使我們把複雜的技術路徑，整理成一段數分鐘內能夠理解、可以親手體驗的產品故事。",
            "The project was also demonstrated at the Global AI Forum. A public demo forced us to turn a complex technical path into a product story that visitors could understand and try within minutes.",
          ],
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
    date: "2025.09 — 2026.04",
    title: [
      "香港理工大学Agent学术顾问",
      "香港理工大學 Agent 學術顧問",
      "PolyU academic advisor agent",
    ],
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
    tags: ["Agentic RAG", "Dify", "Product evaluation"],
    metric: "74.2 / 100",
    metricLabel: [
      "26 位学生实测后的 SUS 可用性得分，高于 68 分常用基准",
      "26 位學生實測後的 SUS 可用性得分，高於 68 分常用基準",
      "SUS usability score from 26 student tests, above the common benchmark of 68",
    ],
    sections: [
      {
        title: [
          "先把问题从学校的组织结构里解放出来",
          "先把問題從學校的組織架構中解放出來",
          "Start with the student, not the org chart",
        ],
        body: [
          "选课、毕业要求与学生事务散落在院系文件、大学政策和学生事务网页里。学生往往不知道问题属于哪个部门；人工顾问则要反复查阅不同年份的文件。原有菜单式聊天机器人能指路，却难以理解自然语言和跨文件条件。产品目标由此确定：给学生一个统一入口，把可核对的答案送到问题发生的地方。",
          "選科、畢業要求與學生事務散落在學系文件、大學政策及學生事務網頁。學生往往不知道問題屬於哪個部門；人工顧問則要反覆查閱不同年份的文件。原有選單式聊天機械人能夠指路，卻難以理解自然語言與跨文件條件。產品目標因此確立：給學生一個統一入口，把可核對的答案帶到問題發生的地方。",
          "Course planning, graduation rules and student services live across departmental documents, university policies and service websites. Students may not know which office owns a question, while advisors repeatedly search cohort-specific files. The existing menu-based bot could point to pages but struggled with natural language and cross-document conditions. The product goal became clear: one entry point, with verifiable answers delivered where the question begins.",
        ],
        points: [
          [
            "核心用户包括本科生与学术顾问；两者共享知识来源，但需要不同的回答深度。",
            "核心用戶包括本科生與學術顧問；兩者共用知識來源，但需要不同的回答深度。",
            "The core users are undergraduates and academic advisors. They share sources but need different levels of detail.",
          ],
          [
            "成功不只看回答是否流畅，还要看来源能否追溯、规则是否遵守、系统是否知道何时交给人。",
            "成功不只看回答是否流暢，還要看來源能否追溯、規則是否遵守，以及系統是否知道何時交給人。",
            "Success is more than fluent answers: sources must be traceable, policy rules respected, and uncertain cases handed to a person.",
          ],
        ],
      },
      {
        title: [
          "从一次失败的原型，改到三条知识路径",
          "從一次失敗的原型，改成三條知識路徑",
          "Turn a failed prototype into three knowledge paths",
        ],
        body: [
          "第一版把所有材料塞进同一个知识库。相似课程表会互相干扰，跨条件问题甚至需要 2–5 分钟。问题不在模型够不够大，而在信息架构。新版将资料拆成 COMP 院系规则、全校通用要求与 SAO 学生服务三类；意图分类器先判断问题，再由确定性的路由进入对应知识库，减少上下文碰撞和无效检索。",
          "第一版把所有資料放進同一個知識庫。相似的課程表會互相干擾，跨條件問題甚至需要 2–5 分鐘。問題不在模型是否夠大，而在資訊架構。新版把資料拆成 COMP 學系規則、全校通用要求與 SAO 學生服務三類；意圖分類器先判斷問題，再由確定性的路由進入對應知識庫，減少語境碰撞與無效檢索。",
          "The first prototype put every document in one knowledge base. Similar study tables collided, and multi-condition questions could take two to five minutes. The problem was information architecture, not model size. I separated the content into COMP rules, university-wide requirements and SAO student services. An intent classifier identifies the request, then deterministic routing sends it to the right branch, reducing context collision and unnecessary retrieval.",
        ],
        points: [
          [
            "学生的院系、入学年份与角色随问题一同进入工作流，不必每次重新解释背景。",
            "學生的學系、入學年份與角色會隨問題一同進入工作流程，不必每次重新交代背景。",
            "Department, cohort and role travel with the question, so students do not have to repeat their context.",
          ],
          [
            "检索结合关键词、语义搜索与重排序：课程编号依赖精确匹配，概念性提问则需要理解近义表达。",
            "檢索結合關鍵字、語意搜尋與重新排序：科目編號依賴精確配對，概念性提問則需要理解近義表達。",
            "Retrieval combines keyword search, semantic search and reranking: course codes need exact matches, while conceptual questions need meaning-aware retrieval.",
          ],
        ],
      },
      {
        title: [
          "知识库不是上传文件，而是一条维护链路",
          "知識庫不是上載文件，而是一條維護鏈路",
          "A knowledge base is a maintenance workflow",
        ],
        body: [
          "政策来自网页，培养方案和课程表常藏在 PDF。直接切文本会破坏表格行列，让课程编号、学分与先修关系失去上下文。我设计了两项面向管理员的工具：网页采集平台负责批量或定点更新；PDF 转 Markdown 平台先保留标题与表格结构，再由人工复核后入库。不同入学年份的培养方案被拆成独立文件，避免相似表格被错误召回。",
          "政策來自網頁，培養方案與課程表經常藏在 PDF。直接切割文字會破壞表格行列，令科目編號、學分與先修關係失去語境。我設計了兩項面向管理人員的工具：網頁擷取平台負責批量或定點更新；PDF 轉 Markdown 平台先保留標題與表格結構，再由人手覆核後放入知識庫。不同入學年份的培養方案拆成獨立文件，避免相似表格被錯誤檢索。",
          "Policies live on web pages, while programme requirements and study patterns are often buried in PDFs. Plain text extraction breaks table structure and separates course codes, credits and prerequisites from their context. I designed two tools for administrators: a crawler for batch or targeted updates, and a PDF-to-Markdown workspace that preserves headings and tables before human review. Cohort-specific study patterns are stored separately to prevent similar tables from being retrieved for the wrong intake year.",
        ],
      },
      {
        title: [
          "界面把可信度做成可见的交互",
          "介面把可信度變成看得見的互動",
          "Make trust visible in the interface",
        ],
        body: [
          "学生从自然语言提问开始，回答附带来源与原文位置，便于立即核对。个人资料保存院系与入学年份，聊天记录跨会话保留。答案不完整或难以理解时，学生可在同一界面提交问题报告；系统保存上下文、通知工作人员，并把回复带回报告记录。信任不靠一句“由 AI 生成”的提示，而靠可追溯、可反馈、有人接手。",
          "學生由自然語言提問開始，回答附上來源與原文位置，方便立即核對。個人資料保存學系與入學年份，對話記錄可跨會話保留。答案不完整或難以理解時，學生可在同一介面提交問題報告；系統保存語境、通知工作人員，並把回覆帶回報告記錄。信任不靠一句「由 AI 生成」的提示，而靠可追溯、可回饋、有人接手。",
          "Students begin with a natural-language question. Each answer includes its source and location so it can be checked immediately. Profiles retain department and cohort, while conversation history persists across sessions. If an answer is incomplete or confusing, a student can report it in place; the system preserves the context, alerts staff and returns the reply to the report history. Trust comes from traceability, feedback and a visible human handoff—not a generic AI disclaimer.",
        ],
      },
      {
        title: [
          "有些问题应该停下来，而不是继续生成",
          "有些問題應該停下來，而不是繼續生成",
          "Some questions should stop generation",
        ],
        body: [
          "资料不足时，系统会追问入学年份或专业；检索不到可靠依据时，转向人工渠道。涉及心理困扰的表达不会进入普通知识检索，也不会尝试诊断，而是直接显示固定的校内辅导与紧急求助方式。这不是附加功能，而是产品边界：学术顾问可以降低找信息的成本，不能代替专业判断与危机支持。",
          "資料不足時，系統會追問入學年份或專業；找不到可靠依據時，轉向人工渠道。涉及情緒困擾的表達不會進入一般知識檢索，也不會嘗試診斷，而是直接顯示固定的校內輔導及緊急求助方式。這不是附加功能，而是產品邊界：學術顧問可以降低尋找資訊的成本，不能取代專業判斷與危機支援。",
          "When key information is missing, the system asks for a cohort or programme. When evidence is insufficient, it directs the student to a person. Distress-related language bypasses ordinary retrieval and never triggers diagnosis; it immediately presents fixed university counselling and emergency contacts. This is a product boundary, not an extra feature: the advisor can reduce information friction, but it cannot replace professional judgment or crisis support.",
        ],
      },
      {
        title: [
          "用技术结果与真实使用一起验证",
          "用技術結果與真實使用一同驗證",
          "Validate technical quality and lived experience",
        ],
        body: [
          "技术评测使用 30 道人工标注问题，覆盖简单查询、多条件判断、政策细节与安全边界。意图路由准确率为 93.3%，整体检索精度为 87%，简单问题正确率为 90%；复杂问题仍只有 67–80%，这类问题平均响应约 39.1 秒。26 位 COMP 本科生在校内面对面试用后，SUS 得分为 74.2。SUS 是一份包含 10 个问题、满分 100 的通用可用性量表，68 常被用作参考基准。85% 的参与者认为来源引用有助于核对答案，这是评价最高的一项。",
          "技術評測使用 30 道人工標註問題，涵蓋簡單查詢、多條件判斷、政策細節與安全邊界。意圖路由準確率為 93.3%，整體檢索精準度為 87%，簡單問題正確率為 90%；複雜問題仍只有 67–80%，這類問題平均回應約 39.1 秒。26 位 COMP 本科生在校內面對面試用後，SUS 得分為 74.2。SUS 是一份包含 10 道題、滿分 100 的通用可用性量表，68 常被視為參考基準。85% 的參與者認為來源引用有助核對答案，這是評分最高的一項。",
          "Technical evaluation used 30 human-annotated questions covering factual lookups, multi-condition reasoning, policy details and safety boundaries. Intent-routing accuracy reached 93.3%, overall retrieval precision 87%, and simple-query correctness 90%. Complex-query correctness remained at 67–80%; those questions averaged 39.1 seconds. After face-to-face sessions with 26 COMP undergraduates, the product scored 74.2 on SUS. SUS is a standard ten-question usability questionnaire scored out of 100; 68 is a commonly used benchmark. The strongest signal was trust: 85% said source citations helped them verify answers.",
        ],
        points: [
          [
            "结论不是“AI 已经代替顾问”，而是高频问题可以先被可靠分流，复杂问题仍需澄清、优化或人工处理。",
            "結論不是「AI 已經取代顧問」，而是高頻問題可以先被可靠分流，複雜問題仍需釐清、優化或由人處理。",
            "The result is not that AI replaces advisors. It can reliably triage common questions; complex cases still need clarification, iteration or human support.",
          ],
          [
            "下一步优先改善跨条件推理与响应速度，并把问题报告转化为持续更新知识库的产品闭环。",
            "下一步會優先改善跨條件推理與回應速度，並把問題報告轉化為持續更新知識庫的產品閉環。",
            "Next, I would prioritize multi-condition reasoning and latency, then use issue reports as a continuous knowledge-base improvement loop.",
          ],
        ],
      },
    ],
    note: [
      "数据口径：评测结果来自 30 道标注问题与 26 位本科生的面对面试用；SUS 是可用性指标，不代表回答准确率。课堂照片用于呈现项目所处的真实学习环境，不代表照片中每位学生都参与了本次评测。",
      "數據口徑：評測結果來自 30 道標註問題及 26 位本科生的面對面試用；SUS 是可用性指標，不代表回答準確率。課堂照片用於呈現項目所處的真實學習環境，不代表相中每位學生都參與了本次評測。",
      "Measurement note: results come from 30 annotated questions and face-to-face tests with 26 undergraduates. SUS measures usability, not answer accuracy. The classroom photo shows the project’s learning context; it does not imply that every student pictured joined the evaluation.",
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
        points: [
          [
            "真正稀缺的不是更多聊天记录，而是能保留版本、模块和玩家语气的可行动信号。产品团队需要看见“问题为什么重要”，而不只是某个词出现了多少次。",
            "真正稀缺的不是更多聊天記錄，而是能保留版本、模組及玩家語氣的可行動訊號。產品團隊需要看見「問題為何重要」，而不只是某個詞出現了多少次。",
            "The scarce resource was not more chat logs, but actionable signals that retained version, feature and player context. Product teams needed to understand why an issue mattered—not merely how often a word appeared.",
          ],
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
          "产品工作也发生在会议与展会之间",
          "產品工作亦發生在會議與展會之間",
          "Product work happens beyond the editor",
        ],
        body: [
          "线上协作让团队持续对齐采集范围、分类口径与交付节奏；轻松的线下相处，也让问题更容易被坦率地提出。到了 ChinaJoy，屏幕里的“玩家反馈”变成了真实的人、语气和现场期待。那段经历提醒我：理解用户不能只看整理好的数据，也要走进产品实际发生的环境。",
          "線上協作讓團隊持續對齊收集範圍、分類口徑與交付節奏；輕鬆的線下相處，也令問題更容易被坦率提出。到了 ChinaJoy，螢幕裏的「玩家回饋」變成真實的人、語氣與現場期待。那段經歷提醒我：理解用戶不能只看整理好的資料，亦要走進產品實際發生的環境。",
          "Remote collaboration kept the team aligned on collection scope, classification language and delivery rhythm. Informal time together made it easier to raise problems honestly. At ChinaJoy, “player feedback” became real people, expressions and expectations. The experience reminded me that understanding users requires more than reading cleaned data; product teams also need to enter the environment where the experience happens.",
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
  personal: ["关于我", "關於我", "about me"] as Text,
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
