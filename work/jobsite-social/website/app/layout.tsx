import type { Metadata } from 'next';
import { Bebas_Neue, Oswald, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jobsite Social — On-Site Content. Consistent Posting.',
  description:
    'On-site social media content and management for blue-collar businesses across Middle Tennessee. We show up, we shoot, we post.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${oswald.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
