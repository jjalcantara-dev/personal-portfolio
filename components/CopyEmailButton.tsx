"use client";

import { useEffect, useRef, useState } from "react";
import { clr } from "@/lib/constants/colors";

type Props = {
  email: string;
  copyLabel: string;
  copiedLabel: string;
  /** Accessible name of the button, e.g. "Copiar email". */
  ariaLabel: string;
};

// Copies the email to the clipboard. Sits above the row's mailto link (z-10),
// so clicking it copies instead of opening the mail app.
export default function CopyEmailButton({ email, copyLabel, copiedLabel, ariaLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // No Clipboard API (old browser or insecure context): copy via a hidden field.
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "absolute";
      field.style.left = "-9999px";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={ariaLabel}
        className={`relative z-10 inline-flex items-center gap-1 min-h-[24px] px-2 py-0.5 rounded-full border text-[11px] font-medium leading-none transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 ${
          copied ? "border-emerald-700 text-emerald-700" : `${clr.border.muted} ${clr.text.muted} hover:border-black hover:text-black`
        }`}
      >
        {copied ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
        )}
        {copied ? copiedLabel : copyLabel}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
