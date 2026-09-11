export const locales = ['zh-cn', 'zh-hk', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];

export const projectSlugs = [
  'lambowell-resume-pipeline',
  'academic-compass',
  'gptutor-rag',
  'player-feedback',
  'wellness-recommendation',
  'llm-crawler-security',
] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

export const localeNames: Record<Locale, string> = {
  'zh-cn': '简中', 'zh-hk': '繁中', en: 'EN', ja: '日本語',
};

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const assetPath = (path: string) => `${basePath}${path}`;
export const localePath = (locale: Locale, suffix = '/') =>
  `/${locale}${suffix.startsWith('/') ? suffix : `/${suffix}`}`;

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
export const isProjectSlug = (value: string): value is ProjectSlug => projectSlugs.includes(value as ProjectSlug);

type UiCopy = {
  documentTitle: string; documentDescription: string; role: string; status: string; location: string;
  hero: string; intro: string; work: string; profile: string; resume: string; contact: string;
  selectedWork: string; workIntro: string; viewCase: string; evidence: string; experience: string;
  education: string; recognition: string; toolkit: string; present: string; available: string;
  resumeZh: string; resumeEn: string; contactTitle: string; contactBody: string; emailMe: string;
  back: string; overview: string; context: string; decisions: string; system: string; evaluation: string;
  impact: string; reflection: string; challenge: string; response: string; next: string; previous: string;
  evidenceNote: string; contents: string; workflow: string; guardrails: string; liveProduct: string; observed: string;
};

