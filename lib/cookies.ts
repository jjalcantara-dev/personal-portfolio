// Utilidades para manejar cookies del navegador

const COOKIE_NAME = "contact_form_last_submit";

/**
 * Obtiene el valor de una cookie
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  
  return null;
}

/**
 * Establece una cookie
 */
export function setCookie(name: string, value: string, days: number = 1): void {
  if (typeof document === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  // Usar SameSite=Lax para mejor compatibilidad, y asegurar que se guarde
  const isSecure = window.location.protocol === 'https:';
  const cookieString = isSecure 
    ? `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`
    : `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  
  document.cookie = cookieString;
  
  // Verificar que se guardó correctamente (solo en desarrollo)
  // Removido console.warn
}

/**
 * Obtiene el timestamp del último envío del formulario
 * Intenta leer desde cookie primero, luego desde localStorage como fallback
 */
export function getLastSubmitTime(): number {
  if (typeof document === "undefined") return 0;
  
  // Intentar leer desde cookie primero
  const cookieValue = getCookie(COOKIE_NAME);
  if (cookieValue) {
    const timestamp = parseInt(cookieValue, 10);
    if (!isNaN(timestamp) && timestamp > 0) {
      return timestamp;
    }
  }
  
  // Fallback a localStorage
  try {
    const stored = localStorage.getItem(COOKIE_NAME);
    if (stored) {
      const timestamp = parseInt(stored, 10);
      if (!isNaN(timestamp) && timestamp > 0) {
        return timestamp;
      }
    }
  } catch (e) {
    // localStorage no disponible (modo privado, etc.)
  }
  
  return 0;
}

/**
 * Guarda el timestamp del último envío del formulario
 * Guarda tanto en cookie como en localStorage para máxima compatibilidad
 */
export function setLastSubmitTime(timestamp: number): void {
  if (typeof document === "undefined") return;
  
  // Guardar en cookie (expira en 1 día)
  setCookie(COOKIE_NAME, timestamp.toString(), 1);
  
  // También guardar en localStorage como respaldo
  try {
    localStorage.setItem(COOKIE_NAME, timestamp.toString());
  } catch (e) {
    // localStorage no disponible (modo privado, etc.) - solo usar cookie
  }
  
  // Verificar inmediatamente que se guardó (solo en desarrollo)
  // Removido console.error
}

