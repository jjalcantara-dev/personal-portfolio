"use client";

import { useState } from "react";
import Link from "next/link";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function ContactForm({ locale }: Props) {
  const t = getContent(locale);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!consent) {
      setStatus("error");
      return;
    }
    
    setStatus("sending");

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    
    if (!formspreeId) {
      console.error("Formspree ID not configured. Please set NEXT_PUBLIC_FORMSPREE_ID in your .env.local file.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Contact from ${formData.name} - jjalcantara.dev`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setConsent(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("Formspree error:", errorData);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          placeholder={t.contact.form.namePlaceholder}
          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-black bg-white"
        />
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
          placeholder={t.contact.form.emailPlaceholder}
          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-black bg-white"
        />
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
          placeholder={t.contact.form.messagePlaceholder}
          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-black bg-white resize-none"
        />
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
          {t.contact.form.error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !consent}
        className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
      </button>
    </form>
  );
}