export const ui: Record<Locale, UiCopy> = {
  'zh-cn': {
    documentTitle: '张沁烨｜AI 产品经理作品集', documentDescription: '张沁烨的 AI 产品作品集：以用户为起点，把复杂技术组织成清晰、可信、可验证的产品体验。',
    role: '目标职位 · AI 产品经理', status: '求职中', location: '香港 · 可远程协作',
    hero: '把 AI 的能力，组织成用户可以理解与信任的产品。',
    intro: '我是张沁烨，一名兼具产品判断、AI 研发与前端实现能力的 AI 产品经理。我从真实用户困境出发，用原型与评估把不确定性变成可验证的产品决策。',
    work: '项目', profile: '关于我', resume: '简历', contact: '联系', selectedWork: '项目一览',
    workIntro: '六个案例，分别回答：如何定义问题、设计 AI 系统、验证效果，并为失败留出安全边界。',
    viewCase: '查看完整案例', evidence: '快速证据', experience: '经历', education: '教育', recognition: '认可', toolkit: '工具与工程',
    present: '至今', available: '正在寻找 AI 产品经理机会', resumeZh: '中文简历', resumeEn: 'English CV',
    contactTitle: '一起把复杂问题，做成清晰的产品。', contactBody: '欢迎交流 AI 产品、RAG、Agent、评估体系，或适合我的团队与机会。', emailMe: '发送邮件',
    back: '返回项目一览', overview: '摘要', context: '背景与用户', decisions: '关键决策', system: 'AI 系统', evaluation: '评估与边界', impact: '影响', reflection: '复盘',
    challenge: '用户问题', response: '产品回应', next: '下一个项目', previous: '上一个项目', contents: '本页导航',
    evidenceNote: '这些结果来自项目记录、简历或可访问的产品页面。没有统一基线的指标会明确标注为项目观察，而非模型性能结论。', workflow: '端到端流程', guardrails: '人工边界与安全设计', liveProduct: '查看运行中的产品', observed: '页面观察',
  },
  'zh-hk': {
    documentTitle: '張沁燁｜AI 產品經理作品集', documentDescription: '張沁燁的 AI 產品作品集：以用戶為起點，把複雜技術組織成清晰、可信、可驗證的產品體驗。',
    role: '目標職位 · AI 產品經理', status: '求職中', location: '香港 · 可遙距協作',
    hero: '把 AI 的能力，組織成用戶可以理解與信任的產品。',
    intro: '我是張沁燁，一名兼具產品判斷、AI 研發與前端實作能力的 AI 產品經理。我從真實用戶困境出發，用原型與評估把不確定性轉化為可驗證的產品決策。',
    work: '項目', profile: '關於我', resume: '履歷', contact: '聯絡', selectedWork: '項目一覽',
    workIntro: '六個案例，分別回答：如何定義問題、設計 AI 系統、驗證效果，並為失敗留下安全邊界。',
    viewCase: '查看完整案例', evidence: '快速證據', experience: '經歷', education: '教育', recognition: '認可', toolkit: '工具與工程',
    present: '至今', available: '正在尋找 AI 產品經理機會', resumeZh: '中文履歷', resumeEn: 'English CV',
    contactTitle: '一起把複雜問題，做成清晰的產品。', contactBody: '歡迎交流 AI 產品、RAG、Agent、評估體系，或適合我的團隊與機會。', emailMe: '發送電郵',
    back: '返回項目一覽', overview: '摘要', context: '背景與用戶', decisions: '關鍵決策', system: 'AI 系統', evaluation: '評估與邊界', impact: '影響', reflection: '復盤',
    challenge: '用戶問題', response: '產品回應', next: '下一個項目', previous: '上一個項目', contents: '本頁導覽',
    evidenceNote: '結果來自項目記錄、履歷或可存取的產品頁面；沒有統一基線的數字會明確標示為項目觀察，而非模型性能結論。', workflow: '端到端流程', guardrails: '人工邊界與安全設計', liveProduct: '查看運行中的產品', observed: '頁面觀察',
  },
  en: {
    documentTitle: 'Qinye Zhang | AI Product Manager', documentDescription: 'AI product work by Qinye Zhang—turning complex technology into clear, trustworthy and measurable product experiences.',
    role: 'Target role · AI Product Manager', status: 'Open to opportunities', location: 'Hong Kong · Remote-friendly',
    hero: 'I turn AI capability into products people can understand and trust.',
    intro: 'I’m Qinye Zhang, an AI product manager who combines product judgement, applied AI research and front-end delivery. I start with real user friction, then use prototypes and evaluation to turn uncertainty into testable product decisions.',
    work: 'Work', profile: 'Profile', resume: 'Résumé', contact: 'Contact', selectedWork: 'Selected work',
    workIntro: 'Six cases showing how I frame problems, design AI systems, evaluate outcomes and leave room for safe failure.',
    viewCase: 'Read full case', evidence: 'Evidence at a glance', experience: 'Experience', education: 'Education', recognition: 'Recognition', toolkit: 'Tools & engineering',
    present: 'Present', available: 'Open to AI Product Manager roles', resumeZh: '中文简历', resumeEn: 'English CV',
    contactTitle: 'Let’s turn a complex problem into a clear product.', contactBody: 'I’d love to discuss AI products, RAG, agents, evaluation—or a team where this mix is useful.', emailMe: 'Email me',
    back: 'Back to all work', overview: 'Overview', context: 'Context & users', decisions: 'Key decisions', system: 'AI system', evaluation: 'Evaluation & guardrails', impact: 'Impact', reflection: 'Reflection',
    challenge: 'User problem', response: 'Product response', next: 'Next case', previous: 'Previous case', contents: 'On this page',
    evidenceNote: 'Results come from project records, the résumé or accessible product pages. Metrics without a common baseline are labelled as project observations, not universal model-performance claims.', workflow: 'End-to-end workflow', guardrails: 'Human control & safety', liveProduct: 'View live product', observed: 'Page observation',
  },
  ja: {
    documentTitle: '張沁燁｜AIプロダクトマネージャー', documentDescription: '張沁燁のAIプロダクトポートフォリオ。複雑な技術を、明快で信頼でき、検証可能な体験へ。',
    role: '希望職種 · AIプロダクトマネージャー', status: '求職中', location: '香港 · リモート対応可',
    hero: 'AIの能力を、人が理解し信頼できるプロダクトへ。',
    intro: '張沁燁です。プロダクト判断、応用AI研究、フロントエンド実装を横断するAIプロダクトマネージャーです。実際のユーザー課題から始め、プロトタイプと評価で不確実性を検証可能な意思決定へ変えます。',
    work: 'プロジェクト', profile: 'プロフィール', resume: '履歴書', contact: '連絡先', selectedWork: 'プロジェクト一覧',
    workIntro: '課題定義、AIシステム設計、成果検証、失敗時の安全設計を示す6つのケースです。',
    viewCase: 'ケースを読む', evidence: '実績', experience: '経験', education: '学歴', recognition: '受賞・活動', toolkit: '技術とツール',
    present: '現在', available: 'AIプロダクトマネージャー職を探しています', resumeZh: '中国語履歴書', resumeEn: 'English CV',
    contactTitle: '複雑な課題を、明快なプロダクトへ。', contactBody: 'AIプロダクト、RAG、Agent、評価設計、または採用機会についてお気軽にご連絡ください。', emailMe: 'メールを送る',
    back: '一覧へ戻る', overview: '概要', context: '背景とユーザー', decisions: '重要な判断', system: 'AIシステム', evaluation: '評価とガードレール', impact: '成果', reflection: '振り返り',
    challenge: 'ユーザー課題', response: 'プロダクトの回答', next: '次のケース', previous: '前のケース', contents: 'ページ内ナビ',
    evidenceNote: '結果はプロジェクト記録、履歴書、または閲覧可能な製品ページに基づきます。共通ベースラインのない数値はモデル性能ではなく、プロジェクト内の観察として示します。', workflow: 'エンドツーエンドの流れ', guardrails: '人の判断と安全設計', liveProduct: '稼働中の製品を見る', observed: 'ページ確認時点',
  },
};

export type Project = {
  slug: ProjectSlug; no: string; year: string; image: string; role: string; status: string; tools: string[];
  title: string; series: string; summary: string; metric: string; metricLabel: string;
  problem: string; solution: string; impact: string; context: string; decisions: string[];
  system: string; evaluation: string; reflection: string;
  featured?: boolean; liveUrl?: string; workflow?: string[]; guardrails?: string[];
  evidenceItems?: { value: string; label: string }[];
};

