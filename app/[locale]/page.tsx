import { notFound } from "next/navigation";
import Editor from "../components/Editor";
import { isLocale, locales } from "../content";
import { pageMetadata } from "../metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, "readme") : {};
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Editor locale={locale} file="readme" />;
}
