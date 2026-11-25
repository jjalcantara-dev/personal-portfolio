'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clr, btnPrimary, btnOutline } from '@/lib/constants/colors';
import { tx } from '@/lib/constants/typography';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const isEn = pathname === '/en' || pathname.startsWith('/en/');
  const homeHref = isEn ? '/en' : '/es';

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className={`${tx.h2} mb-4 ${clr.text.primary}`}>
          {isEn ? 'Something went wrong' : 'Algo salió mal'}
        </h1>
        <p className={`${tx.body} ${clr.text.body} mb-8`}>
          {isEn
            ? 'An unexpected error occurred. Please try reloading the page or return to the home page.'
            : 'Ha ocurrido un error inesperado. Por favor, intenta recargar la página o vuelve al inicio.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className={btnPrimary}
            aria-label={isEn ? 'Try again' : 'Intentar de nuevo'}
          >
            {isEn ? 'Try again' : 'Intentar de nuevo'}
          </button>
          <Link
            href={homeHref}
            className={btnOutline}
          >
            {isEn ? 'Back to home' : 'Volver al inicio'}
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className={`mt-8 text-xs ${clr.text.subtle}`}>
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}


