import type { LanguageCode } from "@/lib/i18n/languages";

const phraseCopy: Record<string, Partial<Record<Exclude<LanguageCode, "en">, string>>> = {
  "Balanced growth arc": { bg: "Балансирана крива на растеж", it: "Arco di crescita bilanciato" },
  Balanced: { bg: "Балансиран", it: "Bilanciato" },
  "A calm profile close to the educational reference curve, with body condition near the middle of the scale.": {
    bg: "Спокоен профил близо до образователната референтна крива, с телесно състояние около средата на скалата.",
    it: "Profilo calmo vicino alla curva educativa di riferimento, con condizione corporea vicina al centro della scala.",
  },
  "The dog is near the reference growth path. Continue tracking the trajectory instead of judging by one point.": {
    bg: "Кучето е близо до референтната траектория на растеж. Продължи да следиш кривата, вместо да съдиш само по една точка.",
    it: "Il cane è vicino al percorso di crescita di riferimento. Continua a seguire la traiettoria invece di giudicare un solo punto.",
  },
  "Compact / later growth profile": { bg: "Компактен / по-късен растеж", it: "Profilo compatto / crescita più tardiva" },
  Compact: { bg: "Компактен", it: "Compatto" },
  "A profile that sits below the reference curve but can still be educationally explainable when monitored over time.": {
    bg: "Профил под референтната крива, който може да бъде образователно обясним, ако се следи във времето.",
    it: "Profilo sotto la curva di riferimento, ancora spiegabile in modo educativo se monitorato nel tempo.",
  },
  "This signal is useful for observation. More repeated measurements are needed before making any conclusion.": {
    bg: "Сигналът е полезен за наблюдение. Нужни са повторни измервания преди заключение.",
    it: "Il segnale è utile per l’osservazione. Servono misure ripetute prima di concludere.",
  },
  "Power growth profile": { bg: "Силен профил на растеж", it: "Profilo di crescita potente" },
  Power: { bg: "Силен", it: "Potente" },
  "A heavier profile above the reference curve, often driven by high weight ratio or strong curve difference.": {
    bg: "По-тежък профил над референтната крива, често заради висок weight ratio или по-силна разлика от кривата.",
    it: "Profilo più pesante sopra la curva di riferimento, spesso guidato da rapporto peso alto o forte differenza dalla curva.",
  },
  "A strong growth point should still be reviewed calmly together with body condition and activity level.": {
    bg: "Силната точка на растеж пак трябва да се прегледа спокойно заедно с телесното състояние и активността.",
    it: "Un punto di crescita forte va comunque rivisto con calma insieme a condizione corporea e livello di attività.",
  },
  "Condition review profile": { bg: "Профил за преглед на кондицията", it: "Profilo revisione condizione" },
  Review: { bg: "Преглед", it: "Revisione" },
  "A profile where body condition deviation has more influence than the age/weight curve itself.": {
    bg: "Профил, при който отклонението в телесното състояние влияе повече от самата крива възраст/тегло.",
    it: "Profilo in cui la deviazione della condizione corporea pesa più della curva età/peso stessa.",
  },
  "The strongest signal comes from body condition. The app stays educational and suggests owner review, not diagnosis.": {
    bg: "Най-силният сигнал идва от телесното състояние. Приложението остава образователно и предлага преглед от стопанина, не диагноза.",
    it: "Il segnale più forte viene dalla condizione corporea. L’app resta educativa e suggerisce revisione del proprietario, non diagnosi.",
  },
  "Balanced arc": { bg: "Балансирана крива", it: "Arco bilanciato" },
  "Compact profile": { bg: "Компактен профил", it: "Profilo compatto" },
  "Power profile": { bg: "Силен профил", it: "Profilo potente" },
  "Early puppy": { bg: "Ранно кученце", it: "Cucciolo giovane" },
  Adolescent: { bg: "Подрастващо", it: "Adolescente" },
  "Ridge Regression Growth Curve": { bg: "Ridge Regression крива на растеж", it: "Curva crescita Ridge Regression" },
  "Random Forest Review Signal": { bg: "Random Forest сигнал за преглед", it: "Segnale revisione Random Forest" },
  "Growth Profile Centroid Bridge": { bg: "Връзка към центроиди на профили", it: "Bridge centroidi profili crescita" },
  "Track parameters, metrics and artifacts for each experiment.": {
    bg: "Проследява параметри, метрики и артефакти за всеки експеримент.",
    it: "Traccia parametri, metriche e artefatti per ogni esperimento.",
  },
  "Separate methodology runs from app-bridge candidates.": {
    bg: "Разделя методологичните експерименти от кандидатите за връзка с приложението.",
    it: "Separa le run metodologiche dai candidati per il bridge app.",
  },
  "Never treat a project run as an official veterinary model.": {
    bg: "Никога не третира проектен run като официален ветеринарен модел.",
    it: "Non tratta mai una run di progetto come modello veterinario ufficiale.",
  },
  "Keep the exported model bridge small enough for a browser app.": {
    bg: "Държи експортирания model bridge достатъчно лек за browser app.",
    it: "Mantiene il model bridge esportato abbastanza leggero per un’app browser.",
  },
  "Notebook-ready": { bg: "Готово за notebook", it: "Pronto per notebook" },
  "Needs image dataset": { bg: "Нужен е image dataset", it: "Richiede dataset immagini" },
  Planned: { bg: "Планирано", it: "Pianificato" },
  "Formula-ready": { bg: "Готово като формула", it: "Pronto come formula" },
  "Needs reference images": { bg: "Нужни са референтни снимки", it: "Richiede immagini riferimento" },
  "Needs trained model": { bg: "Нужен е обучен модел", it: "Richiede modello addestrato" },
  "Needs labelled images": { bg: "Нужни са етикетирани снимки", it: "Richiede immagini etichettate" },
  "Target": { bg: "Целеви клас", it: "Classe target" },
  "Similar breed": { bg: "Сходна порода", it: "Razza simile" },
  "Negative": { bg: "Негативен клас", it: "Classe negativa" },
  "Quality gate": { bg: "Проверка за качество", it: "Controllo qualità" },
};

export function localizeMlPhrase(text: string, language: LanguageCode) {
  if (language === "en") {
    return text;
  }

  return phraseCopy[text]?.[language] ?? text;
}
