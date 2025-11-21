interface ValueCardProps {
  title: string;
  description: string;
  metric?: string;
}

interface ValueGridProps {
  items: ValueCardProps[];
}

export default function ValueGrid({ items }: ValueGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">{item.metric ?? "Impact"}</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-base text-slate-300">{item.description}</p>
        </article>
      ))}
    </div>
  );
}
