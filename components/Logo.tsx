import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

type LogoProps = Props & {
  size?: "small" | "medium" | "large" | "xlarge";
};

export default function Logo({ locale, size = "medium" }: LogoProps) {
  const sizeClasses = {
    small: "h-8",
    medium: "h-16 sm:h-18",
    large: "h-24 sm:h-32",
    xlarge: "h-32 sm:h-48",
  };

  const dimensions = {
    small: { width: 40, height: 40 },
    medium: { width: 100, height: 100 },
    large: { width: 128, height: 128 },
    xlarge: { width: 192, height: 192 },
  };

  return (
    <Link 
      href={`/${locale}`} 
      className="inline-block focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
      aria-label="Jesús Jiménez Alcantara - Ir a inicio"
    >
      <Image
        src="/logo_final.svg"
        alt=""
        width={dimensions[size].width}
        height={dimensions[size].height}
        priority
        className={`${sizeClasses[size]} w-auto`}
        aria-hidden="true"
      />
    </Link>
  );
}

