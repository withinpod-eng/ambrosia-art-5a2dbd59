import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Check, Loader2 } from "lucide-react";
import { SectionHeader } from "@/routes/index";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Reservations & Contact — Saffron & Smoke" },
      { name: "description", content: "Reserve a table at Saffron & Smoke, Bandra West, Mumbai. Open daily 12:00–23:30. WhatsApp, phone and email." },
      { property: "og:title", content: "Reservations & Contact — Saffron & Smoke" },
      { property: "og:description", content: "Reserve a table at Saffron & Smoke, Mumbai. Open daily 12:00–23:30." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    party_size: 2,
    booking_date: "",
    booking_time: "20:00",
    notes: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Static demo: simulate a network call. Wire to Formspree/Make/n8n webhook later.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setDone(true);
    toast.success("Reservation received", { description: "We'll WhatsApp you a confirmation shortly." });
  };

  return (
    <div>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative">
          <SectionHeader
            eyebrow="Reservations"
            title="A table for you"
            description="Book in seconds. Walk-ins welcome but reservations are recommended for weekends."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[2rem] border bg-card p-8 shadow-elevated sm:p-10"
          >
            {done ? (
              <div className="py-12 text-center animate-scale-in">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-veg text-primary-foreground">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-3xl">Reservation received</h3>
                <p className="mt-2 text-muted-foreground">
                  We've sent your details to the host stand. Expect a WhatsApp confirmation within minutes.
                </p>
                <button
                  onClick={() => { setDone(false); setForm({ full_name: "", phone: "", email: "", party_size: 2, booking_date: "", booking_time: "20:00", notes: "" }); }}
                  className="mt-6 rounded-full border-2 border-saffron px-6 py-2 text-sm font-semibold text-saffron"
                >
                  Make another reservation
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input required minLength={2} value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="input" placeholder="Your name" />
                  </Field>
                  <Field label="Phone">
                    <input required minLength={7} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+91 9..." />
                  </Field>
                </div>
                <Field label="Email (optional)">
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@email.com" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Guests">
                    <select value={form.party_size} onChange={(e) => setForm({ ...form, party_size: Number(e.target.value) })} className="input">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Date">
                    <input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.booking_date} onChange={(e) => setForm({ ...form, booking_date: e.target.value })} className="input" />
                  </Field>
                  <Field label="Time">
                    <input required type="time" value={form.booking_time} onChange={(e) => setForm({ ...form, booking_time: e.target.value })} className="input" />
                  </Field>
                </div>
                <Field label="Special requests (optional)">
                  <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input resize-none" placeholder="Anniversary, allergies, seating preference…" />
                </Field>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow-chilli transition-transform hover:scale-[1.01] disabled:opacity-60"
                >
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Reserving…</> : "Confirm Reservation"}
                </button>
              </form>
            )}
            <style>{`.input{width:100%;height:3rem;border-radius:9999px;border:1px solid var(--border);background:var(--input);padding:0 1.25rem;font-size:0.875rem;outline:none;transition:all 0.2s;color:var(--foreground)}.input:focus{border-color:var(--saffron);box-shadow:0 0 0 3px oklch(0.74 0.13 80 / 0.2)}textarea.input{height:auto;padding:0.875rem 1.25rem;border-radius:1.25rem}select.input{appearance:none}`}</style>
          </motion.div>

          {/* Info */}
          <div className="space-y-4">
            <InfoCard icon={MapPin} title="Find Us" lines={["12 Heritage Lane", "Bandra West, Mumbai 400050"]} />
            <InfoCard icon={Phone} title="Call" lines={["+91 98200 12345"]} cta={{ href: "tel:+919820012345", label: "Call now" }} />
            <InfoCard icon={MessageCircle} title="WhatsApp" lines={["+91 98200 12345"]} cta={{ href: "https://wa.me/919820012345", label: "Open WhatsApp" }} />
            <InfoCard icon={Mail} title="Email" lines={["hello@saffronandsmoke.in"]} />
            <InfoCard icon={Clock} title="Hours" lines={["Mon–Sun · 12:00 – 23:30", "Last seating 22:30"]} />

            <div className="overflow-hidden rounded-3xl border shadow-soft">
              <iframe
                title="Saffron & Smoke location"
                src="https://www.google.com/maps?q=Bandra+West+Mumbai&output=embed"
                width="100%"
                height="240"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function InfoCard({ icon: Icon, title, lines, cta }: { icon: React.ElementType; title: string; lines: string[]; cta?: { href: string; label: string } }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border bg-card p-5 transition-all hover:border-saffron hover:shadow-soft">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-saffron text-saffron-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <p className="font-display text-lg">{title}</p>
        {lines.map((l, i) => <p key={i} className="text-sm text-muted-foreground">{l}</p>)}
        {cta && <a href={cta.href} className="mt-2 inline-block text-sm font-semibold text-saffron hover:underline">{cta.label} →</a>}
      </div>
    </div>
  );
}