const shared: Record<ProjectSlug, Pick<Project, 'slug'|'no'|'year'|'image'|'role'|'status'|'tools'>> = {
  'lambowell-resume-pipeline': { slug:'lambowell-resume-pipeline', no:'01', year:'2026', image:'/projects/lambowell-resume-pipeline.webp', role:'AI product design & pipeline delivery', status:'Live production system', tools:['Agent workflow','Laravel','MySQL','LLM evaluation','Feishu'] },
  'academic-compass': { slug:'academic-compass', no:'02', year:'2025—26', image:'/projects/academic-compass.webp', role:'Independent product & build', status:'Prototype · Evaluated', tools:['Dify','RAG','Multi-agent','Python'] },
  'gptutor-rag': { slug:'gptutor-rag', no:'03', year:'2024—26', image:'/projects/gptutor-rag.webp', role:'Core R&D', status:'Piloted in courses', tools:['RAG','Information architecture','Evaluation'] },
  'player-feedback': { slug:'player-feedback', no:'04', year:'2025', image:'/projects/player-feedback.webp', role:'Full-stack game tech', status:'ChinaJoy demo', tools:['OneBot','TypeScript','Node.js','NLP'] },
  'wellness-recommendation': { slug:'wellness-recommendation', no:'05', year:'2024', image:'/projects/wellness-recommendation.webp', role:'AI prompt & front-end', status:'Commercial pilot', tools:['Prompt pipeline','Dataset','Web UX'] },
  'llm-crawler-security': { slug:'llm-crawler-security', no:'06', year:'2025', image:'/projects/llm-crawler-security.webp', role:'NTU undergraduate researcher', status:'Research prototype', tools:['Threat modeling','LLM crawlers','Multi-agent','Evaluation'] },
};

type LocalProject = Omit<Project, keyof (typeof shared)[ProjectSlug]>;
const p = (slug: ProjectSlug, copy: LocalProject): Project => ({ ...shared[slug], ...copy });

