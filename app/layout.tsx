import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zqychelsea.github.io/ai-product-portfolio/';
const shareImage = new URL('projects/academic-compass.webp', siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Qinye Zhang | AI Product Manager',
  description: 'AI product work by Qinye Zhang—turning complex technology into clear, trustworthy and measurable product experiences.',
  openGraph: {
    title: 'Qinye Zhang | AI Product Manager',
    description: 'Product intelligence, carefully composed.',
    images: [{ url: shareImage, width: 1200, height: 800, alt: 'Qinye Zhang AI product portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qinye Zhang | AI Product Manager',
    description: 'Product intelligence, carefully composed.',
    images: [shareImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
