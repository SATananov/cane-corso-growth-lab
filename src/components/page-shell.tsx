import type { ReactNode } from "react";
import { AppNavigation } from "@/components/app-navigation";
import { appCopy } from "@/lib/app-copy";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[#090806] text-stone-100">
      <AppNavigation />
      <section className="mx-auto w-full max-w-7xl px-6 py-8">{children}</section>
      <footer className="mx-auto w-full max-w-7xl border-t border-amber-200/10 px-6 py-6 text-sm leading-6 text-stone-500">
        {appCopy.disclaimer}
      </footer>
    </main>
  );
}
