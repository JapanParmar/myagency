import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cosmica',
});

export const metadata: Metadata = {
  title: 'Pixora Studio - Professional Website Agency',
  description:
    'A high-converting agency website with clean typographic layouts, rounded card surfaces, and measurable performance goals.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
