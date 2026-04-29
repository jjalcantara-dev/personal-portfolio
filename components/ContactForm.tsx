"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { getLastSubmitTime, setLastSubmitTime } from "@/lib/cookies";
import type { FormStatus, FormErrors } from "@/lib/types";
import { clr, focusRing } from "@/lib/constants/colors";

type Props = {
  locale: Locale;
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const RATE_LIMIT_MS = 3600000; // 1 h client-side UX guard

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function sanitize(str: string): string {
  return str.replace(/[\x00-\x1F\x7F]/g, "").replace(/\s+/g, " ").trim();
}

function validateEmail(email: string): boolean {
  return emailRegex.test(email) && email.length <= MAX_EMAIL_LENGTH && email.length >= 3;
}

export default function ContactForm({ locale }: Props) {
  const t = getContent(locale);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  const formatTimeRemaining = (seconds: number): string => {
    if (seconds <= 0) return "";
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return minutes > 0
      ? `${minutes}m ${secs}s`
      : locale === "es" ? `${secs} segundos` : `${secs} seconds`;
  };

  useEffect(() => {
    const lastSubmit = getLastSubmitTime();
    if (lastSubmit > 0) {
      const remaining = Math.max(0, Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 1000));
      setTimeRemaining(remaining);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastSubmit = getLastSubmitTime();
      const remaining = lastSubmit > 0
        ? Math.max(0, Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 1000))
        : 0;
      setTimeRemaining(remaining);
      if (remaining === 0 && status === "error" && errors._general === "rate_limited") {
        setErrors({});
        setStatus("idle");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [status, errors._general]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const cleanName = sanitize(formData.name);
    if (!cleanName) {
      newErrors.name = locale === "es" ? "El nombre es requerido" : "Name is required";
    } else if (cleanName.length > MAX_NAME_LENGTH) {
      newErrors.name = locale === "es" ? `Máximo ${MAX_NAME_LENGTH} caracteres` : `Max ${MAX_NAME_LENGTH} characters`;
    }
    if (!formData.email.trim()) {
      newErrors.email = locale === "es" ? "El email es requerido" : "Email is required";
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = locale === "es" ? "Email inválido" : "Invalid email";
    }
    const cleanMessage = sanitize(formData.message);
    if (!cleanMessage) {
      newErrors.message = locale === "es" ? "El mensaje es requerido" : "Message is required";
    } else if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = locale === "es" ? `Máximo ${MAX_MESSAGE_LENGTH} caracteres` : `Max ${MAX_MESSAGE_LENGTH} characters`;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!consent) {
      setStatus("error");
      setErrors({ _general: locale === "es" ? "Debes aceptar el consentimiento" : "You must accept consent" });
      return;
    }

    const lastSubmit = getLastSubmitTime();
    if (lastSubmit > 0 && Date.now() - lastSubmit < RATE_LIMIT_MS) {
      setStatus("error");
      setErrors({ _general: "rate_limited" });
      return;
    }

    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setLastSubmitTime(Date.now());
    setTimeRemaining(Math.ceil(RATE_LIMIT_MS / 1000));
    setStatus("sending");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: sanitize(formData.name),
          email: formData.email.trim().toLowerCase(),
          message: sanitize(formData.message),
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setConsent(false);
      } else {
        const data = await response.json().catch(() => ({})) as { error?: string; retryAfter?: number };
        if (response.status === 429) {
          setStatus("error");
          setErrors({ _general: "rate_limited" });
        } else {
          setStatus("error");
          setErrors({ _general: locale === "es" ? "Error al enviar el mensaje. Por favor intenta de nuevo." : "Error sending message. Please try again." });
        }
      }
    } catch {
      setStatus("error");
      setErrors({ _general: locale === "es" ? "Error de conexión. Por favor verifica tu conexión." : "Connection error. Please check your connection." });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const limits: Record<string, number> = { name: MAX_NAME_LENGTH, email: MAX_EMAIL_LENGTH, message: MAX_MESSAGE_LENGTH };
    const capped = value.length > (limits[name] ?? Infinity) ? value.substring(0, limits[name]) : value;
    setFormData((prev) => ({ ...prev, [name]: capped }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputBase = `w-full px-4 py-3 border-2 focus:outline-none transition-colors ${clr.text.primary} ${clr.bg.white}`;
  const inputError = clr.border.error;
  const inputNormal = `${clr.border.muted} focus:border-black`;
  const feedbackBox = `p-4 ${clr.bg.subtle} border-2 ${clr.border.muted} ${clr.text.body}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label={t.contact.form.title} noValidate>
      <div>
        <label htmlFor="name" className={`block text-sm font-medium ${clr.text.body} mb-2`}>
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
          className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && <p id="name-error" className={`mt-1 text-sm ${clr.text.error}`} role="alert">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className={`block text-sm font-medium ${clr.text.body} mb-2`}>
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
          className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" className={`mt-1 text-sm ${clr.text.error}`} role="alert">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className={`block text-sm font-medium ${clr.text.body} mb-2`}>
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
          className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        <div className="mt-1 flex justify-between">
          {errors.message && <p id="message-error" className={`text-sm ${clr.text.error}`} role="alert">{errors.message}</p>}
          <p className={`text-sm ml-auto ${formData.message.length > MAX_MESSAGE_LENGTH * 0.9 ? clr.text.muted : clr.text.faint}`}>
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
            className={`mt-1 w-4 h-4 border-2 ${clr.border.muted} focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm ${clr.text.primary}`}
          />
          <label htmlFor="consent" className={`text-sm ${clr.text.body} leading-relaxed`}>
            {t.contact.form.consent.text}{" "}
            <Link href={`/${locale}/privacy`} className={`underline hover:text-black ${focusRing}`} target="_blank" rel="noopener noreferrer">
              {t.contact.form.consent.link}
            </Link>
            <span className="sr-only"> ({locale === "es" ? "requerido" : "required"})</span>
          </label>
        </div>
      </div>

      {status === "success" && (
        <div className={feedbackBox} role="status" aria-live="polite">
          {t.contact.form.success}
        </div>
      )}

      {status === "error" && errors._general !== "rate_limited" && (
        <div className={feedbackBox} role="alert" aria-live="assertive">
          {errors._general || t.contact.form.error}
        </div>
      )}

      {timeRemaining > 0 && (
        <div className={feedbackBox} role="status" aria-live="polite">
          {locale === "es"
            ? `Por seguridad, el formulario tiene un límite de 3 envíos por hora. Podrás enviar otro mensaje en ${formatTimeRemaining(timeRemaining)}.`
            : `For security reasons, the form is limited to 3 submissions per hour. You can send another message in ${formatTimeRemaining(timeRemaining)}.`}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !consent || timeRemaining > 0}
        className={`w-full sm:w-auto px-8 py-3.5 ${clr.bg.primary} ${clr.text.white} text-sm font-medium hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
      </button>
    </form>
  );
}
