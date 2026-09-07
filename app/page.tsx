'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const publicAsset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

type Project = {
  id: string; no: string; title: string; en: string; year: string; role: string;
  metric: string; metricLabel: string; summary: string; challenge: string;
  approach: string; impact: string; tools: string; art: string; size: string;
  image: string; artTitle: string; artYear: string; artSource: string;
};

const projects: Project[] = [
  {
    id:'advisor', no:'01', title:'Agent 驱动的学术顾问', en:'Academic Compass', year:'2025—26',
    role:'Independent Product & Build', metric:'85–90%', metricLabel:'检索精度与简单问题正确率',
    summary:'为复杂学业规则设计一位会澄清、懂边界的 AI 顾问。',
    challenge:'老师人均负责 80–120 名学生；规章散落在 PRD、GUR 与学生事务文件中，旧 chatbot 又无法理解自然语言。',
    approach:'用 Dify 设计多代理工作流，按院系规则、校级要求与学生事务拆分知识库；构建 PDF 转 Markdown 与网页抓取管线，并为模糊提问和心理健康场景加入 Clarification & Fallback。',
    impact:'整体检索精度与简单问题正确率约 85–90%，SUS 得分 74.2；在 30 个真实问题上显著优于旧 chatbot。',
    tools:'Dify · RAG · Multi-Agent · UX Strategy', art:'art-advisor', size:'project-wide',
    image:'/art/advisor-footbridge.jpg', artTitle:'The Japanese Footbridge', artYear:'1899',
    artSource:'https://commons.wikimedia.org/wiki/File:Claude_Monet,_The_Japanese_Footbridge,_1899,_NGA_74796.jpg',
  },
  {
    id:'gptutor', no:'02', title:'GPTutor RAG 模块优化', en:'Knowledge, Reconstructed', year:'2024—NOW',
    role:'Core R&D', metric:'+60%', metricLabel:'考试周平台访问量',
    summary:'让大模型理解整门课程，而不是只捡起一段上下文。',
    challenge:'百页课程讲义包含表格、公式和跨章节关联；通用模型容易引入课外内容，也难以建立完整课程结构。',
    approach:'提出“分层分块 + 元数据增强”方案，将章节标题等结构信息带入检索单元，降低跨章节问答中的上下文碎片。',
    impact:'完成 50 个跨章节问答测试；约 70–80% 受访学生认为准确性与连贯性提升，方案已推广到部分课程。',
    tools:'RAG · Information Architecture · Evaluation', art:'art-gptutor', size:'project-tall',
    image:'/art/gptutor-water-lilies.jpg', artTitle:'Water Lilies', artYear:'1906',
    artSource:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Water_Lilies_-_1906,_Ryerson.jpg',
  },
  {
    id:'feedback', no:'03', title:'实时玩家反馈智能台', en:'Signal From Noise', year:'2025',
    role:'Full-stack Game Tech', metric:'500', metricLabel:'ChinaJoy 日均交互',
    summary:'不必 @ 机器人，让真正的产品信号自己浮出水面。',
    challenge:'用户反馈散落在客服、社媒和聊天群中，收集周期长、口径不一，拖慢游戏团队迭代。',
    approach:'基于 OneBot、TypeScript 与 Node.js 构建 QQ / Discord 机器人和可视化后台；用轻量 NLP 与规则过滤噪声，按版本和模块聚合问题。',
    impact:'在 2–3 家目标游戏企业完成试点并获得良好反馈，于 ChinaJoy 2025 展示，展会期间日均交互 500 次。',
    tools:'OneBot · TypeScript · NLP · Dashboard', art:'art-feedback', size:'project-small',
    image:'/art/feedback-poppy-field.jpg', artTitle:'Poppy Field (Giverny)', artYear:'1890–91',
    artSource:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Poppy_Field_(Giverny)_-_1922.4465_-_Art_Institute_of_Chicago.jpg',
  },
  {
    id:'wellness', no:'04', title:'精油推荐体验', en:'From Symptom to Choice', year:'2024',
    role:'AI Prompt & Front-end', metric:'+10%', metricLabel:'精油产品销量',
    summary:'缩短用户从“我不舒服”到“我知道选什么”的距离。',
    challenge:'产品页只展示成分，缺少适用症状与用法指引，用户需求和商品之间没有清晰路径。',
    approach:'从 WhatsApp 讨论群与论坛构建症状—精油数据集，参与工业级提示管线，并将推荐能力接入 chatbot 与商品页。',
    impact:'可回答约 70% 的常见推荐需求并自动关联商品；推荐对话、页面访问量与销量均得到提升。',
    tools:'Prompt Pipeline · Dataset · Web UX', art:'art-wellness', size:'project-wide-reverse',
    image:'/art/wellness-argenteuil.jpg', artTitle:"The Artist's House at Argenteuil", artYear:'1873',
    artSource:'https://commons.wikimedia.org/wiki/File:Claude_Monet_-_The_Artist%27s_House_at_Argenteuil_-_1933.1153_-_Art_Institute_of_Chicago.jpg',
  },
  {
    id:'crawler', no:'05', title:'LLM 爬虫威胁研究', en:'Adversarial Extraction', year:'2025',
    role:'NTU Undergraduate Researcher', metric:'20', metricLabel:'轮对比实验',
    summary:'把“模型会不会被网页欺骗”变成可以度量的问题。',
    challenge:'LLM 驱动爬虫在动态网页中的图像提取风险缺少系统化描述与专用评测方法。',
    approach:'构建覆盖 3 类攻击场景与 2 种防御策略的测试集，设计 LLM-to-Script 与 LLM-Native Crawlers 两条流程，并集成多代理协作。',
    impact:'以召回率与精确率双指标完成 20 轮对比实验，验证对抗性图像提取威胁的有效性。',
    tools:'Threat Modeling · LLM Crawlers · Multi-Agent · Evaluation', art:'art-crawler', size:'project-banner',
    image:'/art/crawler-seine.jpg', artTitle:'The Seine at Giverny', artYear:'1897',
    artSource:'https://commons.wikimedia.org/wiki/File:Claude_Monet,_The_Seine_at_Giverny,_1897,_NGA_46655.jpg',
  },
];

