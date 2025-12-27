/**
 * Validación de configuración de la aplicación
 * Verifica que las variables de entorno necesarias estén configuradas
 */

/**
 * Valida la configuración de la aplicación
 * Muestra advertencias en desarrollo si falta alguna configuración
 */
export function validateConfig(): void {
  if (typeof window === "undefined") return; // Solo en cliente

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const formspreeIdRegex = /^[a-zA-Z0-9_-]+$/;

  if (!formspreeId) {
    // Removido console.warn
    return;
  }

  if (!formspreeIdRegex.test(formspreeId)) {
    // Removido console.warn
  }
}

/**
 * Valida la configuración al cargar el módulo (solo en cliente)
 */
if (typeof window !== "undefined") {
  // Ejecutar validación después de que el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", validateConfig);
  } else {
    // DOM ya está listo
    validateConfig();
  }
}

