"use client";

import {
  photoComparisonCriteria,
  visualPhotoViewGuides,
  type VisualPhotoViewType,
} from "@/lib/ml/photo-comparison-criteria";
import { useLanguage } from "@/lib/i18n/language-context";
import type { LanguageCode } from "@/lib/i18n/languages";

const photoGuideCopy: Record<
  LanguageCode,
  {
    badge: string;
    mustShow: string;
    avoid: string;
    views: Record<
      VisualPhotoViewType,
      {
        label: string;
        purpose: string;
        comparisonUse: string;
        mustShow: string[];
        avoid: string[];
      }
    >;
    criteria: Record<string, { title: string; description: string }>;
  }
> = {
  en: {
    badge: "Photo first",
    mustShow: "Must show",
    avoid: "Avoid",
    views: {
      side_body: {
        label: "Side body",
        purpose: "Primary image for body geometry and full silhouette comparison.",
        comparisonUse:
          "Used for height, body length, chest depth, stance and rectangular-format review.",
        mustShow: [
          "Full dog visible from nose to tail base and paws",
          "Dog standing naturally on a flat surface",
          "Camera close to shoulder/chest height",
          "Clear side angle with minimal perspective distortion",
          "Good light and unobstructed body outline",
        ],
        avoid: [
          "Dog sitting, jumping or turning",
          "Photo taken strongly from above or below",
          "Cut paws, hidden chest, hidden back or cropped body",
          "Extreme wide-angle lens distortion",
        ],
      },
      front_body: {
        label: "Front body",
        purpose: "Secondary image for front stance and chest-width orientation.",
        comparisonUse:
          "Used for front balance, chest impression and symmetry signals only.",
        mustShow: [
          "Dog facing the camera while standing",
          "Head, chest and front legs clearly visible",
          "Camera centered and not tilted",
          "Balanced light on both sides",
        ],
        avoid: [
          "Dog angled sideways",
          "One side of the body hidden",
          "Strong shadows that hide chest or legs",
          "Close-up head-only framing",
        ],
      },
      head_profile: {
        label: "Head profile",
        purpose: "Head-geometry image for muzzle/skull relation and profile review.",
        comparisonUse:
          "Used for muzzle-to-skull orientation, stop impression and head profile only.",
        mustShow: [
          "Full head visible from side profile",
          "Muzzle, stop, skull and neck outline readable",
          "Natural head position, not tilted upward or downward",
          "Good light on the facial outline",
        ],
        avoid: [
          "Open-mouth distortion when measuring muzzle impression",
          "Extreme close-up crop",
          "Head rotated toward the camera",
          "Blurred face or hidden muzzle",
        ],
      },
      head_front: {
        label: "Head front",
        purpose: "Head-front image for width, expression and broad-head impression.",
        comparisonUse:
          "Used as supporting visual evidence, not as the main body-proportion comparison.",
        mustShow: [
          "Head facing forward",
          "Both eyes and muzzle visible",
          "No strong camera tilt",
          "Clear expression and facial outline",
        ],
        avoid: [
          "Side profile when front head review is selected",
          "Very close lens distortion",
          "Hidden eyes, cropped ears or cropped muzzle",
          "Low-light image with poor head contrast",
        ],
      },
    },
    criteria: {
      full_visibility: {
        title: "Full required anatomy is visible",
        description:
          "The body or head region needed for the selected review type must be fully visible and not cropped.",
      },
      correct_angle: {
        title: "Correct camera angle",
        description:
          "The image must match the selected view type: side body, front body, head profile or head front.",
      },
      natural_stance: {
        title: "Natural standing position",
        description:
          "Body comparison needs a standing dog. Sitting, jumping or turning makes body geometry unreliable.",
      },
      low_perspective_distortion: {
        title: "Low perspective distortion",
        description:
          "The camera should not be too high, too low or too close with a wide-angle lens.",
      },
      clear_light_and_focus: {
        title: "Clear light and focus",
        description:
          "The dog outline, head structure and major proportions must be readable.",
      },
    },
  },
  bg: {
    badge: "Първо снимката",
    mustShow: "Трябва да се вижда",
    avoid: "Избягвай",
    views: {
      side_body: {
        label: "Страничен изглед на тяло",
        purpose: "Основна снимка за геометрия на тялото и пълен силует.",
        comparisonUse:
          "Използва се за височина, дължина на тялото, дълбочина на гърдите, стойка и правоъгълен формат.",
        mustShow: [
          "Цялото куче — от носа до основата на опашката и лапите",
          "Кучето стои естествено върху равна повърхност",
          "Камерата е близо до височината на рамото или гърдите",
          "Чист страничен ъгъл с минимално перспективно изкривяване",
          "Добра светлина и четлив контур на тялото",
        ],
        avoid: [
          "Кучето седи, скача или е обърнато",
          "Снимка силно отгоре или отдолу",
          "Отрязани лапи, скрити гърди, гръб или тяло",
          "Силно широкоъгълно изкривяване",
        ],
      },
      front_body: {
        label: "Фронтален изглед на тяло",
        purpose: "Допълнителна снимка за стойка отпред и ориентация за ширина на гърдите.",
        comparisonUse:
          "Използва се само за баланс отпред, впечатление за гърди и симетрия.",
        mustShow: [
          "Кучето гледа към камерата и стои изправено",
          "Главата, гърдите и предните крака са ясно видими",
          "Камерата е центрирана и не е наклонена",
          "Светлината е балансирана от двете страни",
        ],
        avoid: [
          "Кучето е завъртяно настрани",
          "Едната страна на тялото е скрита",
          "Силни сенки скриват гърдите или краката",
          "Кадър само отблизо на главата",
        ],
      },
      head_profile: {
        label: "Профил на глава",
        purpose: "Снимка за геометрия на глава, муцуна и череп в профил.",
        comparisonUse:
          "Използва се за ориентация на съотношението муцуна/череп, стоп и профил на главата.",
        mustShow: [
          "Цялата глава се вижда в страничен профил",
          "Муцуна, стоп, череп и линия на врата са четливи",
          "Главата е в естествена позиция, без силен наклон",
          "Добра светлина върху лицевия контур",
        ],
        avoid: [
          "Отворена уста, когато се гледа форма на муцуната",
          "Прекалено близък кадър",
          "Главата е завъртяна към камерата",
          "Размазано лице или скрита муцуна",
        ],
      },
      head_front: {
        label: "Глава отпред",
        purpose: "Снимка отпред за ширина, израз и впечатление за масивна глава.",
        comparisonUse:
          "Използва се като подкрепящо визуално доказателство, не като основно сравнение на тялото.",
        mustShow: [
          "Главата гледа напред",
          "Двете очи и муцуната са видими",
          "Няма силен наклон на камерата",
          "Изразът и лицевият контур са четливи",
        ],
        avoid: [
          "Страничен профил вместо фронтален изглед",
          "Много близко изкривяване от обектива",
          "Скрити очи, отрязани уши или муцуна",
          "Слаба светлина и лош контраст на главата",
        ],
      },
    },
    criteria: {
      full_visibility: {
        title: "Видима е нужната анатомия",
        description:
          "Частта от тяло или глава, нужна за избрания преглед, трябва да се вижда изцяло и да не е отрязана.",
      },
      correct_angle: {
        title: "Правилен ъгъл на камерата",
        description:
          "Снимката трябва да отговаря на избрания тип: тяло отстрани, тяло отпред, глава в профил или глава отпред.",
      },
      natural_stance: {
        title: "Естествена изправена стойка",
        description:
          "Сравнението на тяло изисква изправено куче. Седнало, скачащо или обърнато тяло прави геометрията ненадеждна.",
      },
      low_perspective_distortion: {
        title: "Ниско перспективно изкривяване",
        description:
          "Камерата не трябва да е прекалено високо, прекалено ниско или твърде близо с широкоъгълен ефект.",
      },
      clear_light_and_focus: {
        title: "Ясна светлина и фокус",
        description:
          "Контурът на кучето, структурата на главата и основните пропорции трябва да са четливи.",
      },
    },
  },
  it: {
    badge: "Prima la foto",
    mustShow: "Deve mostrare",
    avoid: "Evitare",
    views: {
      side_body: {
        label: "Corpo laterale",
        purpose: "Immagine principale per geometria del corpo e confronto della silhouette completa.",
        comparisonUse:
          "Usata per altezza, lunghezza del corpo, profondità del petto, postura e formato rettangolare.",
        mustShow: [
          "Cane intero visibile dal muso alla base della coda e alle zampe",
          "Cane in posizione naturale su una superficie piana",
          "Fotocamera vicina all’altezza di spalla o petto",
          "Angolo laterale pulito con minima distorsione prospettica",
          "Buona luce e contorno del corpo libero",
        ],
        avoid: [
          "Cane seduto, che salta o girato",
          "Foto scattata molto dall’alto o dal basso",
          "Zampe tagliate, petto, dorso o corpo nascosti",
          "Distorsione estrema da grandangolo",
        ],
      },
      front_body: {
        label: "Corpo frontale",
        purpose: "Immagine secondaria per postura frontale e orientamento della larghezza del petto.",
        comparisonUse:
          "Usata solo per equilibrio frontale, impressione del petto e segnali di simmetria.",
        mustShow: [
          "Cane rivolto verso la fotocamera mentre è in piedi",
          "Testa, petto e zampe anteriori chiaramente visibili",
          "Fotocamera centrata e non inclinata",
          "Luce bilanciata su entrambi i lati",
        ],
        avoid: [
          "Cane angolato lateralmente",
          "Un lato del corpo nascosto",
          "Ombre forti che nascondono petto o zampe",
          "Inquadratura solo della testa da vicino",
        ],
      },
      head_profile: {
        label: "Profilo testa",
        purpose: "Immagine della testa per relazione muso/cranio e revisione del profilo.",
        comparisonUse:
          "Usata per orientamento muso-cranio, impressione dello stop e profilo della testa.",
        mustShow: [
          "Testa completa visibile di profilo",
          "Muso, stop, cranio e collo leggibili",
          "Posizione naturale della testa, senza inclinazione forte",
          "Buona luce sul contorno del volto",
        ],
        avoid: [
          "Bocca aperta quando si valuta l’impressione del muso",
          "Ritaglio estremamente ravvicinato",
          "Testa ruotata verso la fotocamera",
          "Viso sfocato o muso nascosto",
        ],
      },
      head_front: {
        label: "Testa frontale",
        purpose: "Immagine frontale per larghezza, espressione e impressione di testa ampia.",
        comparisonUse:
          "Usata come evidenza visuale di supporto, non come confronto principale delle proporzioni corporee.",
        mustShow: [
          "Testa rivolta in avanti",
          "Entrambi gli occhi e il muso visibili",
          "Nessuna forte inclinazione della fotocamera",
          "Espressione e contorno del volto leggibili",
        ],
        avoid: [
          "Profilo laterale quando serve una vista frontale",
          "Distorsione da lente molto ravvicinata",
          "Occhi nascosti, orecchie o muso tagliati",
          "Scarsa luce con basso contrasto della testa",
        ],
      },
    },
    criteria: {
      full_visibility: {
        title: "Anatomia richiesta visibile",
        description:
          "La regione del corpo o della testa necessaria per il tipo di revisione deve essere completamente visibile e non tagliata.",
      },
      correct_angle: {
        title: "Angolo corretto della fotocamera",
        description:
          "L’immagine deve corrispondere al tipo selezionato: corpo laterale, corpo frontale, profilo testa o testa frontale.",
      },
      natural_stance: {
        title: "Postura naturale in piedi",
        description:
          "Il confronto del corpo richiede un cane in piedi. Seduto, saltando o girato rende la geometria non affidabile.",
      },
      low_perspective_distortion: {
        title: "Bassa distorsione prospettica",
        description:
          "La fotocamera non deve essere troppo alta, troppo bassa o troppo vicina con effetto grandangolare.",
      },
      clear_light_and_focus: {
        title: "Luce e fuoco chiari",
        description:
          "Il contorno del cane, la struttura della testa e le proporzioni principali devono essere leggibili.",
      },
    },
  },
};

