interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionTitle({ eyebrow, title, description, align = "left" }: SectionTitleProps) {
  return (
    <div className={`space-y-4 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-semibold text-white">{title}</h2>
      {description && <p className="text-lg text-slate-300">{description}</p>}
    </div>
  );
}
