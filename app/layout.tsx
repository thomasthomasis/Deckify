import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deckify",
  description: "Stop making flashcards. Start learning immediately.",
};

export default function RootLayout({
    children,
} : {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
          <body className="bg-zinc-950 text-white">
            {children}
          </body>
        </html>
    )
}