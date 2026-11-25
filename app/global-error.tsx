'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { clr, btnPrimary } from '@/lib/constants/colors';
import { tx } from '@/lib/constants/typography';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className={`${tx.h2} ${clr.text.primary} mb-2`}>Error inesperado</h1>
            <p className={`${tx.body} ${clr.text.muted} mb-8`}>
              An unexpected error occurred. Please reload the page.
            </p>
            <button
              onClick={reset}
              className={btnPrimary}
              aria-label="Recargar página / Reload page"
            >
              Recargar / Reload
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}


