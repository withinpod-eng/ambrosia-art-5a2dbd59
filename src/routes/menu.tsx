import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMenu } from "@/hooks/use-menu";
import { MenuCard } from "@/components/MenuCard";
import { SectionHeader } from "@/routes/index";
import { cn } from "@/lib/utils";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/menu")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Menu — Saffron & Smoke" },
      { name: "description", content: "Explore our full menu: tandoor starters, signature mains, biryani, breads, and heritage desserts. All prices in ₹." },
      { property: "og:title", content: "Menu — Saffron & Smoke" },
      { property: "og:description", content: "Tandoor starters, signature mains, biryani, breads, and heritage desserts. Order online." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { data, isLoading } = useMenu();
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const categories = data?.categories ?? [];
  const items = data?.items ?? [];

  const visible = useMemo(() => {
    return items.filter((it) => {
      if (category) {
        const cat = categories.find((c) => c.slug === category);
        if (cat && it.category_id !== cat.id) return false;
      }
      if (vegOnly && !it.is_veg) return false;
      if (query && !it.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, categories, category, query, vegOnly]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>();
    for (const it of visible) {
      const key = it.category_id ?? "other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(it);
    }
    return map;
  }, [visible]);

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden bg-section py-20">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <SectionHeader
            eyebrow="The Menu"
            title="A Feast Awaits"
            description="From tandoor-fired kebabs to slow-cooked biryani — every dish is built for sharing, conversation, and memory."
          />

          {/* Filters */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dishes…"
                className="h-11 w-72 rounded-full border bg-card pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-saffron"
              />
            </div>
            <button
              onClick={() => setVegOnly((v) => !v)}
              className={cn(
                "h-11 rounded-full border px-5 text-sm font-medium transition-all",
                vegOnly ? "border-veg bg-veg text-primary-foreground" : "bg-card hover:border-veg"
              )}
            >
              🌱 Veg only
            </button>
          </div>

          {/* Category pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => navigate({ search: {} })}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                !category ? "bg-gradient-primary text-primary-foreground shadow-glow-chilli" : "border bg-card hover:border-saffron"
              )}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate({ search: { category: c.slug } })}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all",
                  category === c.slug ? "bg-gradient-primary text-primary-foreground shadow-glow-chilli" : "border bg-card hover:border-saffron"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        {isLoading && <p className="text-center text-muted-foreground">Loading menu…</p>}
        {!isLoading && visible.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No dishes match your filters.</p>
        )}
        {Array.from(grouped.entries()).map(([catId, list]) => {
          const cat = categories.find((c) => c.id === catId);
          return (
            <div key={catId} className="mb-16">
              {cat && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8 flex items-end justify-between gap-4 border-b pb-4"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-saffron">{list.length} dishes</p>
                    <h2 className="mt-1 font-display text-4xl">{cat.name}</h2>
                    {cat.description && <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>}
                  </div>
                </motion.div>
              )}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <p className="font-script text-2xl text-muted-foreground">
          "A meal to remember begins with the first bite."
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-saffron px-7 py-3 text-sm font-semibold text-saffron transition-all hover:bg-saffron hover:text-saffron-foreground"
        >
          Reserve a Table Instead
        </Link>
      </div>
    </div>
  );
}