function Artwork({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div className={`artwork ${project.art} ${large ? 'artwork-large' : ''}`}>
      <Image src={publicAsset(project.image)} alt={`Claude Monet, ${project.artTitle}, ${project.artYear}`} fill sizes={large ? '(max-width: 900px) 100vw, 52vw' : '(max-width: 900px) 100vw, 62vw'} />
      <span className="artwork-wash" aria-hidden="true" />
      <span className="artwork-code" aria-hidden="true">{project.no}</span>
      <span className="artwork-word" aria-hidden="true">{project.en}</span>
      <span className="artwork-credit">MONET · {project.artTitle.toUpperCase()} · {project.artYear}</span>
    </div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => { const max = document.documentElement.scrollHeight - innerHeight; setProgress(max ? scrollY / max : 0); };
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('shown'); }), { threshold:.12 });
    document.querySelectorAll('.reveal').forEach((node) => observer.observe(node));
    addEventListener('scroll', onScroll, { passive:true }); onScroll();
    return () => { removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null); };
    addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', close); };
  }, [selected]);

  const parallax = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--px', `${((event.clientX-box.left)/box.width-.5)*16}px`);
    event.currentTarget.style.setProperty('--py', `${((event.clientY-box.top)/box.height-.5)*12}px`);
  };

  const tiltFrame = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - .5;
    const y = (event.clientY - box.top) / box.height - .5;
    event.currentTarget.style.setProperty('--frame-x', `${x * 7}px`);
    event.currentTarget.style.setProperty('--frame-y', `${y * 5}px`);
    event.currentTarget.style.setProperty('--frame-rx', `${-y * 3}deg`);
    event.currentTarget.style.setProperty('--frame-ry', `${x * 4}deg`);
  };

  const resetFrame = (event: React.PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty('--frame-x');
    event.currentTarget.style.removeProperty('--frame-y');
    event.currentTarget.style.removeProperty('--frame-rx');
    event.currentTarget.style.removeProperty('--frame-ry');
  };

  return (
    <main className="gallery-site">
      <div className="page-progress" style={{ transform:`scaleX(${progress})` }} />
      <header className="site-header">
        <a className="wordmark" href="#top">QINYE ZHANG</a>
        <nav aria-label="主导航"><a href="#works">INDEX</a><a href="#practice">PRACTICE</a><a href="#about">PROFILE</a></nav>
        <a className="header-contact" href="mailto:zqyChelsea@gmail.com">CONTACT ↗</a>
      </header>

      <section className="gallery-hero" id="top">
        <div className="hero-heading reveal shown"><span className="eyeline">AI PRODUCT PORTFOLIO · 2026</span><h1>Product intelligence,<br /><em>carefully composed.</em></h1></div>
        <div className="hero-intro reveal shown"><span>(ABOUT)</span><p>张沁烨是一名 AI 产品经理与构建者。她在产品、研究与工程之间工作，把复杂技术转化为清晰、可信、可落地的体验。</p><small>HONG KONG<br />AI / PRODUCT / CODE</small></div>

        <section className="gallery-view reveal shown" aria-labelledby="gallery-view-title">
          <div className="gallery-view-head">
            <span>GALLERY VIEW · 01—04</span>
            <h2 id="gallery-view-title">Enter the work.</h2>
            <p>选择一幅作品，进入对应项目。</p>
          </div>
          <div className="gallery-hall">
            {projects.slice(0, 4).map((project) => (
              <a
                className={`gallery-frame gallery-frame-${project.no}`}
                href={`#project-${project.id}`}
                key={project.id}
                onPointerMove={tiltFrame}
                onPointerLeave={resetFrame}
                aria-label={`前往项目 ${project.no}：${project.title}`}
              >
                <span className="gallery-frame-art">
                  <Image src={publicAsset(project.image)} alt="" fill sizes="(max-width: 900px) 42vw, 24vw" />
                </span>
                <span className="gallery-plaque">
                  <b>{project.no}</b>
                  <span><strong>{project.title}</strong><small>{project.en}</small></span>
                  <em>VIEW ↘</em>
                </span>
              </a>
            ))}
          </div>
          <span className="gallery-view-index">CURATED PROJECT INDEX</span>
        </section>

        <div className="hero-landscape reveal shown" onPointerMove={parallax} onPointerLeave={(e) => { e.currentTarget.style.removeProperty('--px'); e.currentTarget.style.removeProperty('--py'); }}>
          <Image src={publicAsset('/art/hero-cliff-walk.jpg')} alt="Claude Monet, Cliff Walk at Pourville, 1882" fill priority sizes="100vw" />
          <span className="landscape-label">01 — FROM COMPLEXITY TO CLARITY</span>
          <a className="landscape-art-credit" href="https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Cliff_Walk_at_Pourville_-_Google_Art_Project.jpg" target="_blank" rel="noreferrer">CLAUDE MONET · CLIFF WALK AT POURVILLE · 1882 ↗</a>
          <a className="round-link" href="#works">VIEW<br />INDEX <b>↘</b></a>
        </div>
      </section>

      <section className="curatorial reveal" id="works">
        <span className="section-label">01 / SELECTED WORK</span>
        <p>Five studies in making artificial intelligence <em>useful, legible,</em> and <em>human.</em></p>
        <div className="curatorial-note"><span>2024—2026</span><span>PRODUCT STRATEGY<br />PROTOTYPING<br />AI SYSTEMS</span></div>
      </section>

      <section className="project-gallery" aria-label="精选项目">
        {projects.map((project) => (
          <article className={`project-card ${project.size} reveal`} id={`project-${project.id}`} key={project.id}>
            <button className="project-open" onClick={() => setSelected(project)} aria-label={`查看项目：${project.title}`}>
              <Artwork project={project} />
              <span className="project-hover">OPEN CASE <b>↗</b></span>
            </button>
            <div className="project-caption"><span>{project.no}</span><div><h2>{project.title}</h2><p>{project.en} · {project.year}</p></div><small>{project.role}</small></div>
          </article>
        ))}
      </section>

      <section className="method-section" id="practice">
        <div className="method-title reveal"><span className="section-label">02 / PRACTICE</span><h2>Clarity is<br />a product decision.</h2><a className="round-link small-round" href="#about">MORE<br />ABOUT <b>↓</b></a></div>
        <div className="method-list reveal">
          <div><span>01</span><h3>Find the signal</h3><p>从真实用户和业务约束出发，定义值得解决的问题，而不是先寻找技术的用武之地。</p></div>
          <div><span>02</span><h3>Structure the unknown</h3><p>把模糊系统拆成数据、工作流、交互与评测，让不确定性变得可讨论、可验证。</p></div>
          <div><span>03</span><h3>Build to learn</h3><p>用原型和实验尽早暴露风险，让每一轮构建都回答一个真正影响决策的问题。</p></div>
          <div><span>04</span><h3>Measure what matters</h3><p>同时关注正确率、可用性和业务变化，避免让单一技术指标代替产品价值。</p></div>
        </div>
      </section>

      <section className="profile-section" id="about">
        <div className="profile-quote reveal"><span className="section-label">03 / PROFILE</span><p>技术应该退到体验之后，<br />让正确的事情<em>自然发生。</em></p></div>
        <div className="profile-columns reveal">
          <div><h3>EDUCATION</h3><dl><dt>2026—27</dt><dd><b>香港中文大学</b><span>计算机科学 · 硕士</span></dd><dt>2022—26</dt><dd><b>香港理工大学</b><span>计算机科学 & 应用数学 · 学士<br />院长荣誉榜</span></dd><dt>2023</dt><dd><b>UCL</b><span>数据科学</span></dd></dl></div>
          <div><h3>SELECTED NOTES</h3><ul><li>HK Techathon+ 铜奖</li><li>PolyU Micro Fund · HKD 100K</li><li>Kiwi AI · 联合创始人</li><li>PromptCraft-RAG · 出版物</li></ul></div>
          <div><h3>TOOLS / MEDIUM</h3><p>Python, TypeScript, React, Next.js, Node.js, LangChain, PyTorch, TensorFlow, Redis, Dify.</p><a href="https://linkedin.com/in/qinye-zhang-247435295" target="_blank" rel="noreferrer">LINKEDIN ↗</a></div>
        </div>
      </section>

      <footer className="site-footer">
        <div><span>04 / CONTACT</span><p>Have a complex problem<br />worth making clear?</p></div>
        <a className="round-link footer-round" href="mailto:zqyChelsea@gmail.com">START A<br />CONVERSATION <b>↗</b></a>
        <div className="footer-art"><span>ARTWORKS</span><p>Claude Monet · public-domain/open-access reproductions</p><a href="https://commons.wikimedia.org/wiki/Category:Paintings_by_Claude_Monet" target="_blank" rel="noreferrer">VIEW SOURCES ↗</a></div>
        <div className="footer-meta"><span>© 2026 QINYE ZHANG</span><span>AI PRODUCT MANAGER · HONG KONG</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      {selected && <div className="case-overlay" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}>
        <div className="case-panel">
          <button className="case-close" onClick={() => setSelected(null)} aria-label="关闭项目详情">CLOSE<br />×</button>
          <div className="case-art"><Artwork project={selected} large /><span>{selected.no} / {selected.year}</span><a href={selected.artSource} target="_blank" rel="noreferrer">ART SOURCE ↗</a></div>
          <div className="case-copy"><span className="case-role">{selected.role}</span><h2 id="case-title">{selected.title}</h2><em>{selected.en}</em><p className="case-summary">{selected.summary}</p><div className="case-metric"><b>{selected.metric}</b><span>{selected.metricLabel}</span></div><div className="case-story"><section><span>CONTEXT</span><p>{selected.challenge}</p></section><section><span>DESIGN</span><p>{selected.approach}</p></section><section><span>IMPACT</span><p>{selected.impact}</p></section></div><p className="case-tools">{selected.tools}</p></div>
        </div>
      </div>}
    </main>
  );
}
