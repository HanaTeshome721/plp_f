import SectionTitle from "@/components/common/SectionTitle";
import ContactForm from "@/components/sections/ContactForm";

const offices = [
  {
    name: "Nairobi hub",
    address: "13 Riverside Drive, Nairobi, Kenya",
    email: "nairobi@plp.dev",
  },
  {
    name: "Kigali studio",
    address: "KG 7 Ave, Kigali, Rwanda",
    email: "kigali@plp.dev",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 lg:px-0">
      <SectionTitle
        eyebrow="Talk to us"
        title="Need custom cohorts, enterprise rollouts, or mentor sourcing?"
        description="Share context about your learners and we will tailor a mentorship program that compounds every sprint."
      />

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {offices.map((office) => (
            <div key={office.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.4em] text-indigo-300">{office.name}</p>
              <p className="mt-2 text-base text-slate-200">{office.address}</p>
              <p className="mt-1 text-sm text-slate-400">{office.email}</p>
            </div>
          ))}
          <p className="text-sm text-slate-400">
            Prefer async? Drop a note via the form. We respond within 1 business day and store each message via the Express API.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
