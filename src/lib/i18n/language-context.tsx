"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary } from "@/lib/i18n/dictionaries";
import {
  isSupportedLanguage,
  type LanguageCode,
} from "@/lib/i18n/languages";

const LANGUAGE_STORAGE_KEY = "ccgl-language";
const LANGUAGE_CHANGE_EVENT = "ccgl-language-change";
const DEFAULT_LANGUAGE: LanguageCode = "en";

function readBrowserLanguage(): LanguageCode {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (isSupportedLanguage(storedLanguage)) {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.slice(0, 2);
  if (isSupportedLanguage(browserLanguage)) {
    return browserLanguage;
  }

  return DEFAULT_LANGUAGE;
}

function readServerLanguage(): LanguageCode {
  return DEFAULT_LANGUAGE;
}

function subscribeToLanguageChanges(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === null || event.key === LANGUAGE_STORAGE_KEY) {
      onStoreChange();
    }
  };

  const handleLocalLanguageChange = () => {
    onStoreChange();
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLocalLanguageChange);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLocalLanguageChange);
  };
}

type LanguageContextValue = {
  language: LanguageCode;
  dictionary: Dictionary;
  setLanguage: (language: LanguageCode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguageChanges,
    readBrowserLanguage,
    readServerLanguage,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      dictionary: dictionaries[language] as Dictionary,
      setLanguage,
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
