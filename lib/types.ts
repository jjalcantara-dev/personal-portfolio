/**
 * Tipos compartidos para mejor type safety
 */

/**
 * Estado del formulario de contacto
 */
export type FormStatus = "idle" | "sending" | "success" | "error";

/**
 * Errores del formulario
 */
export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  _general?: string;
}

