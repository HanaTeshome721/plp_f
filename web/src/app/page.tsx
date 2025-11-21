import Link from "next/link";
import AuthPanel from "@/components/auth/AuthPanel";

const featureHighlights = [
  {
    title: "Smart Matching",
    description: "Pair learners and mentors using shared skills, goals, and availability.",
  },
  {
    title: "Session Management",
    description: "Plan live sessions, set agendas, track progress, and capture feedback.",
  },
  {
    title: "Community Resources",
    description: "Curate playbooks, project briefs, and async challenges for every cohort.",
  },
];

const heroStats = [
  { label: "Active mentors", value: "480+" },
  { label: "Sessions hosted", value: "12k+" },
  { label: "Avg. rating", value: "4.9/5" },
  { label: "Launch time", value: "< 7 days" },
];

const programTracks = [
  {
    title: "Career switch",
    description: "12-week journeys for professionals pivoting into tech, product, or data roles.",
  },
  {
    title: "Leadership pods",
    description: "Weekly salons for managers to practice coaching, feedback, and decision-making.",
  },
  {
    title: "Maker labs",
    description: "Hands-on build cycles where mentors guide learners through shippable side projects.",
  },
];

const communityHighlights = [
  { title: "Global guilds", detail: "Niche communities for designers, engineers, and PMs sharing rituals." },
  { title: "Signal reports", detail: "Automated recaps summarizing energy, blockers, and wins per cohort." },
  { title: "Resource drops", detail: "Curated templates, briefs, and teardown videos delivered every sprint." },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-6 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <header className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <span className="rounded-full bg-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-200">Live</span>
            Ship a peer learning platform in days, not quarters.
          </div>
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Peer-to-Peer Mentorship</p>
            <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
              Build a trusted mentor network, run sessions, and capture insights in one place.
            </h1>
            <p className="max-w-3xl text-lg text-slate-300">
              Next.js + Tailwind on the front, Express + MongoDB + JWT on the back. Swap in your own cohorts, extend the
              API, and launch production-ready mentorship experiences faster than ever.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/platform"
              className="rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400"
            >
              Launch the platform
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-white/60"
            >
              Talk to the team
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-indigo-400/30 bg-indigo-500/10 p-5 text-sm text-indigo-100">
            <p className="font-semibold">This week’s focus</p>
            <p className="mt-2 text-indigo-100/80">
              Onboard mentors, curate challenges, and celebrate wins. Everything else is automated.
            </p>
            <div className="mt-4 grid gap-3 text-xs uppercase tracking-[0.3em] text-white/80 sm:grid-cols-2">
              <span className="rounded-2xl border border-white/20 px-3 py-2 text-center">Mentor ops</span>
              <span className="rounded-2xl border border-white/20 px-3 py-2 text-center">Learning rituals</span>
            </div>
          </div>
        </header>
        <AuthPanel />
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {featureHighlights.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur"
          >
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-white/10 bg-white/5 p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">Programs</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Designed for every stage of the learning curve</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {programTracks.map((track) => (
            <article key={track.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <h3 className="text-xl font-semibold text-white">{track.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{track.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-white/30 bg-slate-900/60 p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-300">Community</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">What keeps our cohorts energized</h2>
        <div className="mt-8 space-y-4">
          {communityHighlights.map((highlight) => (
            <div key={highlight.title} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/30 p-5 md:flex-row md:items-center md:justify-between">
              <h3 className="text-lg font-semibold text-white">{highlight.title}</h3>
              <p className="text-sm text-slate-300 md:max-w-3xl">{highlight.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
