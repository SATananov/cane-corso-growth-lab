"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

type OwnerJourneyCard = { label: string; text: string };
type OwnerJourneyStep = { title: string; text: string };

const ownerJourneyCopy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  quickTitle: string;
  quickCards: OwnerJourneyCard[];
  primaryAction: string;
  secondaryAction: string;
  evidenceAction: string;
  steps: OwnerJourneyStep[];
  resultTitle: string;
  resultCards: OwnerJourneyCard[];
  safetyTitle: string;
  safetyText: string;
}> = {
  en: {
    eyebrow: "Owner path",
    title: "Have a Cane Corso? Start here.",
    description:
      "This is the simple owner path: enter the dog’s measurements, read an orientation signal, then decide whether to keep tracking, recheck the numbers or ask a professional.",
    quickTitle: "What you should do first",
    quickCards: [
      {
        label: "1. Open the calculator",
        text: "Use the growth check before reading the technical ML pages.",
      },
      {
        label: "2. Enter real measurements",
        text: "Age, sex, weight and height are enough for the first orientation.",
      },
      {
        label: "3. Read the next action",
        text: "The app explains whether the signal looks calm, needs review or deserves attention.",
      },
    ],
    primaryAction: "Start growth check",
    secondaryAction: "Photo guidance",
    evidenceAction: "Model evidence",
    steps: [
      {
        title: "Enter the dog profile",
        text: "Start with one Cane Corso. Use the current age, sex, weight and height. The demo profile is only for exploring the app.",
      },
      {
        title: "Read the signal",
        text: "The calculator returns an orientation signal and explains why the dog is placed in that growth zone.",
      },
      {
        title: "Choose the next step",
        text: "Continue tracking, recheck measurements calmly, or speak with a veterinarian when the signal looks concerning.",
      },
      {
        title: "Open evidence only when needed",
        text: "The experiments and data pages are for checking notebooks, datasets, neural-network metrics and clickable source evidence.",
      },
    ],
    resultTitle: "How to understand the result",
    resultCards: [
      {
        label: "Calm signal",
        text: "The dog appears close to the expected growth pattern. Keep adding measurements over time.",
      },
      {
        label: "Review signal",
        text: "Recheck the entered numbers and compare them with the next measurement before making conclusions.",
      },
      {
        label: "Attention signal",
        text: "This is not a diagnosis. It is a reason to ask a veterinarian or experienced professional for guidance.",
      },
    ],
    safetyTitle: "Safety boundary",
    safetyText:
      "The app is an educational orientation tool. It is not a veterinary diagnosis, it does not certify a Cane Corso, it does not prove pedigree and it does not replace veterinary advice.",
  },
  bg: {
    eyebrow: "Път за собственик",
    title: "Имаш Cane Corso? Започни оттук.",
    description:
      "Това е простият път за собственик: въвеждаш измерванията на кучето, прочиташ ориентировъчен сигнал и решаваш дали да продължиш да следиш, да провериш данните пак или да говориш със специалист.",
    quickTitle: "Какво правиш първо",
    quickCards: [
      {
        label: "1. Отвори калкулатора",
        text: "Започни с проверката на растежа, преди да четеш техническите ML страници.",
      },
      {
        label: "2. Въведи реални измервания",
        text: "Възраст, пол, тегло и височина са достатъчни за първа ориентация.",
      },
      {
        label: "3. Прочети следващото действие",
        text: "Приложението казва дали сигналът е спокоен, за повторна проверка или за внимание.",
      },
    ],
    primaryAction: "Започни проверка на растежа",
    secondaryAction: "Фото указания",
    evidenceAction: "Доказателства за модела",
    steps: [
      {
        title: "Въведи профила на кучето",
        text: "Започни с едно Cane Corso. Използвай текуща възраст, пол, тегло и височина. Демо профилът е само за разглеждане.",
      },
      {
        title: "Прочети сигнала",
        text: "Калкулаторът връща ориентировъчен сигнал и обяснява защо кучето попада в тази зона на растеж.",
      },
      {
        title: "Избери следваща стъпка",
        text: "Продължи да следиш, провери спокойно измерванията пак или говори с ветеринар, когато сигналът изглежда притеснителен.",
      },
      {
        title: "Отвори доказателствата само при нужда",
        text: "Страниците с експерименти и данни са за тетрадки, набори от данни, метрики на невронната мрежа и отваряеми source доказателства.",
      },
    ],
    resultTitle: "Как да разбереш резултата",
    resultCards: [
      {
        label: "Спокоен сигнал",
        text: "Кучето изглежда близо до очаквания модел на растеж. Продължи да добавяш измервания във времето.",
      },
      {
        label: "Сигнал за повторна проверка",
        text: "Провери въведените числа и ги сравни със следващото измерване, преди да правиш изводи.",
      },
      {
        label: "Сигнал за внимание",
        text: "Това не е диагноза. Това е причина да попиташ ветеринар или опитен специалист за насока.",
      },
    ],
    safetyTitle: "Граница на безопасност",
    safetyText:
      "Приложението е образователен ориентир. То не поставя ветеринарна диагноза, не сертифицира Cane Corso, не доказва родословие и не замества ветеринарен съвет.",
  },
  it: {
    eyebrow: "Percorso proprietario",
    title: "Hai un Cane Corso? Inizia da qui.",
    description:
      "Questo è il percorso semplice per il proprietario: inserisci le misure del cane, leggi un segnale orientativo e decidi se continuare il monitoraggio, ricontrollare i dati o parlare con un professionista.",
    quickTitle: "Cosa fare per primo",
    quickCards: [
      {
        label: "1. Apri il calcolatore",
        text: "Usa prima il controllo crescita, poi leggi le pagine tecniche ML solo se servono.",
      },
      {
        label: "2. Inserisci misure reali",
        text: "Età, sesso, peso e altezza bastano per il primo orientamento.",
      },
      {
        label: "3. Leggi il prossimo passo",
        text: "L’app spiega se il segnale è calmo, da rivedere o da trattare con attenzione.",
      },
    ],
    primaryAction: "Inizia controllo crescita",
    secondaryAction: "Guida foto",
    evidenceAction: "Evidenze modello",
    steps: [
      {
        title: "Inserisci il profilo del cane",
        text: "Inizia con un Cane Corso. Usa età, sesso, peso e altezza attuali. Il profilo demo serve solo per esplorare l’app.",
      },
      {
        title: "Leggi il segnale",
        text: "Il calcolatore restituisce un segnale orientativo e spiega perché il cane si trova in quella zona di crescita.",
      },
      {
        title: "Scegli il prossimo passo",
        text: "Continua il monitoraggio, ricontrolla le misure con calma o parla con un veterinario se il segnale sembra preoccupante.",
      },
      {
        title: "Apri le evidenze solo quando servono",
        text: "Le pagine esperimenti e dati servono per notebook, dataset, metriche della rete neurale ed evidenze sorgente apribili.",
      },
    ],
    resultTitle: "Come capire il risultato",
    resultCards: [
      {
        label: "Segnale calmo",
        text: "Il cane appare vicino allo schema di crescita atteso. Continua ad aggiungere misure nel tempo.",
      },
      {
        label: "Segnale da rivedere",
        text: "Ricontrolla i numeri inseriti e confrontali con la prossima misurazione prima di trarre conclusioni.",
      },
      {
        label: "Segnale di attenzione",
        text: "Non è una diagnosi. È un motivo per chiedere indicazioni a un veterinario o a un professionista esperto.",
      },
    ],
    safetyTitle: "Limite di sicurezza",
    safetyText:
      "L’app è uno strumento educativo di orientamento. Non fornisce diagnosi veterinarie, non certifica un Cane Corso, non prova il pedigree e non sostituisce il parere veterinario.",
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
      <div className="relative z-10 grid gap-6 xl:grid-cols-[0.88fr_1.12fr]">
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
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-300">
            {copy.description}
          </p>

          <div className="mt-5 rounded-[1.5rem] border border-amber-200/15 bg-amber-300/10 p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
              {copy.quickTitle}
            </p>
            <div className="mt-3 grid gap-3">
              {copy.quickCards.map((card) => (
                <article key={card.label} className="rounded-2xl border border-amber-200/10 bg-black/20 p-3">
                  <p className="text-sm font-semibold text-white">{card.label}</p>
                  <p className="mt-1 text-sm leading-6 text-stone-300">{card.text}</p>
                </article>
              ))}
            </div>
          </div>

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
