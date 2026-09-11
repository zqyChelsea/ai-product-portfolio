import Image from 'next/image';
import Link from 'next/link';
import { assetPath, getProjects, Locale, localePath, ui } from '@/app/content';
import { SiteHeader } from './SiteHeader';

const profile = {
  experience: [
    ['2025', 'Vivacity Ltd', 'Full-stack Game Developer'],
    ['2024', 'COXANA Innovation Ltd', 'AI Prompt Engineer & Front-end Assistant'],
    ['2025', 'NTU · Dr Dong Wei Lab', 'Undergraduate Researcher'],
    ['2024—26', 'PolyU Educational Research Centre', 'GPTutor Core R&D'],
  ],
  education: [
    ['2026—27', 'The Chinese University of Hong Kong', 'MSc Computer Science'],
    ['2022—26', 'The Hong Kong Polytechnic University', 'BSc Computer Science & Applied Mathematics'],
    ['2023', 'University College London', 'Data Science Summer Programme'],
  ],
};

function DetailList({ rows }: { rows: string[][] }) {
  return <ul className="detail-list">{rows.map(([year, title, note]) => <li key={`${year}-${title}`}><time>{year}</time><span><strong>{title}</strong><small>{note}</small></span></li>)}</ul>;
}

export function PortfolioHome({ locale, localeRedirect = false }: { locale: Locale; localeRedirect?: boolean }) {
  const copy = ui[locale];
  const projects = getProjects(locale);
  const profileTitle = {'zh-cn':'产品判断，落进真实实践。','zh-hk':'產品判斷，落進真實實踐。',en:'Product judgement, built into practice.',ja:'プロダクト判断を、実践の中へ。'}[locale];
  const proofLabels = {
    'zh-cn':['朗伯威 · 已完成初筛','RAG 检索／简单回答','SUS · Academic Compass','跨章节测试问题'],
    'zh-hk':['朗伯威 · 已完成初篩','RAG 檢索／簡單回答','SUS · Academic Compass','跨章節測試問題'],
    en:['Lambowell · résumés screened','RAG retrieval / simple answers','SUS · Academic Compass','cross-chapter test questions'],
    ja:['Lambowell · 初期選考完了','RAG検索／単純回答','SUS · Academic Compass','章横断テスト質問'],
  }[locale];
  return (
    <main>
      {localeRedirect ? <span data-locale-redirect="true" /> : null}
      <SiteHeader locale={locale} />

      <section className="hero section-pad" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow-row"><span className="status-dot" />{copy.status}<span>·</span><span>{copy.role}</span><span>·</span><span>{copy.location}</span></div>
          <h1 id="hero-title">{copy.hero}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={`${localePath(locale)}#work`}>{copy.selectedWork}<span aria-hidden>↓</span></Link>
            <a className="button button-quiet" href="mailto:zqyChelsea@gmail.com">zqyChelsea@gmail.com<span aria-hidden>↗</span></a>
          </div>
        </div>
        <figure className="portrait-wrap">
          <Image className="portrait" src={assetPath('/profile/qinye-zhang.jpg')} alt="Qinye Zhang" width={720} height={735} priority />
          <figcaption><span>Qinye Zhang</span><span>{copy.available}</span></figcaption>
        </figure>
      </section>

      <section className="proof-strip" aria-labelledby="proof-title">
        <h2 id="proof-title">{copy.evidence}</h2>
        <div><strong>376</strong><span>{proofLabels[0]}</span></div>
        <div><strong>85–90%</strong><span>{proofLabels[1]}</span></div>
        <div><strong>74.2</strong><span>{proofLabels[2]}</span></div>
        <div><strong>50</strong><span>{proofLabels[3]}</span></div>
      </section>

      <section className="profile-section section-pad" id="profile" aria-labelledby="profile-title">
        <header className="section-heading"><span>01 / PROFILE</span><h2 id="profile-title">{profileTitle}</h2></header>
        <div className="profile-grid">
          <article><h3>{copy.experience}</h3><DetailList rows={profile.experience} /></article>
          <article><h3>{copy.education}</h3><DetailList rows={profile.education} /></article>
          <article><h3>{copy.recognition}</h3><ul className="plain-list"><li>HK Techathon+ · Bronze</li><li>PolyU Micro Fund · HKD 100K</li><li>Kiwi AI · Co-founder</li><li>PromptCraft-RAG · Publication</li><li>Dean’s Honour List</li></ul></article>
          <article><h3>{copy.toolkit}</h3><p className="tool-copy">Python, TypeScript, React, Next.js, Node.js, LangChain, PyTorch, TensorFlow, Redis, Dify.</p><div className="resume-links"><a href={assetPath('/resume/qinye-zhang-zh-cn.pdf')} target="_blank" rel="noreferrer">{copy.resumeZh} ↗</a><a href={assetPath('/resume/qinye-zhang-en.pdf')} target="_blank" rel="noreferrer">{copy.resumeEn} ↗</a></div></article>
        </div>
      </section>

      <section className="work-section section-pad" id="work" aria-labelledby="work-title">
        <header className="section-heading work-heading"><span>02 / SELECTED WORK · 01—06</span><div><h2 id="work-title">{copy.selectedWork}</h2><p>{copy.workIntro}</p></div></header>
        <div className="gallery">
          {projects.map((project, index) => (
            <Link className={`project-card project-card-${index + 1}${project.featured ? ' project-card-featured' : ''}`} key={project.slug} href={localePath(locale, `/projects/${project.slug}/`)} style={{ viewTransitionName: `project-${project.slug}` }}>
              <div className="project-image"><Image src={assetPath(project.image)} alt="" fill sizes="(max-width: 800px) 100vw, 55vw" /></div>
              <div className="project-overlay"><span>{project.no} · {project.year}</span><span>{project.role}</span></div>
              <div className="project-caption"><div><span>{project.series}</span><h3>{project.title}</h3></div><div className="project-metric"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div><span className="project-arrow" aria-label={copy.viewCase}>↗</span></div>
            </Link>
          ))}
        </div>
        <p className="evidence-note">{copy.evidenceNote}</p>
      </section>

      <footer className="contact section-pad" id="contact">
        <span>03 / CONTACT</span><h2>{copy.contactTitle}</h2><p>{copy.contactBody}</p>
        <div className="contact-actions"><a className="button button-inverse" href="mailto:zqyChelsea@gmail.com">{copy.emailMe} ↗</a><a href="https://www.linkedin.com/in/qinye-zhang-247435295/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/zqyChelsea" target="_blank" rel="noreferrer">GitHub ↗</a></div>
        <div className="footer-meta"><span>QINYE ZHANG · AI PRODUCT PORTFOLIO</span><span>Hong Kong · 2026</span></div>
      </footer>
    </main>
  );
}
