'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { getContent } from '@/lib/content';
import { clr, focusRing } from '@/lib/constants/colors';

interface CookieBannerProps {
  locale: Locale;
}

export default function CookieBanner({ locale }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = getContent(locale);

  useEffect(() => {
    const cookieBannerDismissed = localStorage.getItem('cookie_banner_dismissed');
    if (!cookieBannerDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.paddingBottom = '120px';
    } else {
      document.body.style.paddingBottom = '0';
    }

    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('cookie_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-14 sm:bottom-0 left-0 right-0 ${clr.bg.white} border-t-2 ${clr.border.muted} shadow-lg z-50 px-4 py-4 sm:py-5`}
      role="region"
      aria-label={locale === 'es' ? 'Información sobre cookies' : 'Cookie information'}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className={`text-sm sm:text-base ${clr.text.body} leading-relaxed`}>
            {locale === 'es' ? (
              <>
                Este sitio web utiliza una{' '}
                <strong>cookie técnica esencial</strong> para prevenir el envío masivo de mensajes
                a través del formulario de contacto. Esta cookie no requiere consentimiento según el
                RGPD. Puede obtener más información en nuestra{' '}
                <Link
                  href={`/${locale}/privacy`}
                  className={`underline hover:text-black ${focusRing}`}
                >
                  Política de Privacidad
                </Link>
                .
              </>
            ) : (
              <>
                This website uses an <strong>essential technical cookie</strong> to prevent mass
                submission of messages through the contact form. This cookie does not require
                consent under GDPR. You can learn more in our{' '}
                <Link
                  href={`/${locale}/privacy`}
                  className={`underline hover:text-black ${focusRing}`}
                >
                  Privacy Policy
                </Link>
                .
              </>
            )}
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className={`px-6 py-2.5 ${clr.bg.primary} ${clr.text.white} text-sm font-medium hover:bg-gray-900 transition-colors ${focusRing} whitespace-nowrap`}
          aria-label={locale === 'es' ? 'Cerrar' : 'Close'}
        >
          {locale === 'es' ? 'Entendido' : 'Got it'}
        </button>
      </div>
    </div>
  );
}
