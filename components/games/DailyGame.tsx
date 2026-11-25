"use client";

import dynamic from "next/dynamic";
import { getDailyPuzzle } from "@/lib/games";
import type { Locale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { clr } from "@/lib/constants/colors";
import { fill } from "./shared";
import CountdownTimer from "./CountdownTimer";

// Client only: today's puzzle depends on the visitor's clock, not the build date.
const SlidePuzzle = dynamic(() => import("./SlidePuzzle"), { ssr: false });
const BridgesPuzzle = dynamic(() => import("./BridgesPuzzle"), { ssr: false });

export default function DailyGame({ locale }: { locale: Locale }) {
  const t = getContent(locale).puzzles;
  const puzzle = getDailyPuzzle();
  const kind = puzzle.kind === "slide" ? t.slide : t.bridges;

  return (
    <div className="w-full">
      <div className="mb-8">
        <p className={`text-xs font-semibold uppercase tracking-widest ${clr.text.faint} mb-2`}>
          {fill(t.number, { n: puzzle.number })}
        </p>
        <h3 className={`text-2xl sm:text-3xl font-light mb-4 ${clr.text.primary}`}>{kind.title}</h3>
        <ul className={`space-y-1.5 text-sm sm:text-base ${clr.text.body} list-disc pl-5`}>
          {kind.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </div>

      {puzzle.kind === "slide" ? (
        <SlidePuzzle key={puzzle.level.id} level={puzzle.level} locale={locale} />
      ) : (
        <BridgesPuzzle key={puzzle.level.id} level={puzzle.level} locale={locale} />
      )}

      <CountdownTimer locale={locale} />
    </div>
  );
}
