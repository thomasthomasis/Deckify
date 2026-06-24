import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deckify.app';

export const metadata: Metadata = {
  title: {
    default: 'Deckify',
    template: '%s | Deckify',
  },
  description: 'Stop making flashcards. Start learning immediately.',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Deckify',
    description: 'Stop making flashcards. Start learning immediately.',
    url: siteUrl,
    siteName: 'Deckify',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deckify',
    description: 'Stop making flashcards. Start learning immediately.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
