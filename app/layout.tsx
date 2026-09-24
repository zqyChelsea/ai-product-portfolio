import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://zqyChelsea.github.io/ai-product-portfolio/"),
  title: "张沁烨 Qinye Zhang · AI 产品经理",
  description:
    "从真实问题出发，把 AI 做成清晰、可信、可验证的产品。张沁烨的项目、实习经历与生活片段。",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.svg` },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
