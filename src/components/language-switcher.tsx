"use client";

import { languageOptions } from "@/lib/i18n";
import { useLanguage } from "@/lib/i18n/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage, dictionary } = useLanguage();

  return (
    <div
      className="flex w-fit items-center gap-1 rounded-full border border-amber-200/10 bg-black/25 p-1"
      aria-label={dictionary.nav.languageLabel}
    >
      {languageOptions.map((option) => {
        const isActive = language === option.code;

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            className={`rounded-full border px-3 py-1.5 text-xs font-bold tracking-[0.18em] transition ${
              isActive
                ? "border-amber-200/70 bg-amber-300 text-stone-950 shadow-[0_0_22px_rgba(212,175,55,0.2)]"
                : "border-transparent text-amber-100/70 hover:border-amber-200/20 hover:bg-amber-200/10 hover:text-amber-50"
            }`}
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            title={option.nativeLabel}
          >
            {option.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
