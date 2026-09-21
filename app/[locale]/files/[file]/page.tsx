import { notFound } from "next/navigation";
import Editor from "@/app/components/Editor";
import { fileIds, isLocale, locales } from "@/app/content";
import { pageMetadata } from "@/app/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    fileIds
      .filter((file) => file !== "readme")
      .map((file) => ({ locale, file })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; file: string }>;
}) {
  const { locale, file } = await params;
  if (!isLocale(locale) || !fileIds.includes(file)) return {};
  return pageMetadata(locale, file);
}
export default async function FilePage({
  params,
}: {
  params: Promise<{ locale: string; file: string }>;
}) {
  const { locale, file } = await params;
  if (!isLocale(locale) || !fileIds.includes(file)) notFound();
  return <Editor locale={locale} file={file} />;
}
