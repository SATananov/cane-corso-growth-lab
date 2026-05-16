import type { DogGrowthInput } from "@/lib/growth-model";
import type { LanguageCode } from "@/lib/i18n/languages";

export type DemoDogProfile = {
  id: string;
  input: DogGrowthInput;
  localized: Record<LanguageCode, {
    name: string;
    role: string;
    summary: string;
    geometryNote: string;
    modelUse: string;
    tags: string[];
  }>;
};

export const demoDogSelectorCopy: Record<LanguageCode, {
  eyebrow: string;
  title: string;
  description: string;
  activeLabel: string;
  loadLabel: string;
  customLabel: string;
  simulatedBadge: string;
}> = {
  en: {
    eyebrow: "Demo Mode",
    title: "Load sample Cane Corso profiles.",
    description:
      "Use simulated profiles to test how the calculator, clustering, PCA map and explainability panels react to different growth scenarios.",
    activeLabel: "Active demo",
    loadLabel: "Load profile",
    customLabel: "Custom input",
    simulatedBadge: "simulated",
  },
  bg: {
    eyebrow: "Демо режим",
    title: "Зареди примерни Cane Corso профили.",
    description:
      "Използвай симулирани профили, за да тестваш как калкулаторът, clustering, PCA картата и explainability панелите реагират на различни сценарии на растеж.",
    activeLabel: "Активно демо",
    loadLabel: "Зареди профил",
    customLabel: "Ръчен вход",
    simulatedBadge: "симулирано",
  },
  it: {
    eyebrow: "Modalità demo",
    title: "Carica profili Cane Corso di esempio.",
    description:
      "Usa profili simulati per testare come calculator, clustering, mappa PCA e pannelli di explainability reagiscono a diversi scenari di crescita.",
    activeLabel: "Demo attiva",
    loadLabel: "Carica profilo",
    customLabel: "Input manuale",
    simulatedBadge: "simulato",
  },
};