const zhCn: Project[] = [
  p('lambowell-resume-pipeline',{title:'朗伯威 AI 简历筛选 Pipeline',series:'Evidence Before Judgement',summary:'把多渠道简历实时汇入同一条证据链，让 AI 完成初筛，让负责人保留最终决定。',metric:'376',metricLabel:'截至 2026.09 · 已完成初筛',problem:'小红书、Boss 直聘等渠道持续产生简历。HR 依靠学历与关键词粗筛，很难判断 C++、硬件等专业经历的含金量；信息分散、重复投递和缺少技术预判，又把风险推迟到技术面。',solution:'设计并落地从获取、解析到 Agent 初筛的实时管线。系统按姓名与电话归并版本，依据岗位画像检查硬性条件，再用简历字段与项目经历给出证据、置信度、风险和推荐动作。',impact:'生产页面在 2026 年 9 月观察到 376 份简历完成初筛，失败为 0。当前证据证明管线已稳定运行；技术面通过率与招聘周期仍需持续建立对照基线。',context:'核心用户是负责招聘决策的周总。她真正需要回答的是“谁值得看、是否进入下一轮、哪一环出了问题”。因此产品不要求她配置复杂模型，也不把 AI 分数包装成最终裁决。',decisions:['先解决实时归集与重复版本，再谈智能评分','每个判断都返回来源字段、证据和置信度','红线与高风险只改变队列和提示，关键决策仍由人完成'],system:'渠道简历进入统一资源层，系统完成去重、解析和质量检查；Agent 加载岗位画像，对学历、经验、技能、地点等条件逐项匹配，并交叉验证技能与项目经历。结果写回筛选与验证记录，后台保留获取、解析和初筛三段日志。',evaluation:'当前运行页提供处理总量、完成量与失败量，可逐条查看获取、解析、初筛进度。下一阶段应把 AI 推荐与技术面结果关联，重点跟踪漏掉合格候选人的比例、人工复核成本、从投递到技术面的时间，以及不同岗位与群体间的一致性。',reflection:'招聘 AI 的价值不在于更快淘汰，而在于更早整理证据、暴露不确定性，并把有限的人类注意力放在最需要判断的候选人上。',featured:true,liveUrl:'https://admin.viamentor.cn/lambowell/resume-processing',workflow:['多渠道实时进入','候选人与版本归并','简历解析与质量检查','岗位硬性条件匹配','技能与项目交叉验证','风险提示与人工决策'],guardrails:['沟通能力等无法由简历可靠确认的维度标为低置信度','高风险候选人进入人工复核，不由 Agent 自动做最终淘汰','结果保留原始字段、解析版本与运行日志，支持追溯和重跑'],evidenceItems:[{value:'376',label:'已初筛简历'},{value:'3 段',label:'获取／解析／初筛日志'},{value:'0',label:'页面观察时失败数'}]}),
  p('academic-compass',{title:'Agent 驱动的学术顾问',series:'Academic Compass',summary:'为复杂学业规则设计一位会澄清、懂边界的 AI 顾问。',metric:'85–90%',metricLabel:'检索精度与简单问题正确率',problem:'老师人均负责 80–120 名学生；规则散落在课程、校级要求与学生事务文件里，旧 chatbot 又难以理解自然语言。',solution:'用多代理工作流拆分知识域，建立 PDF／网页知识管线；对模糊问题先澄清，对心理健康等高风险场景明确转介。',impact:'检索精度与简单问题正确率约 85–90%，SUS 74.2；在 30 个真实问题上优于旧 chatbot。',context:'学生的问题往往跨越院系规定、通识要求和个人处境。这里的核心不是“多做一个聊天框”，而是减少错误自信和来回查找。',decisions:['按责任边界而非文件格式拆分知识库','把澄清作为主流程，而不是失败补丁','为高风险问题设置拒答、解释与人工转介'],system:'用户问题先经过意图与风险判断，再由协调 Agent 路由至院系规则、校级要求或学生事务知识库；回答附依据，并在证据不足时主动澄清。',evaluation:'用 30 个真实问题做对照测试，并记录检索命中、简单问题正确率与 SUS。下一步应公开题集构成、评分者与置信区间。',reflection:'准确率只是底线。学业建议真正需要的是可追溯、会承认不知道，并知道何时把决定交还给人。'}),
  p('gptutor-rag',{title:'GPTutor RAG 模块优化',series:'Knowledge, Reconstructed',summary:'让大模型理解整门课程，而不是只捡起一段上下文。',metric:'+60%',metricLabel:'考试周平台访问量',problem:'百页讲义包含表格、公式与跨章节关联；普通分块会切断课程结构，也可能让模型引入课外知识。',solution:'提出“分层分块＋元数据增强”，把章节层级写入检索单元，并用跨章节题集持续检验准确性与连贯性。',impact:'完成 50 个跨章节问答测试；约 70–80% 受访学生认为准确性与连贯性提升，考试周访问量增加约 60%。',context:'学生问的不是某一页写了什么，而是多个章节之间为何相关。产品目标因此从“找到相似段落”转向“重建课程结构”。',decisions:['保留标题层级与跨节关系','建立课程内回答边界，减少课外幻觉','同时追踪回答质量与真实使用信号'],system:'讲义解析后按章节语义分层分块，元数据随向量进入检索；重排后的证据交给生成模型，并限制在课程资料范围内回答。',evaluation:'50 个跨章节问题用于前后对比；学生感知与访问量是采纳信号，不等同于模型准确率。下一步需加入盲评与逐题错误分类。',reflection:'RAG 的瓶颈常常不是模型，而是信息架构。让内容保留自身结构，比增加更多提示词更有价值。'}),
  p('player-feedback',{title:'实时玩家反馈智能台',series:'Signal From Noise',summary:'不必 @ 机器人，让真正的产品信号自己浮出水面。',metric:'500',metricLabel:'ChinaJoy 日均交互',problem:'反馈散落在客服、社媒与群聊中，收集慢、口径不一；团队难以判断哪些抱怨值得进入产品迭代。',solution:'构建 QQ／Discord 机器人与可视化后台，用轻量 NLP 和规则过滤噪声，再按版本、模块与情绪聚合。',impact:'完成企业试点并在 ChinaJoy 2025 展示，展会期间日均约 500 次交互。',context:'关键用户不只是在群里说话的玩家，也包括需要快速理解趋势的运营与研发。系统要减少阅读负担，而非制造新的消息流。',decisions:['被动采集公开反馈，降低表达成本','让规则和轻量模型共同过滤噪声','保留原文与来源，避免摘要掩盖语境'],system:'OneBot 接入消息后完成去重、规则筛选与主题分析；聚合结果进入 TypeScript／Node.js 后台，运营可回到原始对话核验。',evaluation:'以演示交互和企业反馈验证可用性。下一步需要补充主题准确率、误报率、隐私同意与数据留存策略。',reflection:'“自动总结”不是终点。产品价值在于把信号和证据一起送到能采取行动的人面前。'}),
  p('wellness-recommendation',{title:'精油推荐体验',series:'From Symptom to Choice',summary:'缩短用户从“我不舒服”到“我知道选什么”的距离。',metric:'+10%',metricLabel:'项目观察 · 产品销量',problem:'商品页只展示成分，缺少适用场景与用法指引；用户以症状表达需求，网站却以商品分类组织信息。',solution:'从社群与论坛整理“需求—精油”数据，参与提示管线，并把推荐对话与商品页连起来。',impact:'覆盖约 70% 的常见推荐需求并自动关联商品；项目记录显示访问与销量提升，销量约增加 10%。',context:'用户带着不确定和身体感受而来。推荐既要缩短选择路径，也不能把生活方式建议包装成医疗结论。',decisions:['以用户语言组织需求，而非复述商品目录','推荐结果直接连接商品与用法','对健康表述设置非医疗声明和人工核验'],system:'需求被归一到结构化场景，提示管线结合数据集生成候选建议，再返回商品映射、用法说明与安全提示。',evaluation:'覆盖率和商业指标来自项目观察，尚缺统一实验基线。下一步应加入敏感人群禁忌、来源标注、隐私策略与 A/B 测试。',reflection:'转化率不能单独定义成功。健康相关产品必须同时衡量用户理解、建议安全与商业效果。'}),
  p('llm-crawler-security',{title:'LLM 爬虫威胁研究',series:'Adversarial Extraction',summary:'把“模型会不会被网页欺骗”变成可以度量的问题。',metric:'20',metricLabel:'轮对比实验',problem:'LLM 驱动的爬虫会在动态网页上解释视觉与代码，但对抗性图片提取风险尚缺清晰分类和专用评测。',solution:'构建 3 类攻击场景、2 种防御策略，对比 LLM-to-Script 与 LLM-Native 两类爬虫，并用多代理协作执行实验。',impact:'以精确率与召回率完成 20 轮对比，验证对抗性图像提取威胁并比较防御效果。',context:'研究对象不是抽象模型，而是会访问网页、选择元素并提取素材的产品系统。威胁需要落到用户数据和内容完整性上。',decisions:['先建立攻击分类，再比较实现路径','用精确率与召回率同时观察漏检和误检','把防御作为产品层决策，而非事后过滤'],system:'测试站点注入对抗性视觉与结构信号；两类 crawler 在多代理流程中执行抽取，评估器记录目标图片与错误结果。',evaluation:'20 轮实验覆盖三类攻击和两种防御。下一步需要扩大站点类型、公开题集，并验证人工复核成本。',reflection:'工程安全是 AI 产品体验的一部分。模型能完成任务，不代表系统值得被部署。'}),
];

