'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Removido console.error
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-light mb-4 text-black">Algo salió mal</h1>
        <p className="text-gray-700 mb-8">
          Ha ocurrido un error inesperado. Por favor, intenta recargar la página o vuelve al inicio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            aria-label="Intentar de nuevo"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/es"
            className="px-6 py-3 border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 inline-block"
          >
            Volver al inicio
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.digest && (
          <p className="mt-8 text-xs text-gray-500">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}

