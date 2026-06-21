import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import AppToaster from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Deckify',
  description: 'Stop making flashcards. Start learning immediately.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        {children}
        <AppToaster />  
      </body>
    </html>
  );
}
