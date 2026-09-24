import type { Metadata } from "next";
import {
  copy,
  entries,
  fileTitle,
  fileUrl,
  locales,
  t,
  type Locale,
} from "./content";
const origin = "https://zqyRiver.github.io/ai-product-portfolio";
export function pageMetadata(locale: Locale, file: string): Metadata {
  const title =
    file === "readme"
      ? `${t(locale, copy.name)} · ${t(locale, copy.role)}`
      : `${t(locale, fileTitle(file))} · Qinye Zhang`;
  const entry = entries.find((item) => item.id === file);
  const description = entry
    ? t(locale, entry.intro)
    : t(locale, [
      "张沁烨的 AI 产品作品集：从用户问题出发，连接产品设计、工程实践与评测。",
      "張沁燁的 AI 產品作品集：從用戶問題出發，連接產品設計、工程實作與評測。",
      "Qinye Zhang’s AI product portfolio: connecting user needs, product design, engineering and evaluation.",
    ]);
  const url = `${origin}${fileUrl(locale, file)}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        locales.map((l) => [
          l === "zh-cn" ? "zh-CN" : l === "zh-hk" ? "zh-HK" : "en",
          `${origin}${fileUrl(l, file)}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale:
        locale === "zh-cn" ? "zh_CN" : locale === "zh-hk" ? "zh_HK" : "en_US",
    },
  };
}
