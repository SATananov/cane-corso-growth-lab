import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PageShell } from "@/components/page-shell";
import { UsgLabVisualSystemPanel } from "@/components/usg-lab-visual-system-panel";
import { appCopy } from "@/lib/app-copy";

export const metadata: Metadata = {
  title: "About | Cane Corso Growth Geometry Lab",
  description:
    "Scope, limitations and technology direction for Cane Corso Growth Geometry Lab.",
};

const stack = [
  "Next.js App Router",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Python notebooks",
  "scikit-learn foundation",
];

const boundaries = [
  "No veterinary diagnosis claims",
  "No real owner account system yet",
  "No database in the first version",
  "No external ML API in the first version",
  "Educational growth orientation only",
];

export default function AboutPage() {
  return (
    <PageShell>
      <div className="grid gap-8">
        <PageHero
          eyebrow="About the Lab"
          title="A separate experimental app, not the main platform."
          description="This project is designed as a focused app experiment for Cane Corso growth intelligence. It can grow independently, and later the strongest ideas can inspire a future module in the larger USG ecosystem."
          badge="Separate repo"
        />

        <UsgLabVisualSystemPanel />

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="usg-lab-surface rounded-[2rem] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
              Technology Direction
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-amber-200/15 bg-black/25 px-4 py-2 text-sm text-amber-100/85"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="usg-lab-surface rounded-[2rem] p-6">
            <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
              Product Boundaries
            </p>
            <div className="mt-5 grid gap-3">
              {boundaries.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-stone-700 bg-black/25 p-4 text-sm text-stone-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="usg-lab-surface rounded-[2rem] p-6">
          <p className="text-sm font-semibold text-amber-100">Important note</p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-stone-300">
            {appCopy.disclaimer}
          </p>
        </section>
      </div>
    </PageShell>
  );
}
