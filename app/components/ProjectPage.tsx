import Image from 'next/image';
import Link from 'next/link';
import { assetPath, getProject, getProjects, Locale, localePath, ProjectSlug, ui } from '@/app/content';
import { SiteHeader } from './SiteHeader';

export function ProjectPage({ locale, slug }: { locale: Locale; slug: ProjectSlug }) {
  const copy = ui[locale];
  const project = getProject(locale, slug);
  const projects = getProjects(locale);
  const index = projects.findIndex((item) => item.slug === slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const anchors = [
    ['overview',copy.overview],['context',copy.context],['decisions',copy.decisions],
    ...(project.workflow ? [['workflow',copy.workflow]] : []),
    ['system',copy.system],
    ...(project.guardrails ? [['guardrails',copy.guardrails]] : []),
    ['evaluation',copy.evaluation],['impact',copy.impact],['reflection',copy.reflection],
  ];
  const metaLabels = { 'zh-cn':['角色','周期','状态'], 'zh-hk':['角色','週期','狀態'], en:['Role','Period','Status'], ja:['役割','期間','状態'] }[locale];
  const flow = { 'zh-cn':['用户信号','意图与风险','知识／模型','证据','人工决策'], 'zh-hk':['用戶信號','意圖與風險','知識／模型','證據','人工決策'], en:['User signal','Intent & risk','Knowledge / model','Evidence','Human decision'], ja:['ユーザー入力','意図・リスク','知識／モデル','根拠','人の判断'] }[locale];

  return <main className="case-main">
    <SiteHeader locale={locale} suffix={`/projects/${slug}/`} />
    <section className="case-hero">
      <div className="case-art" style={{ viewTransitionName: `project-${slug}` }}><Image src={assetPath(project.image)} alt="" fill priority sizes="(max-width: 700px) 100vw, 54vw" /></div>
      <div className="case-intro">
        <Link className="case-kicker" href={`${localePath(locale)}#work`}>← {copy.back}</Link>
        <h1>{project.title}</h1><p className="case-series">{project.series}</p><p className="case-summary">{project.summary}</p>
        <div className="case-stat"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
        {project.evidenceItems ? <div className="case-evidence" aria-label={copy.observed}>{project.evidenceItems.map((item)=><div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div> : null}
        <div className="case-meta"><div><span>{metaLabels[0]}</span>{project.role}</div><div><span>{metaLabels[1]}</span>{project.year}</div><div><span>{metaLabels[2]}</span>{project.status}</div></div>
        {project.liveUrl ? <a className="button button-primary case-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">{copy.liveProduct}<span aria-hidden>↗</span></a> : null}
      </div>
    </section>
    <div className="case-body section-pad">
      <aside className="case-toc"><span>{copy.contents}</span><nav>{anchors.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav></aside>
      <article className="case-content">
        <section id="overview"><h2>{copy.overview}</h2><div className="tldr-grid"><div><span>{copy.challenge}</span><p>{project.problem}</p></div><div><span>{copy.response}</span><p>{project.solution}</p></div></div></section>
        <section id="context"><h2>{copy.context}</h2><p>{project.context}</p></section>
        <section id="decisions"><h2>{copy.decisions}</h2><ol className="decision-list">{project.decisions.map((decision)=><li key={decision}>{decision}</li>)}</ol></section>
        {project.workflow ? <section id="workflow"><h2>{copy.workflow}</h2><ol className="pipeline-flow">{project.workflow.map((step,index)=><li key={step}><span>{String(index + 1).padStart(2,'0')}</span><strong>{step}</strong></li>)}</ol></section> : null}
        <section id="system"><h2>{copy.system}</h2><p>{project.system}</p><div className="system-flow" aria-label="AI product system flow"><span>{flow[0]}</span><i>→</i><span>{flow[1]}</span><i>→</i><span>{flow[2]}</span><i>→</i><span>{flow[3]}</span><i>→</i><span>{flow[4]}</span></div><p className="tool-line">{project.tools.join(' · ')}</p></section>
        {project.guardrails ? <section id="guardrails"><h2>{copy.guardrails}</h2><ul className="guardrail-list">{project.guardrails.map((item)=><li key={item}>{item}</li>)}</ul></section> : null}
        <section id="evaluation"><h2>{copy.evaluation}</h2><p>{project.evaluation}</p><p className="guardrail">{copy.evidenceNote}</p></section>
        <section id="impact"><h2>{copy.impact}</h2><div className="impact-block"><strong>{project.metric}</strong><p>{project.impact}</p></div></section>
        <section id="reflection"><h2>{copy.reflection}</h2><p>{project.reflection}</p></section>
      </article>
    </div>
    <nav className="case-nav" aria-label="Project navigation">
      <Link href={localePath(locale, `/projects/${previous.slug}/`)}><span>← {copy.previous}</span><strong>{previous.title}</strong></Link>
      <Link href={localePath(locale, `/projects/${next.slug}/`)}><span>{copy.next} →</span><strong>{next.title}</strong></Link>
    </nav>
  </main>;
}