const en: Project[] = [
  p('lambowell-resume-pipeline',{title:'Lambowell AI Résumé Screening Pipeline',series:'Evidence Before Judgement',summary:'A live multi-channel pipeline that lets agents prepare the evidence while the hiring lead keeps the decision.',metric:'376',metricLabel:'résumés screened · observed Sep 2026',problem:'Résumés arrive continuously from Xiaohongshu, Boss Zhipin and other channels. Keyword screening cannot judge the depth of C++ or hardware experience, while fragmented sources and repeat applications push uncertainty into technical interviews.',solution:'I designed and delivered a live flow from ingestion and parsing to agent screening. It merges candidate versions, checks role-specific requirements, and returns field-level evidence, confidence, risks and a recommended action.',impact:'The production page showed 376 résumés screened and zero failures when observed in September 2026. This confirms operational use; technical-interview conversion and time-to-interview still need a controlled baseline.',context:'The primary user is the hiring owner. She needs to know who deserves attention, whether someone should advance, and where the funnel is breaking. The product therefore reduces configuration and never presents an AI score as the final hiring decision.',decisions:['Fix live ingestion and duplicate versions before optimising scores','Tie every judgement to a source field, evidence and confidence','Route redlines and high risk to human review instead of final automatic rejection'],system:'Incoming résumés enter a shared resource layer for deduplication, parsing and quality checks. The agent loads a role profile, evaluates requirements such as education, experience, skills and location, then cross-checks claimed skills against project evidence. Screening and consistency records persist alongside fetch, parse and screening logs.',evaluation:'The live page exposes total, completed and failed processing plus per-record fetch, parse and screening status. Next, AI recommendations should be joined to technical-interview outcomes to measure qualified-candidate misses, review effort, application-to-interview time and consistency across roles and candidate groups.',reflection:'The product should not optimise for faster rejection. It should organise evidence sooner, expose uncertainty and focus human attention where judgement matters.',featured:true,liveUrl:'https://admin.viamentor.cn/lambowell/resume-processing',workflow:['Live multi-channel intake','Candidate and version merge','Parsing and quality checks','Role requirement matching','Skill-to-project cross-check','Risk flags and human decision'],guardrails:['Low-confidence labels for dimensions a résumé cannot reliably prove','High-risk cases enter review instead of receiving a final agent rejection','Source fields, parser versions and run logs remain traceable and rerunnable'],evidenceItems:[{value:'376',label:'résumés screened'},{value:'3 stages',label:'fetch / parse / screen logs'},{value:'0',label:'failures when observed'}]}),
  p('academic-compass',{title:'Agent-driven Academic Advisor',series:'Academic Compass',summary:'An AI advisor that clarifies ambiguity and knows where its authority ends.',metric:'85–90%',metricLabel:'retrieval precision & simple-answer accuracy',problem:'Each advisor supports roughly 80–120 students while rules are fragmented across programme, university and student-affairs documents. The previous chatbot struggled with natural language.',solution:'I separated knowledge by responsibility, built PDF and web ingestion, and made clarification, refusal and human escalation part of the core flow.',impact:'Project tests reached roughly 85–90% retrieval precision and simple-answer accuracy, with a SUS score of 74.2; 30 real questions outperformed the previous chatbot.',context:'Student questions cross policy boundaries and personal circumstances. The job was not to add another chat box, but to reduce false confidence and search effort.',decisions:['Split knowledge by responsibility, not file type','Treat clarification as a primary flow','Escalate high-risk questions with a reason and a next step'],system:'Intent and risk checks route each question to programme, university or student-affairs knowledge. Answers include evidence; low-evidence cases trigger clarification.',evaluation:'Thirty real questions supported comparison, alongside retrieval, simple-answer accuracy and SUS. The next iteration should publish the dataset mix, raters and confidence intervals.',reflection:'Accuracy is only the floor. Advice must be traceable, admit uncertainty and return consequential decisions to people.'}),
  p('gptutor-rag',{title:'GPTutor RAG Optimisation',series:'Knowledge, Reconstructed',summary:'Helping a model understand a whole course—not retrieve one nearby paragraph.',metric:'+60%',metricLabel:'exam-period platform visits',problem:'Long lecture notes contain tables, formulas and cross-chapter relationships. Naive chunks destroy structure and can invite out-of-course answers.',solution:'I proposed hierarchical chunking with enriched metadata, preserving the course outline inside retrieval units and testing it with cross-chapter questions.',impact:'We completed 50 cross-chapter tests; about 70–80% of surveyed students perceived better accuracy and coherence, while exam-period visits rose about 60%.',context:'Students ask why concepts across chapters relate. The product goal therefore shifted from “find similar text” to “reconstruct the course structure.”',decisions:['Preserve headings and cross-section relationships','Constrain answers to course material','Track both answer quality and adoption signals'],system:'Lecture notes are parsed into hierarchical semantic chunks. Structure travels with embeddings, evidence is reranked, and generation stays within course material.',evaluation:'Fifty questions supported before/after comparison. Perception and traffic indicate adoption, not model accuracy; blind review and error taxonomy are the next steps.',reflection:'RAG failures are often information-architecture failures. Preserving a source’s structure can matter more than adding another prompt.'}),
  p('player-feedback',{title:'Live Player Feedback Console',series:'Signal From Noise',summary:'Useful product signals surface without asking players to tag a bot.',metric:'500',metricLabel:'daily ChinaJoy interactions',problem:'Feedback is scattered across support, social channels and chat groups. Slow, inconsistent collection makes it hard to decide which complaints deserve product action.',solution:'I built QQ and Discord bots plus a dashboard, combining lightweight NLP and rules to filter noise and group issues by release, module and sentiment.',impact:'The product entered company pilots and was demonstrated at ChinaJoy 2025, reaching about 500 interactions per day during the event.',context:'Users include both players speaking naturally and teams who need to understand trends quickly. The system should reduce reading—not create another inbox.',decisions:['Capture natural feedback with minimal user effort','Combine transparent rules with lightweight NLP','Keep source messages available for verification'],system:'OneBot ingests messages for deduplication, rules and topic analysis. A TypeScript/Node.js service aggregates results while preserving links to the original context.',evaluation:'Demo interaction and company feedback validated usability. Next: topic accuracy, false-positive rate, consent and retention policies.',reflection:'Automatic summary is not the outcome. The value is delivering signal and evidence together to someone able to act.'}),
  p('wellness-recommendation',{title:'Essential-oil Recommendation',series:'From Symptom to Choice',summary:'Shortening the distance between “I feel unwell” and “I know what to choose.”',metric:'+10%',metricLabel:'project-observed product sales',problem:'Product pages list ingredients but not situations or usage. People describe needs as symptoms while the site organises information as a catalogue.',solution:'I helped build a need-to-oil dataset from communities, contributed to the prompt pipeline and connected recommendations to product pages.',impact:'The experience covered about 70% of common recommendation requests and linked products automatically; project records observed an approximately 10% sales increase.',context:'People arrive with uncertainty and bodily concerns. Guidance must simplify choice without presenting lifestyle recommendations as medical conclusions.',decisions:['Organise around user language, not catalogue terms','Connect each recommendation to product and usage','Add non-medical framing and human review'],system:'Needs are normalised into structured scenarios. A prompt pipeline combines the dataset with candidate guidance, product mapping, usage and safety notes.',evaluation:'Coverage and commercial results are project observations without a shared experimental baseline. Next: contraindications, sources, privacy policy and A/B testing.',reflection:'Conversion cannot define success alone. Health-adjacent products must balance comprehension, safety and commercial value.'}),
  p('llm-crawler-security',{title:'LLM Crawler Threat Research',series:'Adversarial Extraction',summary:'Turning “can a webpage mislead an AI crawler?” into a measurable question.',metric:'20',metricLabel:'comparative experiment rounds',problem:'LLM crawlers interpret visual and structural cues on dynamic pages, but adversarial image-extraction risk lacked a clear taxonomy and dedicated evaluation.',solution:'I built three attack scenarios and two defences, comparing LLM-to-Script and LLM-Native crawlers in a multi-agent experimental flow.',impact:'Twenty rounds measured precision and recall, validating adversarial extraction threats and comparing defensive approaches.',context:'The subject is not an abstract model; it is a product system that visits pages, chooses elements and extracts assets. Risk lands on user data and content integrity.',decisions:['Define attack classes before comparing implementations','Use precision and recall to expose both misses and false positives','Treat defence as a product decision, not a post-process patch'],system:'Test pages inject adversarial visual and structural signals. Two crawler types extract in a multi-agent flow while evaluators record target and incorrect images.',evaluation:'Twenty rounds cover three attacks and two defences. More site types, a public dataset and human-review cost remain future work.',reflection:'Engineering safety is part of AI product experience. Task completion alone does not make a system deployable.'}),
];

