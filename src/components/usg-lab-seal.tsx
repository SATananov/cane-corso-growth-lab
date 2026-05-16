type UsgLabSealProps = {
  variant?: "compact" | "large";
  className?: string;
};

export function UsgLabSeal({ variant = "compact", className = "" }: UsgLabSealProps) {
  const isLarge = variant === "large";

  return (
    <div
      className={`relative grid shrink-0 place-items-center rounded-full border border-amber-300/25 bg-amber-300/[0.08] shadow-[0_0_55px_rgba(212,175,55,0.12)] ${
        isLarge ? "h-28 w-28" : "h-14 w-14"
      } ${className}`}
      aria-label="USG Lab seal"
    >
      <div className="absolute inset-2 rounded-full border border-amber-100/10" />
      <div className="absolute inset-4 rounded-full border border-amber-300/20" />
      <div className="text-center leading-none">
        <p className={`${isLarge ? "text-2xl" : "text-sm"} font-semibold tracking-[0.16em] text-amber-100`}>
          USG
        </p>
        <p className={`${isLarge ? "mt-2 text-[0.62rem]" : "mt-1 text-[0.48rem]"} uppercase tracking-[0.24em] text-amber-300/70`}>
          Lab
        </p>
      </div>
    </div>
  );
}
