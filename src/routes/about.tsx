import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Flame, Leaf, Clock, Heart, Sparkles } from "lucide-react";
import { SectionHeader } from "@/routes/index";
import ambience from "@/assets/restaurant-ambience.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import butterChicken from "@/assets/dish-butter-chicken.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Saffron & Smoke" },
      { name: "description", content: "Founded in 2014, Saffron & Smoke brings heritage Indian recipes to a modern Mumbai stage. Meet Chef Arjun and our craft." },
      { property: "og:title", content: "Our Story — Saffron & Smoke" },
      { property: "og:description", content: "Heritage Indian recipes, modern Mumbai stage. Meet Chef Arjun and our craft." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">Our Story</span>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-7xl">
            Where <span className="text-gradient-saffron">heritage</span> meets fire.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Saffron &amp; Smoke is more than a restaurant. It's a love letter to the kitchens of our
            grandmothers — to the slow flicker of dum-cooked rice, the hiss of mustard seeds in ghee,
            and the patience of a curry simmering long after the city has gone to sleep.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-[2rem] shadow-elevated"
        >
          <img src={ambience} alt="Saffron & Smoke dining room" className="aspect-[16/9] w-full object-cover" />
        </motion.div>
      </section>

      {/* Story blocks */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="space-y-20">
          {[
            {
              year: "2014",
              title: "A small kitchen in Bandra",
              body: "Chef Arjun Khanna left a Michelin-starred kitchen in London to open a 22-seat restaurant in a quiet Bandra lane. The first menu had eight dishes. The first review changed everything.",
              image: biryani,
            },
            {
              year: "2018",
              title: "The tandoor expansion",
              body: "We installed a triple-pit live coal tandoor — the largest in the city — and rebuilt our menu around it. Every kebab, every naan, every smoked dal now passes through fire.",
              image: butterChicken,
            },
            {
              year: "Today",
              title: "A modern Indian kitchen",
              body: "Saffron & Smoke now seats 80 across two intimate dining rooms. We source from 14 farms across Punjab, Kerala and Kashmir. We marinate for 48 hours. We grind spices daily.",
              image: ambience,
            },
          ].map((b, i) => (
            <motion.div
              key={b.year}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <p className="font-display text-7xl text-gradient-saffron opacity-50">{b.year}</p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl">{b.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{b.body}</p>
              </div>
              <div className="overflow-hidden rounded-3xl shadow-elevated">
                <img src={b.image} alt="" className="aspect-[4/3] w-full object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-section py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader eyebrow="Our Promise" title="The values we plate" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Flame, title: "Live Fire", desc: "Coal tandoor, every service" },
              { icon: Leaf, title: "Farm Fresh", desc: "14 partner farms, weekly" },
              { icon: Clock, title: "Slow Craft", desc: "48-hour marinades" },
              { icon: Heart, title: "Hospitality", desc: "From the first hello" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-3xl border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-elevated">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-saffron text-saffron-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="mt-4 font-display text-xl">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-12 text-center text-primary-foreground shadow-elevated">
          <div className="absolute inset-0 bg-hero-glow opacity-60" />
          <Sparkles className="relative mx-auto h-8 w-8 text-saffron" />
          <h2 className="relative mt-4 font-display text-4xl sm:text-5xl">Come dine with us.</h2>
          <p className="relative mt-3 opacity-85">A table is waiting. Reservations close 30 minutes prior.</p>
          <Link
            to="/contact"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-3 text-sm font-semibold text-foreground shadow-elevated transition-transform hover:scale-105"
          >
            <Award className="h-4 w-4" /> Reserve Now
          </Link>
        </div>
      </section>
    </div>
  );
}
