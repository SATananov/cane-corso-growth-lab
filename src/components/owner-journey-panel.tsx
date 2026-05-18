"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const ownerJourneyCopy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  evidenceAction: string;
  steps: { title: string; text: string }[];
  resultTitle: string;
  resultCards: { label: string; text: string }[];
  safetyTitle: string;
  safetyText: string;
}> = {
  en: {
    eyebrow: "Owner mode",
    title: "What happens if I use the app as an owner?",
    description:
      "Start with one Cane Corso profile, read the growth signal, then open the evidence pages only when you want to understand how the result was produced.",
    primaryAction: "Start with Growth Check",
    secondaryAction: "See visual photo guide",
    evidenceAction: "Open model evidence",
    steps: [
      {
        title: "Enter the profile",
        text: "Use age, sex, weight, height and body-condition score. A demo profile is available when you only want to explore the app.",
      },
      {
        title: "Read the orientation signal",
        text: "The calculator compares the current point with transparent growth geometry and explains the review zone.",
      },
      {
        title: "Check the recommended next step",
        text: "The result tells you whether to continue tracking, review measurements calmly or ask a professional when something looks concerning.",
      },
      {
        title: "Inspect the evidence",
        text: "The methodology pages show the neural-network prototype, datasets, notebooks and clickable evidence cards behind the app.",
      },
    ],
    resultTitle: "How to read the result",
    resultCards: [
      {
        label: "Green / calm signal",
        text: "The profile appears close to the expected growth pattern. Keep tracking measurements over time.",
      },
      {
        label: "Review signal",
        text: "The profile deserves a calmer second look. Recheck the measurements and compare with future entries.",
      },
      {
        label: "Attention signal",
        text: "The app suggests caution, not a diagnosis. Use it as a reason to speak with a veterinarian or experienced professional.",
      },
    ],
    safetyTitle: "Important safety boundary",
    safetyText:
      "The app is an educational orientation tool. It is not a veterinary diagnosis, it does not certify a Cane Corso, it does not prove pedigree and it does not replace veterinary advice.",
  },
  bg: {
    eyebrow: "Режим за собственик",
    title: "Какво става, ако използвам приложението като собственик?",
    description:
      "Започваш с един профил на Cane Corso, прочиташ сигнала за растеж и отваряш доказателствените страници само ако искаш да разбереш как е получен резултатът.",
    primaryAction: "Започни с проверка на растежа",
    secondaryAction: "Виж фото указанията",
    evidenceAction: "Отвори доказателствата",
    steps: [
      {
        title: "Въведи профила",
        text: "Използвай възраст, пол, тегло, височина и телесна оценка. Има демо профил, ако само искаш да разгледаш приложението.",
      },
      {
        title: "Прочети ориентировъчния сигнал",
        text: "Калкулаторът сравнява текущата точка с прозрачна геометрия на растежа и обяснява зоната за преглед.",
      },
      {
        title: "Виж препоръчителната следваща стъпка",
        text: "Резултатът показва дали да продължиш да следиш, да премериш спокойно отново или да потърсиш специалист при притеснителен сигнал.",
      },
      {
        title: "Провери доказателствата",
        text: "Методологичните страници показват невронния прототип, данните, Jupyter тетрадките и отваряемите доказателствени карти зад приложението.",
      },
    ],
    resultTitle: "Как да прочетеш резултата",
    resultCards: [
      {
        label: "Спокоен сигнал",
        text: "Профилът изглежда близо до очаквания модел на растеж. Продължи да следиш измерванията във времето.",
      },
      {
        label: "Сигнал за преглед",
        text: "Профилът заслужава спокоен втори поглед. Провери измерванията и сравни с бъдещи стойности.",
      },
      {
        label: "Сигнал за внимание",
        text: "Приложението предлага повишено внимание, не диагноза. Използвай го като причина да говориш с ветеринар или опитен специалист.",
      },
    ],
    safetyTitle: "Важна граница на безопасност",
    safetyText:
      "Приложението е образователен ориентировъчен инструмент. То не поставя диагноза, не сертифицира Cane Corso, не доказва родословие и не замества ветеринарен съвет.",
  },
  it: {
    eyebrow: "Modalità proprietario",
    title: "Cosa succede se uso l’app come proprietario?",
    description:
      "Si parte da un profilo Cane Corso, si legge il segnale di crescita e si aprono le pagine di evidenza solo quando si vuole capire come è stato prodotto il risultato.",
    primaryAction: "Inizia dal controllo crescita",
    secondaryAction: "Vedi guida foto",
    evidenceAction: "Apri evidenze modello",
    steps: [
      {
        title: "Inserisci il profilo",
        text: "Usa età, sesso, peso, altezza e punteggio corporeo. È disponibile un profilo demo se vuoi solo esplorare l’app.",
      },
      {
        title: "Leggi il segnale orientativo",
        text: "Il calcolatore confronta il punto corrente con una geometria di crescita trasparente e spiega la zona di revisione.",
      },
      {
        title: "Controlla il prossimo passo",
        text: "Il risultato indica se continuare il monitoraggio, ricontrollare le misure con calma o parlare con un professionista in caso di segnale preoccupante.",
      },
      {
        title: "Ispeziona le evidenze",
        text: "Le pagine metodologiche mostrano il prototipo neurale, i dati, i notebook Jupyter e le schede di evidenza apribili dietro l’app.",
      },
    ],
    resultTitle: "Come leggere il risultato",
    resultCards: [
      {
        label: "Segnale calmo",
        text: "Il profilo appare vicino allo schema di crescita atteso. Continua a monitorare le misure nel tempo.",
      },
      {
        label: "Segnale di revisione",
        text: "Il profilo merita un secondo controllo. Ricontrolla le misure e confrontale con valori futuri.",
      },
      {
        label: "Segnale di attenzione",
        text: "L’app suggerisce cautela, non una diagnosi. Usalo come motivo per parlare con un veterinario o un professionista esperto.",
      },
    ],
    safetyTitle: "Limite di sicurezza importante",
    safetyText:
      "L’app è uno strumento educativo di orientamento. Non diagnostica la salute, non certifica un Cane Corso, non prova il pedigree e non sostituisce il parere veterinario.",
  },
};