export const demoDogProfiles: DemoDogProfile[] = [
  {
    id: "mark-i-balanced-growth",
    input: {
      name: "MARK I",
      sex: "male",
      ageMonths: 6,
      weightKg: 34,
      heightCm: 58,
      bodyConditionScore: 5,
      adultReferenceWeightKg: 50,
    },
    localized: {
      en: {
        name: "MARK I — balanced growth",
        role: "Balanced reference puppy",
        summary:
          "A calm middle-zone profile for showing the default growth curve, confidence signal and educational report.",
        geometryNote:
          "The point should sit close to the reference curve and act as the baseline for comparison.",
        modelUse:
          "Useful for demonstrating regression, feature vector completeness and a balanced cluster assignment.",
        tags: ["baseline", "balanced", "regression"],
      },
      bg: {
        name: "MARK I — балансиран растеж",
        role: "Балансиран референтен профил",
        summary:
          "Спокоен среден профил за показване на growth curve, confidence signal и образователния report.",
        geometryNote:
          "Точката трябва да стои близо до референтната крива и да служи като база за сравнение.",
        modelUse:
          "Подходящ за демонстрация на regression, пълен feature vector и балансиран cluster сигнал.",
        tags: ["baseline", "баланс", "regression"],
      },
      it: {
        name: "MARK I — crescita bilanciata",
        role: "Profilo cucciolo di riferimento",
        summary:
          "Un profilo centrale e stabile per mostrare curva di crescita, confidence signal e report educativo.",
        geometryNote:
          "Il punto dovrebbe restare vicino alla curva di riferimento e funzionare come baseline di confronto.",
        modelUse:
          "Utile per dimostrare regression, completezza del feature vector e assegnazione cluster bilanciata.",
        tags: ["baseline", "bilanciato", "regression"],
      },
    },
  },
  {
    id: "thor-power-profile",
    input: {
      name: "THOR",
      sex: "male",
      ageMonths: 8,
      weightKg: 45,
      heightCm: 63,
      bodyConditionScore: 6,
      adultReferenceWeightKg: 58,
    },
    localized: {
      en: {
        name: "THOR — power growth profile",
        role: "Heavier male trajectory",
        summary:
          "A stronger growth point for testing above-curve signals without framing the result as a diagnosis.",
        geometryNote:
          "The point is expected to move higher in the coordinate map and closer to the power-growth cluster.",
        modelUse:
          "Useful for demonstrating curve delta, clustering distance and PCA projection movement.",
        tags: ["power", "cluster", "PCA"],
      },
      bg: {
        name: "THOR — силов профил на растеж",
        role: "По-тежка мъжка траектория",
        summary:
          "По-силен growth point за тестване на above-curve сигнали, без резултатът да се представя като диагноза.",
        geometryNote:
          "Точката трябва да се измести по-високо в координатната карта и по-близо до power-growth cluster.",
        modelUse:
          "Подходящ за демонстрация на curve delta, cluster distance и движение в PCA projection.",
        tags: ["power", "cluster", "PCA"],
      },
      it: {
        name: "THOR — profilo crescita potente",
        role: "Traiettoria maschile più pesante",
        summary:
          "Un punto di crescita più forte per testare segnali sopra-curva senza trasformarli in diagnosi.",
        geometryNote:
          "Il punto dovrebbe salire nella mappa coordinata e avvicinarsi al cluster power-growth.",
        modelUse:
          "Utile per dimostrare curve delta, distanza dal cluster e movimento nella proiezione PCA.",
        tags: ["power", "cluster", "PCA"],
      },
    },
  },
  {
    id: "hera-adult-reference",
    input: {
      name: "HERA",
      sex: "female",
      ageMonths: 18,
      weightKg: 43,
      heightCm: 61,
      bodyConditionScore: 5,
      adultReferenceWeightKg: 45,
    },
    localized: {
      en: {
        name: "HERA — adult reference",
        role: "Mature female reference",
        summary:
          "A near-adult profile for checking how the model behaves when growth progress is close to complete.",
        geometryNote:
          "The point sits toward the later age range, where small curve differences matter more than puppy acceleration.",
        modelUse:
          "Useful for explaining maturity ratio, adult reference weight and stable classification signals.",
        tags: ["adult", "reference", "maturity"],
      },
      bg: {
        name: "HERA — зрял референтен профил",
        role: "Женски профил близо до зрялост",
        summary:
          "Профил близо до зряла възраст за проверка как моделът работи, когато растежът е почти завършен.",
        geometryNote:
          "Точката стои в по-късната възрастова зона, където малките разлики от кривата са по-важни от puppy acceleration.",
        modelUse:
          "Подходящ за обяснение на maturity ratio, adult reference weight и стабилен classification signal.",
        tags: ["adult", "reference", "maturity"],
      },
      it: {
        name: "HERA — riferimento adulto",
        role: "Riferimento femmina matura",
        summary:
          "Un profilo quasi adulto per verificare come il modello si comporta quando la crescita è quasi completa.",
        geometryNote:
          "Il punto si trova nella fascia di età più avanzata, dove piccole differenze dalla curva contano più dell'accelerazione da cucciolo.",
        modelUse:
          "Utile per spiegare maturity ratio, peso adulto di riferimento e segnali classification stabili.",
        tags: ["adulto", "reference", "maturity"],
      },
    },
  },
  {
    id: "brutus-puppy-trajectory",
    input: {
      name: "BRUTUS",
      sex: "male",
      ageMonths: 4,
      weightKg: 22,
      heightCm: 48,
      bodyConditionScore: 5,
      adultReferenceWeightKg: 52,
    },
    localized: {
      en: {
        name: "BRUTUS — early puppy point",
        role: "Young growth trajectory",
        summary:
          "An earlier-age profile that makes the coordinate map show why one measurement is only the start of a trajectory.",
        geometryNote:
          "The point stays in the early-left area of the map, where future measurements are especially important.",
        modelUse:
          "Useful for showing growth progress, uncertainty and why time-series data would be the future upgrade.",
        tags: ["puppy", "trajectory", "time-series"],
      },
      bg: {
        name: "BRUTUS — ранна puppy точка",
        role: "Млада траектория на растеж",
        summary:
          "Профил в ранна възраст, който показва защо една стойност е само началото на траекторията.",
        geometryNote:
          "Точката остава в ранната лява зона на картата, където бъдещите измервания са особено важни.",
        modelUse:
          "Подходящ за показване на growth progress, uncertainty и защо time-series данни са бъдещ upgrade.",
        tags: ["puppy", "траектория", "time-series"],
      },
      it: {
        name: "BRUTUS — punto cucciolo iniziale",
        role: "Traiettoria giovane di crescita",
        summary:
          "Un profilo di età più precoce che mostra perché una sola misurazione è solo l'inizio di una traiettoria.",
        geometryNote:
          "Il punto resta nella zona iniziale sinistra della mappa, dove le misurazioni future sono particolarmente importanti.",
        modelUse:
          "Utile per mostrare growth progress, uncertainty e perché i dati time-series sarebbero il futuro upgrade.",
        tags: ["cucciolo", "traiettoria", "time-series"],
      },
    },
  },
  {
    id: "luna-review-signal",
    input: {
      name: "LUNA",
      sex: "female",
      ageMonths: 7,
      weightKg: 23,
      heightCm: 51,
      bodyConditionScore: 3,
      adultReferenceWeightKg: 45,
    },
    localized: {
      en: {
        name: "LUNA — review signal example",
        role: "Educational attention scenario",
        summary:
          "A deliberately simulated profile for showing how the app explains a review signal without making medical claims.",
        geometryNote:
          "The point should appear below the calm reference area and trigger a more cautious explanation.",
        modelUse:
          "Useful for demonstrating classification boundary language, owner checklist and safety limits.",
        tags: ["review", "classification", "safety"],
      },
      bg: {
        name: "LUNA — пример за review сигнал",
        role: "Образователен attention сценарий",
        summary:
          "Нарочно симулиран профил, който показва как app-ът обяснява review signal без медицински твърдения.",
        geometryNote:
          "Точката трябва да се появи под спокойната референтна зона и да активира по-внимателно обяснение.",
        modelUse:
          "Подходящ за демонстрация на classification boundary език, owner checklist и safety limits.",
        tags: ["review", "classification", "safety"],
      },
      it: {
        name: "LUNA — esempio segnale review",
        role: "Scenario educativo di attenzione",
        summary:
          "Un profilo simulato apposta per mostrare come l'app spiega un review signal senza fare affermazioni mediche.",
        geometryNote:
          "Il punto dovrebbe apparire sotto l'area di riferimento calma e attivare una spiegazione più cauta.",
        modelUse:
          "Utile per dimostrare linguaggio classification boundary, checklist owner e safety limits.",
        tags: ["review", "classification", "safety"],
      },
    },
  },
];
