import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-fg">
          {eyebrow}
        </span>
      )}
      <h2 className="text-display-2 max-w-3xl">{title}</h2>
      {description && (
        <p className="max-w-2xl text-base text-muted-1 md:text-lg">{description}</p>
      )}
    </div>
  );
}