// Traditional Chinese keeps Hong Kong terminology; Japanese copy is intentionally concise but complete.
const zhHk = zhCn.map((item) => ({...item,
  title:item.title.replaceAll('顾问','顧問').replaceAll('优化','優化').replaceAll('实时','實時').replaceAll('智能台','智能台').replaceAll('推荐','推薦').replaceAll('威胁','威脅').replaceAll('简历','履歷').replaceAll('筛选','篩選'),
  summary:item.summary.replaceAll('用户','用戶').replaceAll('设计','設計').replaceAll('模型','模型').replaceAll('选择','選擇').replaceAll('问题','問題'),
  problem:item.problem.replaceAll('用户','用戶').replaceAll('规则','規則').replaceAll('问题','問題').replaceAll('难','難').replaceAll('选择','選擇').replaceAll('网页','網頁'),
  solution:item.solution.replaceAll('用户','用戶').replaceAll('设计','設計').replaceAll('数据','數據').replaceAll('网页','網頁').replaceAll('推荐','推薦').replaceAll('评估','評估'),
  impact:item.impact.replaceAll('问题','問題').replaceAll('学生','學生').replaceAll('准确','準確').replaceAll('访问','訪問').replaceAll('完成','完成'),
  context:item.context.replaceAll('学生','學生').replaceAll('用户','用戶').replaceAll('问题','問題').replaceAll('选择','選擇').replaceAll('系统','系統'),
  decisions:item.decisions.map(x=>x.replaceAll('用户','用戶').replaceAll('问题','問題').replaceAll('数据','數據').replaceAll('选择','選擇').replaceAll('评估','評估')),
  system:item.system.replaceAll('系统','系統').replaceAll('用户','用戶').replaceAll('问题','問題').replaceAll('数据','數據').replaceAll('评估','評估'),
  evaluation:item.evaluation.replaceAll('问题','問題').replaceAll('数据','數據').replaceAll('评估','評估').replaceAll('学生','學生'),
  reflection:item.reflection.replaceAll('产品','產品').replaceAll('系统','系統').replaceAll('用户','用戶').replaceAll('问题','問題'),
  workflow:item.workflow?.map(x=>x.replaceAll('渠道','渠道').replaceAll('进入','進入').replaceAll('候选人','候選人').replaceAll('简历','履歷').replaceAll('质量','品質').replaceAll('岗位','職位').replaceAll('条件','條件').replaceAll('技能','技能').replaceAll('验证','驗證').replaceAll('风险','風險').replaceAll('决策','決策')),
  guardrails:item.guardrails?.map(x=>x.replaceAll('能力','能力').replaceAll('简历','履歷').replaceAll('确认','確認').replaceAll('维度','維度').replaceAll('置信度','置信度').replaceAll('候选人','候選人').replaceAll('人工','人工').replaceAll('结果','結果').replaceAll('筛选','篩選').replaceAll('运行','運行').replaceAll('支持','支援')),
  evidenceItems:item.evidenceItems?.map(x=>({...x,label:x.label.replaceAll('简历','履歷').replaceAll('筛选','篩選').replaceAll('获取','擷取').replaceAll('解析','解析').replaceAll('日志','日誌').replaceAll('观察','觀察').replaceAll('失败','失敗')})),
}));

