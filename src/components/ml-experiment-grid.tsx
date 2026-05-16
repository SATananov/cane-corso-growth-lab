const experiments = [
  {
    title: "Linear Regression",
    tag: "Line",
    description:
      "A simple model for estimating weight from age and explaining the first coordinate relationship.",
  },
  {
    title: "Polynomial Regression",
    tag: "Curve",
    description:
      "A better fit for growth because puppies do not grow in a perfectly straight line.",
  },
  {
    title: "Multi-Feature Regression",
    tag: "Surface",
    description:
      "A model direction that can combine age, height, sex and reference adult weight.",
  },
  {
    title: "Classification Zones",
    tag: "Boundary",
    description:
      "A review signal that separates calmer points from points that need closer owner attention.",
  },
  {
    title: "Clustering Concept",
    tag: "Groups",
    description:
      "A future experiment for finding similar growth profiles without pre-defined labels.",
  },
  {
    title: "Coordinate Story",
    tag: "Geometry",
    description:
      "The project idea: dog as point, growth as trajectory, model as line, curve or boundary.",
  },
];

export function MlExperimentGrid() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {experiments.map((experiment) => (
        <article
          key={experiment.title}
          className="rounded-[1.5rem] border border-amber-200/10 bg-black/25 p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold text-white">{experiment.title}</h3>
            <span className="rounded-full border border-amber-200/15 px-3 py-1 text-xs font-semibold text-amber-100/80">
              {experiment.tag}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-stone-400">
            {experiment.description}
          </p>
        </article>
      ))}
    </section>
  );
}