type OwnerJourneyPanelProps = {
  compact?: boolean;
};

export function OwnerJourneyPanel({ compact = false }: OwnerJourneyPanelProps) {
  const { language } = useLanguage();
  const copy = ownerJourneyCopy[language];

  return (
    <section
      id="owner-journey"
      className="usg-lab-surface rounded-[2rem] p-6"
      aria-labelledby="owner-journey-title"
    >
      <div className="relative z-10 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {copy.eyebrow}
          </p>
          <h2
            id="owner-journey-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl"
          >
            {copy.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/calculator#growth-calculator"
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
            >
              {copy.primaryAction}
            </Link>
            <Link
              href="/visual-review"
              className="rounded-full border border-amber-200/20 px-5 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-200/40 hover:bg-amber-200/10"
            >
              {copy.secondaryAction}
            </Link>
            <Link
              href="/experiments"
              className="rounded-full border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-200 transition hover:border-amber-200/35 hover:bg-white/[0.04]"
            >
              {copy.evidenceAction}
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {copy.steps.map((step, index) => (
            <article
              key={step.title}
              className="usg-readable-card rounded-2xl border border-amber-200/10 bg-black/25 p-4"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-amber-300/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-400">{step.text}</p>
            </article>
          ))}
        </div>
      </div>

      {!compact && (
        <div className="relative z-10 mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-stone-700 bg-black/25 p-5">
            <h3 className="text-xl font-semibold text-white">{copy.resultTitle}</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {copy.resultCards.map((card) => (
                <article
                  key={card.label}
                  className="usg-readable-card rounded-2xl border border-amber-200/10 bg-white/[0.035] p-4"
                >
                  <p className="text-sm font-semibold text-amber-100">{card.label}</p>
                  <p className="mt-2 text-sm leading-6 text-stone-400">{card.text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-amber-200/15 bg-amber-300/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
              {copy.safetyTitle}
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">{copy.safetyText}</p>
          </aside>
        </div>
      )}
    </section>
  );
}
