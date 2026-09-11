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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zqychelsea.github.io/ai-product-portfolio/';
  const shareImage = new URL(project.image.replace(/^\//, ''), siteUrl).toString();
  return { title: `${project.title} | Qinye Zhang`, description: project.summary, openGraph: { images: [shareImage] } };
}

export default async function CaseRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isProjectSlug(slug)) notFound();
  return <ProjectPage locale={locale} slug={slug} />;
}
