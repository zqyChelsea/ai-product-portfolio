import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PortfolioHome } from '@/app/components/PortfolioHome';
import { isLocale, locales, ui } from '@/app/content';

export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = ui[locale];
  return { title: copy.documentTitle, description: copy.documentDescription };
}

export default async function LocalisedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PortfolioHome locale={locale} />;
}
