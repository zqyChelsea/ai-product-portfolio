import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://qinye-ai-product-portfolio.zqychelsea.chatgpt.site'),
  title: '张沁烨 · AI 产品经理作品集',
  description: '张沁烨的 AI 产品作品集：把复杂技术组织成清晰、可信、可落地的产品体验。',
  openGraph: {
    title: '张沁烨 · AI 产品经理作品集',
    description: 'Product intelligence, carefully composed.',
    images: [{ url: '/og.png', width: 1734, height: 907, alt: '张沁烨 AI 产品经理作品集' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '张沁烨 · AI 产品经理作品集',
    description: 'Product intelligence, carefully composed.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
