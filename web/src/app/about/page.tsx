import SectionTitle from "@/components/common/SectionTitle";
import ValueGrid from "@/components/sections/ValueGrid";

const milestones = [
  {
    year: "2022",
    summary: "Prototype",
    detail: "We piloted the first cohort with 40 learners across Nairobi and Kigali to validate mentor matching.",
  },
  {
    year: "2023",
    summary: "Regional launch",
    detail: "Expanded to five East African hubs and layered analytics on top of every session.",
  },
  {
    year: "2024",
    summary: "Communities",
    detail: "Introduced peer squads, async challenges, and a growing library of project templates.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 lg:px-0">
      <SectionTitle
        eyebrow="Our story"
        title="We help ambitious peers teach each other faster than traditional classrooms."
        description="Every feature inside the platform is shaped by community feedback—mentor scorecards, cohort insights, and session rituals."
        align="center"
      />

      <ValueGrid
        items={[
          {
            title: "Mentors across 12 countries",
            description: "Engineers, designers, and product leaders share lived experience with early career talent.",
            metric: "Network",
          },
          {
            title: "Learning that compounds",
            description: "Structured sprints, retros, and feedback loops ensure every pairing session leaves artifacts behind.",
            metric: "Method",
          },
        ]}
      />

      <section className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <SectionTitle
          eyebrow="Milestones"
          title="From pilot to thriving peer-learning flywheel"
          description="Here is how the platform matured over the last three years."
        />
        <div className="mt-10 space-y-6">
          {milestones.map((milestone) => (
            <div
              key={milestone.year}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/30 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-indigo-300">{milestone.year}</p>
                <h3 className="text-xl font-semibold text-white">{milestone.summary}</h3>
              </div>
              <p className="text-slate-300 md:max-w-xl">{milestone.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
