import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Sparkles, Award, Leaf, Flame, Clock } from "lucide-react";
import { useMenu, useReviews } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import butterChicken from "@/assets/menu/butter-chicken.jpg";
import biryani from "@/assets/menu/mutton-biryani.jpg";
import paneerTikka from "@/assets/menu/paneer-tikka.jpg";
import gulabJamun from "@/assets/menu/gulab-jamun.jpg";
import malaiKebab from "@/assets/menu/malai-kebab.jpg";
import garlicNaan from "@/assets/menu/garlic-naan.jpg";
import mangoLassi from "@/assets/menu/mango-lassi.jpg";
import ambience from "@/assets/restaurant-ambience.jpg";

const HERO_SLIDES = [
  {
    image: butterChicken,
    eyebrow: "Signature Tonight",
    title: "Butter\nChicken",
    accent: "Velvet · Smoke · Tomato",
    description: "Tandoor-roasted chicken bathed in a velvety tomato-cashew gravy, finished with hand-churned butter.",
    price: 480,
  },
  {
    image: biryani,
    eyebrow: "Heritage Dum",
    title: "Hyderabadi\nBiryani",
    accent: "Saffron · Mint · Slow",
    description: "Long-grain basmati and tender mutton sealed in a copper handi, dum-cooked over coals for two hours.",
    price: 580,
  },
  {
    image: paneerTikka,
    eyebrow: "Fired in Clay",
    title: "Paneer\nTikka",
    accent: "Char · Yogurt · Kashmiri Chilli",
    description: "Hand-cut paneer marinated overnight, charred on iron skewers over the live tandoor.",
    price: 320,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saffron & Smoke — Premium Indian Restaurant in Mumbai" },
      { name: "description", content: "Cinematic Indian fine dining. Tandoor classics, slow-cooked biryani, modern plates. Order online or reserve a table at Saffron & Smoke, Mumbai." },
      { property: "og:title", content: "Saffron & Smoke — Premium Indian Restaurant" },
      { property: "og:description", content: "Cinematic Indian fine dining: tandoor classics, biryani, modern plates. Order or reserve in Mumbai." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Marquee />
      <FeaturedDishes />
      <CategoryGrid />
      <ChefStory />
      <Reviews />
      <BookingCta />
    </div>
  );
}

/* ─────────────── HERO ─────────────── */
function Hero() {
  const [index, setIndex] = useState(0);
  const slide = HERO_SLIDES[index];

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate -mt-20 min-h-[100svh] overflow-hidden pt-20">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grain" />
      {/* Floating decoration */}
      <div className="pointer-events-none absolute -left-20 top-32 h-72 w-72 rounded-full bg-saffron/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-chilli/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        {/* Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-saffron">
              <Sparkles className="h-3.5 w-3.5" /> {slide.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1] tracking-tight">
              {slide.title.split("\n").map((line, i) => (
                <span key={i} className="inline">
                  {i === 0 ? <>{line} </> : <span className="text-gradient-saffron">{line}</span>}
                </span>
              ))}
            </h1>
            <p className="mt-3 font-script text-lg text-muted-foreground">{slide.accent}</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/menu"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-primary px-7 text-sm font-semibold text-primary-foreground shadow-glow-chilli transition-transform hover:scale-105"
              >
                Order Now <span className="text-base font-bold">{formatINR(slide.price)}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex h-12 items-center gap-2 rounded-full border bg-card/60 px-6 text-sm font-medium backdrop-blur transition-colors hover:border-saffron hover:text-saffron"
              >
                Explore Menu
              </Link>
            </div>

            <dl className="mt-12 flex flex-nowrap items-start gap-4 text-sm sm:gap-6">
              <div className="min-w-0">
                <dt className="whitespace-nowrap text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">Rated</dt>
                <dd className="mt-1 flex items-center gap-1 font-display text-xl sm:text-2xl">
                  4.9 <Star className="h-4 w-4 fill-saffron text-saffron sm:h-5 sm:w-5" />
                </dd>
              </div>
              <div className="min-w-0 border-l pl-4 sm:pl-6">
                <dt className="whitespace-nowrap text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">Diners</dt>
                <dd className="mt-1 whitespace-nowrap font-display text-xl sm:text-2xl">200K+</dd>
              </div>
              <div className="min-w-0 border-l pl-4 sm:pl-6">
                <dt className="whitespace-nowrap text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">Since</dt>
                <dd className="mt-1 font-display text-xl sm:text-2xl">2014</dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>

        {/* Image */}
        <div className="relative aspect-square w-full max-w-[600px] justify-self-center">
          {/* Rotating ring */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 200 200" className="h-full w-full text-chilli/70 dark:text-saffron/40">
              <defs>
                <path id="ring" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
              </defs>
              <text fontSize="6" fill="currentColor" letterSpacing="3" className="font-display uppercase">
                <textPath href="#ring">
                  Saffron &amp; Smoke · Modern Indian Kitchen · Mumbai · Tandoor · Biryani · Saffron &amp; Smoke · 
                </textPath>
              </text>
            </svg>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 8 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-[8%] overflow-hidden rounded-full shadow-elevated ring-8 ring-card"
            >
              <img
                src={slide.image}
                alt={slide.title.replace("\n", " ")}
                className="h-full w-full object-cover"
                fetchPriority={index === 0 ? "high" : "auto"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating price tag */}
          <motion.div
            key={`price-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute -left-2 top-10 hidden rounded-full border bg-card/90 px-5 py-3 shadow-elevated backdrop-blur sm:block animate-float-slow"
          >
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
            <p className="font-display text-2xl font-semibold text-chilli">{formatINR(slide.price)}</p>
          </motion.div>

          {/* Slide controls */}
          <div className="absolute -bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-full border bg-card/90 px-2 py-1.5 shadow-soft backdrop-blur">
            <button
              onClick={() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              aria-label="Previous"
              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-accent/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-8 bg-gradient-primary" : "w-1.5 bg-muted"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
              aria-label="Next"
              className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-accent/30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── MARQUEE ─────────────── */
function Marquee() {
  const items = ["Tandoor Fired", "Saffron Sourced", "Slow-Cooked Dum", "Hand-Churned Butter", "Stone-Ground Spices", "Heritage Recipes", "Mumbai Since 2014"];
  return (
    <div className="relative overflow-hidden border-y bg-section/60 py-5">
      <div className="flex animate-[shimmer_30s_linear_infinite] whitespace-nowrap" style={{ animation: "scroll 30s linear infinite" }}>
        <ul className="flex shrink-0 items-center gap-12 pr-12">
          {[...items, ...items, ...items].map((s, i) => (
            <li key={i} className="flex items-center gap-3 font-display text-2xl text-muted-foreground">
              <Sparkles className="h-4 w-4 text-saffron" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ─────────────── FEATURED DISHES ─────────────── */
function FeaturedDishes() {
  const { data } = useMenu();
  const featured = (data?.items ?? [])
    .filter((i) => i.badge === "bestseller" || i.badge === "chef_special")
    .slice(0, 6);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <SectionHeader
        eyebrow="Chef's Picks"
        title="Tonight's Signatures"
        description="Six dishes hand-selected by Chef Arjun for tonight's service. Each plate carries a story of fire, spice, and patience."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 rounded-full border-2 border-saffron px-7 py-3 text-sm font-semibold text-saffron transition-all hover:bg-saffron hover:text-saffron-foreground"
        >
          View Full Menu <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ─────────────── CATEGORY GRID ─────────────── */
function CategoryGrid() {
  const { data } = useMenu();
  const categories = (data?.categories ?? []).slice(0, 6);
  const imageByCat: Record<string, string> = {
    starters: malaiKebab,
    mains: butterChicken,
    biryani,
    breads: garlicNaan,
    desserts: gulabJamun,
    drinks: mangoLassi,
  };

  return (
    <section className="relative bg-section py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Browse" title="Categories" description="Six curated families. One unforgettable journey." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to="/menu"
                search={{ category: cat.slug }}
                className="group relative block aspect-[5/4] overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
              >
                <img
                  src={imageByCat[cat.slug] ?? butterChicken}
                  alt={cat.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                  <p className="text-[10px] uppercase tracking-[0.3em] opacity-70">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-3xl">{cat.name}</h3>
                  <p className="mt-1 line-clamp-1 text-sm opacity-80">{cat.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-saffron">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── CHEF STORY ─────────────── */
function ChefStory() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-elevated">
            <img src={ambience} alt="Saffron & Smoke restaurant interior" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-3xl border bg-card/95 p-5 shadow-elevated backdrop-blur sm:block">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-saffron" />
              <div>
                <p className="font-display text-xl">Michelin-Inspired</p>
                <p className="text-xs text-muted-foreground">Awarded 2023, 2024</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-saffron">Our Story</span>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
            Heritage,<br /> reimagined<br /> with <span className="text-gradient-saffron">fire</span>.
          </h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Founded in 2014, Saffron &amp; Smoke is the brainchild of Chef Arjun Khanna — a love letter
            to his grandmother's kitchen in Lucknow, retold for the modern Indian diner. Every spice is
            stone-ground daily. Every kebab passes through our live coal tandoor. Every plate is finished
            by hand at the pass.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Flame, label: "Live Tandoor", desc: "Coal-fired, hand-skewered" },
              { icon: Leaf, label: "Farm Sourced", desc: "From Punjab & Kashmir" },
              { icon: Clock, label: "48hr Marinades", desc: "Slow & deliberate" },
              { icon: Award, label: "Award Winning", desc: "TimeOut Top 10" },
            ].map(({ icon: Icon, label, desc }) => (
              <li key={label} className="rounded-2xl border bg-card p-4 transition-colors hover:border-saffron">
                <Icon className="h-5 w-5 text-saffron" />
                <p className="mt-2 font-display text-lg">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-saffron underline-offset-4 hover:underline"
          >
            Read our full story <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────── REVIEWS ─────────────── */
function Reviews() {
  const { data: reviews = [] } = useReviews();
  return (
    <section className="relative bg-section py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Word of Mouth" title="Loved by Mumbai" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col rounded-3xl border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex gap-0.5 text-saffron">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-saffron" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                "{r.body}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-saffron font-display text-saffron-foreground">
                  {r.author_name[0]}
                </div>
                <div>
                  <p className="font-medium">{r.author_name}</p>
                  <p className="text-xs text-muted-foreground">Verified diner</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── BOOKING CTA ─────────────── */
function BookingCta() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 text-primary-foreground shadow-elevated sm:p-16">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className="absolute inset-0 grain" />
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-saffron/30 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] opacity-80">Reservations</span>
            <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
              Reserve a table.<br />
              Live the experience.
            </h2>
            <p className="mt-4 max-w-md opacity-85">
              Limited covers. Curated tasting flights. A chef's surprise course on every reservation.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-card px-8 text-base font-semibold text-foreground shadow-elevated transition-transform hover:scale-105"
          >
            Book a Table <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── SHARED ─────────────── */
export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-block text-xs uppercase tracking-[0.3em] text-saffron">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
  );
}
