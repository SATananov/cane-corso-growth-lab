export const supportedLanguages = ["en", "bg", "it"] as const;

export type LanguageCode = (typeof supportedLanguages)[number];

export type LanguageOption = {
  code: LanguageCode;
  shortLabel: string;
  nativeLabel: string;
  ariaLabel: string;
};

export const languageOptions: LanguageOption[] = [
  {
    code: "en",
    shortLabel: "EN",
    nativeLabel: "English",
    ariaLabel: "Switch language to English",
  },
  {
    code: "bg",
    shortLabel: "BG",
    nativeLabel: "Български",
    ariaLabel: "Смени езика на български",
  },
  {
    code: "it",
    shortLabel: "IT",
    nativeLabel: "Italiano",
    ariaLabel: "Cambia lingua in italiano",
  },
];

export function isSupportedLanguage(value: string | null): value is LanguageCode {
  return supportedLanguages.includes(value as LanguageCode);
}
