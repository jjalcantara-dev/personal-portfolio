"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getLastSubmitTime, setLastSubmitTime } from "@/lib/cookies";
import type { FormStatus, FormErrors } from "@/lib/types";
import "@/lib/config"; // Validar configuración al cargar

type Props = {
  locale: Locale;
};

// Validación y sanitización
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

const validateEmail = (email: string): boolean => {
  // Validación más robusta según RFC 5322 (simplificada)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= MAX_EMAIL_LENGTH && email.length >= 3;
};

const sanitizeString = (str: string): string => {
  // Eliminar caracteres de control y normalizar espacios
  return str
    .replace(/[\x00-\x1F\x7F]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const sanitizeSubject = (name: string): string => {
  // Limpiar para usar en subject del email
  return sanitizeString(name)
    .replace(/[<>]/g, '') // Eliminar < y >
    .substring(0, 50); // Limitar longitud
};

export default function ContactForm({ locale }: Props) {
  const t = getContent(locale);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const RATE_LIMIT_MS = 300000; // 5 minutos entre envíos

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return "";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0) {
      return locale === "es" 
        ? `${minutes}m ${secs}s`
        : `${minutes}m ${secs}s`;
    }
    return locale === "es" 
      ? `${secs} segundos`
      : `${secs} seconds`;
  };

  // Cargar tiempo del último envío desde cookie al montar el componente
  useEffect(() => {
    // Esperar un momento para asegurar que el DOM esté listo
    const checkLastSubmit = () => {
      const lastSubmit = getLastSubmitTime();
      if (lastSubmit > 0) {
        const now = Date.now();
        const elapsed = now - lastSubmit;
        const remaining = Math.max(0, Math.ceil((RATE_LIMIT_MS - elapsed) / 1000));
        setTimeRemaining(remaining);
        
        // Si aún hay tiempo restante, mostrar el error automáticamente
        if (remaining > 0) {
          setStatus("error");
          setErrors({
            _general: locale === "es" 
              ? `Por favor espera antes de enviar nuevamente. Tiempo restante: ${formatTimeRemaining(remaining)}`
              : `Please wait before submitting again. Time remaining: ${formatTimeRemaining(remaining)}`
          });
        }
      }
    };
    
    // Ejecutar inmediatamente y también después de un pequeño delay para asegurar que las cookies estén disponibles
    checkLastSubmit();
    const timeout = setTimeout(checkLastSubmit, 100);
    
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Contador de tiempo restante
  useEffect(() => {
    const updateTimeRemaining = () => {
      const lastSubmit = getLastSubmitTime();
      if (lastSubmit === 0) {
        setTimeRemaining(0);
        return;
      }
      const now = Date.now();
      const elapsed = now - lastSubmit;
      const remaining = Math.max(0, Math.ceil((RATE_LIMIT_MS - elapsed) / 1000));
      setTimeRemaining(remaining);
      
      // Si el tiempo se agotó, limpiar el error si estaba relacionado con rate limiting
      if (remaining === 0 && status === "error" && (errors._general?.includes("espera") || errors._general?.includes("wait"))) {
        setErrors({});
        setStatus("idle");
      }
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [status, errors._general]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    const sanitizedName = sanitizeString(formData.name);
    if (!sanitizedName || sanitizedName.length === 0) {
      newErrors.name = locale === "es" ? "El nombre es requerido" : "Name is required";
    } else if (sanitizedName.length > MAX_NAME_LENGTH) {
      newErrors.name = locale === "es" 
        ? `El nombre no puede exceder ${MAX_NAME_LENGTH} caracteres` 
        : `Name cannot exceed ${MAX_NAME_LENGTH} characters`;
    }

    // Validar email
    if (!formData.email || formData.email.trim().length === 0) {
      newErrors.email = locale === "es" ? "El email es requerido" : "Email is required";
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = locale === "es" ? "Email inválido" : "Invalid email";
    }

    // Validar mensaje
    const sanitizedMessage = sanitizeString(formData.message);
    if (!sanitizedMessage || sanitizedMessage.length === 0) {
      newErrors.message = locale === "es" ? "El mensaje es requerido" : "Message is required";
    } else if (sanitizedMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = locale === "es" 
        ? `El mensaje no puede exceder ${MAX_MESSAGE_LENGTH} caracteres` 
        : `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prevenir múltiples envíos simultáneos
    if (status === "sending") {
      return;
    }
    
    if (!consent) {
      setStatus("error");
      setErrors({ 
        ...errors, 
        _general: locale === "es" ? "Debes aceptar el consentimiento" : "You must accept consent" 
      });
      return;
    }

    // Rate limiting - leer desde cookie (siempre verificar)
    const lastSubmit = getLastSubmitTime();
    const now = Date.now();
    
    // Verificar si hay un envío previo y si aún no ha pasado el tiempo límite
    if (lastSubmit > 0) {
      const timeSinceLastSubmit = now - lastSubmit;
      if (timeSinceLastSubmit >= 0 && timeSinceLastSubmit < RATE_LIMIT_MS) {
        const remainingSeconds = Math.ceil((RATE_LIMIT_MS - timeSinceLastSubmit) / 1000);
        const formattedTime = formatTimeRemaining(remainingSeconds);
        setStatus("error");
        setErrors({ 
          _general: locale === "es" 
            ? `Por favor espera antes de enviar nuevamente. Tiempo restante: ${formattedTime}` 
            : `Please wait before submitting again. Time remaining: ${formattedTime}` 
        });
        return;
      }
    }

    // Validar formulario
    if (!validateForm()) {
      setStatus("error");
      return;
    }
    
    // Verificar reCAPTCHA
    let recaptchaToken = "";
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (siteKey && executeRecaptcha) {
      try {
        // executeRecaptcha puede mostrar un popup de desafío si Google detecta comportamiento sospechoso
        // Normalmente es invisible y solo genera el token en segundo plano
        recaptchaToken = await executeRecaptcha("contact_form");
        if (!recaptchaToken) {
          // Si no se obtiene token, puede ser que Google mostró un desafío y el usuario no lo completó
          setStatus("error");
          setErrors({ 
            _general: locale === "es" 
              ? "Por favor completa la verificación de seguridad" 
              : "Please complete the security verification" 
          });
          return;
        }
      } catch (error) {
        // Si reCAPTCHA falla completamente, mostrar error
        setStatus("error");
        setErrors({ 
          _general: locale === "es" 
            ? "Error en la verificación de seguridad. Por favor intenta de nuevo." 
            : "Security verification error. Please try again." 
        });
        return;
      }
    }
    
    // IMPORTANTE: Guardar el timestamp ANTES de enviar para prevenir múltiples envíos simultáneos
    const submitTime = Date.now();
    setLastSubmitTime(submitTime);
    setTimeRemaining(Math.ceil(RATE_LIMIT_MS / 1000));
    
    setStatus("sending");
    setErrors({});

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    
    // Validar que el ID existe y tiene formato válido (solo alfanumérico, guiones y guiones bajos)
    const formspreeIdRegex = /^[a-zA-Z0-9_-]+$/;
    if (!formspreeId || !formspreeIdRegex.test(formspreeId)) {
      // Removido console.error
      setStatus("error");
      setErrors({ 
        _general: locale === "es" 
          ? "Error de configuración. Por favor contacta al administrador." 
          : "Configuration error. Please contact the administrator." 
      });
      return;
    }

    // Sanitizar datos antes de enviar
    const sanitizedName = sanitizeString(formData.name);
    const sanitizedEmail = formData.email.trim().toLowerCase();
    const sanitizedMessage = sanitizeString(formData.message);
    const sanitizedSubject = sanitizeSubject(sanitizedName);

    try {
      const requestBody: Record<string, string> = {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        _subject: `Contact from ${sanitizedSubject} - jjalcantara.dev`,
      };

      // Añadir token de reCAPTCHA si está disponible
      if (recaptchaToken) {
        requestBody["g-recaptcha-response"] = recaptchaToken;
      }

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // El timestamp ya se guardó antes de enviar, solo actualizar el estado
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setConsent(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        // Removido console.error
        // El timestamp ya se guardó, así que el rate limit sigue activo incluso si falla
        setStatus("error");
        setErrors({ 
          _general: locale === "es" 
            ? "Error al enviar el mensaje. Por favor intenta de nuevo." 
            : "Error sending message. Please try again." 
        });
      }
    } catch (error) {
      // Removido console.error
      setStatus("error");
      setErrors({ 
        _general: locale === "es" 
          ? "Error de conexión. Por favor verifica tu conexión." 
          : "Connection error. Please check your connection." 
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const fieldName = e.target.name as keyof typeof formData;
    
    // Aplicar límites de longitud en tiempo real
    let sanitizedValue = value;
    if (fieldName === "name" && value.length > MAX_NAME_LENGTH) {
      sanitizedValue = value.substring(0, MAX_NAME_LENGTH);
    } else if (fieldName === "email" && value.length > MAX_EMAIL_LENGTH) {
      sanitizedValue = value.substring(0, MAX_EMAIL_LENGTH);
    } else if (fieldName === "message" && value.length > MAX_MESSAGE_LENGTH) {
      sanitizedValue = value.substring(0, MAX_MESSAGE_LENGTH);
    }

    setFormData({
      ...formData,
      [fieldName]: sanitizedValue,
    });

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[fieldName]) {
      setErrors({
        ...errors,
        [fieldName]: undefined,
      });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      aria-label={t.contact.form.title}
      noValidate
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t.contact.form.name}
          <span className="sr-only"> ({locale === "es" ? "requerido" : "required"})</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-required="true"
          maxLength={MAX_NAME_LENGTH}
          placeholder={t.contact.form.namePlaceholder}
          className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black bg-white ${
            errors.name ? "border-red-500" : "border-gray-300 focus:border-black"
          }`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t.contact.form.email}
          <span className="sr-only"> ({locale === "es" ? "requerido" : "required"})</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-required="true"
          autoComplete="email"
          maxLength={MAX_EMAIL_LENGTH}
          placeholder={t.contact.form.emailPlaceholder}
          className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black bg-white ${
            errors.email ? "border-red-500" : "border-gray-300 focus:border-black"
          }`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {t.contact.form.message}
          <span className="sr-only"> ({locale === "es" ? "requerido" : "required"})</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-required="true"
          rows={6}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder={t.contact.form.messagePlaceholder}
          className={`w-full px-4 py-3 border-2 focus:outline-none transition-colors text-black bg-white resize-none ${
            errors.message ? "border-red-500" : "border-gray-300 focus:border-black"
          }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        <div className="mt-1 flex justify-between">
          {errors.message && (
            <p id="message-error" className="text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          )}
          <p className={`text-sm ml-auto ${formData.message.length > MAX_MESSAGE_LENGTH * 0.9 ? "text-gray-600" : "text-gray-400"}`}>
            {formData.message.length} / {MAX_MESSAGE_LENGTH}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            aria-required="true"
            className="mt-1 w-4 h-4 border-2 border-gray-300 focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm text-black"
          />
          <label
            htmlFor="consent"
            className="text-sm text-gray-700 leading-relaxed"
          >
            {t.contact.form.consent.text}{" "}
            <Link
              href={`/${locale}/privacy`}
              className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.contact.form.consent.link}
            </Link>
            <span className="sr-only"> ({locale === "es" ? "requerido" : "required"})</span>
          </label>
        </div>
      </div>

      {status === "success" && (
        <div 
          className="p-4 bg-gray-100 border-2 border-gray-300 text-gray-700"
          role="status"
          aria-live="polite"
        >
          {t.contact.form.success}
        </div>
      )}

      {status === "error" && (
        <div 
          className="p-4 bg-gray-100 border-2 border-gray-300 text-gray-700"
          role="alert"
          aria-live="assertive"
        >
          {errors._general?.includes("espera") || errors._general?.includes("wait") 
            ? (locale === "es" 
                ? `Por favor espera antes de enviar nuevamente. Tiempo restante: ${formatTimeRemaining(timeRemaining)}`
                : `Please wait before submitting again. Time remaining: ${formatTimeRemaining(timeRemaining)}`)
            : (errors._general || t.contact.form.error)}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !consent || timeRemaining > 0}
        className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
      </button>
    </form>
  );
}