export function PhotoGuidePanel() {
  const { dictionary, language } = useLanguage();
  const copy = photoGuideCopy[language];

  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
            {dictionary.visualReview.guide.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {dictionary.visualReview.guide.title}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
            {dictionary.visualReview.guide.description}
          </p>
        </div>
        <div className="rounded-full border border-amber-200/15 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-100">
          {copy.badge}
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {visualPhotoViewGuides.map((guide) => {
          const localizedGuide = copy.views[guide.viewType];

          return (
            <article
              key={guide.viewType}
              className="usg-readable-card rounded-3xl border border-stone-700 bg-black/25 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-amber-300/70">
                {localizedGuide.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {localizedGuide.purpose}
              </h3>
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {localizedGuide.comparisonUse}
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                    {copy.mustShow}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-stone-300">
                    {localizedGuide.mustShow.slice(0, 3).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200/80">
                    {copy.avoid}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-stone-400">
                    {localizedGuide.avoid.slice(0, 2).map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 rounded-3xl border border-amber-200/10 bg-black/25 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300/70">
          {dictionary.visualReview.criteria.title}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {photoComparisonCriteria.map((criterion) => {
            const localizedCriterion = copy.criteria[criterion.id] ?? criterion;

            return (
              <div
                key={criterion.id}
                className="usg-readable-card rounded-2xl border border-stone-700 bg-white/[0.025] p-4"
              >
                <p className="text-sm font-semibold text-white">
                  {localizedCriterion.title}
                </p>
                <p className="mt-2 text-xs leading-5 text-stone-400">
                  {localizedCriterion.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