const ja: Project[] = en.map((item, index) => {
  const titles = ['Lambowell AI履歴書スクリーニング','Agent型アカデミックアドバイザー','GPTutor RAG最適化','リアルタイム・プレイヤーフィードバック','エッセンシャルオイル推薦体験','LLMクローラー脅威研究'];
  const summaries = ['複数チャネルの履歴書をリアルタイムで集約し、Agentが根拠を整理し、人が最終判断を担う。','曖昧さを確認し、責任の境界を理解するAIアドバイザー。','一節ではなく、コース全体の構造を理解させる。','自然な会話から、行動可能なプロダクトシグナルを抽出する。','「不調」から「選べる」までの距離を短くする。','ウェブページがAIクローラーを欺くリスクを測定可能にする。'];
  const problems = ['小紅書、Boss直聘などから履歴書が継続的に届く。キーワード中心の選考ではC++やハードウェア経験の深さを判断しにくく、重複応募と分散した情報が技術面接の負担を増やしていた。','規則は複数の文書に分散し、担当者は多数の学生を支援している。従来のチャットボットは自然言語と曖昧な状況に弱かった。','長い講義資料には表、数式、章をまたぐ関係があり、単純な分割では構造が失われる。','フィードバックがサポート、SNS、チャットに散在し、製品判断まで時間がかかる。','ユーザーは症状で相談する一方、サイトは商品分類で情報を提示していた。','LLMクローラーの敵対的な画像抽出リスクには、分類と専用評価が不足していた。'];
  const solutions = ['取得、解析、Agent初期選考までの実運用パイプラインを設計した。候補者の複数バージョンを統合し、職種別の必須条件を確認し、根拠、確信度、リスク、推奨アクションを返す。','責任領域別のマルチAgent、文書取り込み、確認質問、拒否と有人エスカレーションを設計した。','階層的チャンクとメタデータで章構造を保持し、章横断の質問で継続評価した。','QQ／Discord botとダッシュボードを構築し、ルールと軽量NLPで版・機能・感情別に集約した。','ニーズと精油を結ぶデータを整備し、推薦会話を商品ページと使用方法へ接続した。','3種類の攻撃、2種類の防御、2つのクローラー方式をマルチAgent環境で比較した。'];
  const impacts = ['2026年9月の確認時点で、実運用ページは376件の初期選考完了と失敗0件を表示した。運用実績は確認できたが、技術面接通過率と選考期間には比較基準が必要である。','約85–90%の検索精度・単純回答精度、SUS 74.2。30件の実質問で旧システムを上回った。','50件の章横断テストを実施。70–80%の回答者が改善を感じ、試験期の訪問は約60%増加した。','企業パイロットとChinaJoy 2025で検証し、会期中は1日約500インタラクションを記録した。','一般的な推薦依頼の約70%をカバーし、プロジェクト記録では売上が約10%増加した。','精度と再現率を用いた20ラウンドで脅威と防御効果を比較した。'];
  return {...item,title:titles[index],summary:summaries[index],problem:problems[index],solution:solutions[index],impact:impacts[index],metricLabel:index===0?'2026年9月確認 · 初期選考完了':item.metricLabel,context:index===0?'主なユーザーは採用責任者である。知りたいのは、誰を見るべきか、次へ進めるか、採用ファネルのどこに問題があるか。複雑なモデル設定を求めず、AIスコアを最終判断として扱わない。':problems[index]+' 技術だけでなく、ユーザーの判断と安全への影響をプロダクト課題として扱った。',decisions:index===0?['リアルタイム取得と重複バージョンの整理を先に解決する','すべての判断を元フィールド、根拠、確信度に結びつける','高リスク候補者は人の確認へ送り、Agentに最終淘汰させない']:['ユーザーの負担とリスクから問題を定義する','AIの出力を検証可能な証拠と結ぶ','不確実な場合のフォールバックを設計する'],system:index===0?'履歴書を共通リソース層に取り込み、重複処理、解析、品質確認を行う。Agentは職種プロフィールを読み込み、学歴、経験、スキル、勤務地を照合し、スキルとプロジェクト経験を交差検証する。取得、解析、初期選考のログを保持する。':solutions[index]+' 入力、判断、検索／処理、回答、検証の流れを一つのシステムとして設計した。',evaluation:index===0?'実運用ページでは総数、完了数、失敗数と各処理段階を確認できる。次はAI推奨と技術面接結果を結び、適格者の見逃し、確認コスト、面接までの時間、職種や候補者群間の一貫性を測る。':impacts[index]+' 次段階ではデータセット、採点方法、誤り分類をさらに公開する必要がある。',reflection:index===0?'採用AIの価値は、より速く落とすことではない。根拠を早く整理し、不確実性を示し、人の注意を判断が必要な候補者へ向けることにある。':'AIの能力ではなく、ユーザーがより良い判断をできるかを成功基準にする。',workflow:index===0?['複数チャネルからリアルタイム取得','候補者とバージョンの統合','解析と品質確認','職種別必須条件の照合','スキルと案件経験の交差検証','リスク提示と人の判断']:item.workflow,guardrails:index===0?['履歴書で確かめにくい評価には低い確信度を表示','高リスク候補者は人の確認へ送り、最終淘汰を自動化しない','元フィールド、解析版、実行ログを追跡・再実行可能にする']:item.guardrails,evidenceItems:index===0?[{value:'376',label:'初期選考完了'},{value:'3段階',label:'取得・解析・選考ログ'},{value:'0',label:'確認時点の失敗'}]:item.evidenceItems};
});

