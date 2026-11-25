import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { clr, btnPrimary, btnOutline } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "404 | jjalcantara.dev",
  robots: { index: false, follow: true },
};

// The root layout renders no <html> (each locale layout does), so this page,
// served for any unknown URL, renders its own document. Both languages, since
// the locale of a broken URL is unknown.
export default function NotFound() {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className={`${tx.label} ${clr.text.faint} mb-4 select-none`}>404</p>
            <h1 className={`${tx.h2} ${clr.text.primary} mb-2`}>Página no encontrada</h1>
            <p className={`${tx.body} ${clr.text.muted} mb-8`}>Page not found</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center">
              <Link href="/es" className={btnPrimary}>
                Ir al inicio
              </Link>
              <Link href="/en" className={btnOutline}>
                Go to home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
