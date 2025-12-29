"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = {
  children: React.ReactNode;
};

export default function ReCaptchaProvider({ children }: Props) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Si no hay site key, renderizar sin reCAPTCHA (modo desarrollo)
  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

