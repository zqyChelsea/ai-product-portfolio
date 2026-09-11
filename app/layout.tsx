import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zqychelsea.github.io/ai-product-portfolio/'),
  title: 'Qinye Zhang | AI Product Manager',
  description: 'AI product work by Qinye Zhang—turning complex technology into clear, trustworthy and measurable product experiences.',
  openGraph: {
    title: 'Qinye Zhang | AI Product Manager',
    description: 'Product intelligence, carefully composed.',
    images: [{ url: '/projects/academic-compass.webp', width: 1536, height: 1024, alt: 'Qinye Zhang AI product portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qinye Zhang | AI Product Manager',
    description: 'Product intelligence, carefully composed.',
    images: ['/projects/academic-compass.webp'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
