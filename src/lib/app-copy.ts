import { dictionaries } from "@/lib/i18n/dictionaries";

export const appCopy = dictionaries.en.app;

export const appNavigation = [
  {
    key: "home" as const,
    href: "/",
  },
  {
    key: "calculator" as const,
    href: "/calculator",
  },
  {
    key: "data" as const,
    href: "/data",
  },
  {
    key: "experiments" as const,
    href: "/experiments",
  },
  {
    key: "course" as const,
    href: "/course",
  },
  {
    key: "about" as const,
    href: "/about",
  },
];

export type AppNavigationKey = (typeof appNavigation)[number]["key"];
