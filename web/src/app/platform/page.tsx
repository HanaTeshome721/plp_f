import AuthPanel from "@/components/auth/AuthPanel";
import SectionTitle from "@/components/common/SectionTitle";
import ValueGrid from "@/components/sections/ValueGrid";

const pillars = [
  {
    title: "Mentor OS",
    description: "Searchable mentor directory, availability sync, and feedback summaries per session.",
    metric: "Matching",
  },
  {
    title: "Learning Journeys",
    description: "Sprint templates, goal tracking, and retrospective prompts baked into every cohort.",
    metric: "Cohorts",
  },
  {
    title: "Signals & Insights",
    description: "Real-time dashboards that highlight participation, sentiment, and progression gaps.",
    metric: "Analytics",
  },
  {
    title: "Comms & Community",
    description: "Threaded messages, async challenges, and resource drops to keep learners engaged between sessions.",
    metric: "Community",
  },
];

export default function PlatformPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 px-6 lg:px-0">
      <SectionTitle
        eyebrow="Product tour"
        title="Everything teams need to spin up peer-to-peer mentorship in under a week."
        description="Plug this platform into your stack, connect to MongoDB Atlas or DocumentDB, and customize flows with your branding."
      />

      <ValueGrid items={pillars} />

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <SectionTitle
            eyebrow="Architecture"
            title="Secure, API-first, and extensible"
            description="Next.js App Router consumes the Express API via server actions or client hooks. MongoDB captures profiles, sessions, resources, and contact messages."
          />
          <ul className="mt-6 space-y-4 text-slate-200">
            <li>JWT access tokens stored in memory/localStorage, refresh tokens secured via httpOnly cookies.</li>
            <li>Protected routes use the `/auth/me` endpoint to hydrate dashboards.</li>
            <li>Custom modules (sessions, chats, resources) can reuse the existing Express patterns.</li>
          </ul>
        </div>
        <AuthPanel />
      </section>
    </div>
  );
}
