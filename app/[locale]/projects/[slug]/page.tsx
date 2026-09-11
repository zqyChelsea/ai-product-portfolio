import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectPage } from '@/app/components/ProjectPage';
import { getProject, isLocale, isProjectSlug, locales, projectSlugs } from '@/app/content';

export const dynamicParams = false;
export function generateStaticParams() { return locales.flatMap((locale) => projectSlugs.map((slug) => ({ locale, slug }))); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) return {};
  const project = getProject(locale, slug);
  return { title: `${project.title} | Qinye Zhang`, description: project.summary, openGraph: { images: [project.image] } };
}

export default async function CaseRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound();
  return <ProjectPage locale={locale} slug={slug} />;
}
