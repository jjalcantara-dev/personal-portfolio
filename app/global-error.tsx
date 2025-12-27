'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-light mb-4 text-black">Error crítico</h1>
            <p className="text-gray-700 mb-8">
              Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              aria-label="Recargar página"
            >
              Recargar página
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