const allProjects: Record<Locale, Project[]> = {'zh-cn':zhCn,'zh-hk':zhHk,en,ja};
const localMeta: Record<Locale, {roles:string[];statuses:string[]}> = {
  'zh-cn':{roles:['AI 产品设计与 Pipeline 落地','独立产品设计与开发','核心研发','全栈游戏技术','AI 提示与前端','南洋理工本科研究员'],statuses:['生产系统 · 运行中','原型 · 已评估','课程试点','ChinaJoy 展示','商业试点','研究原型']},
  'zh-hk':{roles:['AI 產品設計與 Pipeline 落地','獨立產品設計與開發','核心研發','全端遊戲技術','AI 提示與前端','南洋理工本科研究員'],statuses:['生產系統 · 運行中','原型 · 已評估','課程試點','ChinaJoy 展示','商業試點','研究原型']},
  en:{roles:['AI product design & pipeline delivery','Independent product & build','Core R&D','Full-stack game tech','AI prompt & front-end','NTU undergraduate researcher'],statuses:['Production · Live','Prototype · Evaluated','Piloted in courses','ChinaJoy demo','Commercial pilot','Research prototype']},
  ja:{roles:['AIプロダクト設計・パイプライン実装','個人プロダクト設計・開発','コアR&D','フルスタック開発','AIプロンプト・フロントエンド','南洋理工大学 学部研究員'],statuses:['本番運用中','プロトタイプ・評価済み','授業パイロット','ChinaJoy展示','商用パイロット','研究プロトタイプ']},
};
export const getProjects = (locale: Locale) => allProjects[locale].map((item,index)=>({...item,role:localMeta[locale].roles[index],status:localMeta[locale].statuses[index]}));
export const getProject = (locale: Locale, slug: ProjectSlug) => getProjects(locale).find((item)=>item.slug===slug)!;
