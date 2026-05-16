import { growthClusterProfiles } from "@/lib/ml/growth-clustering";

export function GrowthClusterOverview() {
  return (
    <section className="rounded-[2rem] border border-amber-200/10 bg-white/[0.035] p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-amber-300/70">
        Growth Profile Groups
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        Similar growth profiles become groups.
      </h2>
      <p className="mt-4 max-w-3xl text-base leading-7 text-stone-400">
        Unsupervised learning is represented as a growth-profile grouping layer.
        The app compares a dog point to reference centroids and explains the
        closest group without turning it into a diagnosis.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {growthClusterProfiles.map((profile) => (
          <article key={profile.id} className="rounded-3xl border border-stone-700 bg-black/25 p-5">
            <div className="mb-4 inline-flex rounded-full border border-amber-200/15 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100">
              {profile.shortLabel}
            </div>
            <h3 className="text-lg font-semibold text-white">{profile.label}</h3>
            <p className="mt-3 text-sm leading-6 text-stone-400">{profile.description}</p>
            <p className="mt-4 text-xs leading-5 text-stone-500">{profile.ownerMeaning}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
