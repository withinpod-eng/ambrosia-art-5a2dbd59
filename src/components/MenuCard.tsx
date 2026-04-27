import { useState } from "react";
import { Plus, Minus, Flame, Leaf, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { MenuItem } from "@/hooks/use-menu";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BADGE_STYLES: Record<string, string> = {
  bestseller: "bg-chilli/95 text-chilli-foreground",
  chef_special: "bg-saffron/95 text-saffron-foreground",
  limited: "bg-ember/95 text-primary-foreground",
  fresh: "bg-veg/95 text-primary-foreground",
};
const BADGE_LABEL: Record<string, string> = {
  bestseller: "Bestseller",
  chef_special: "Chef's Special",
  limited: "Limited",
  fresh: "Fresh",
};

export function MenuCard({ item, image }: { item: MenuItem; image?: string }) {
  const add = useCart((s) => s.add);
  const setQty = useCart((s) => s.setQty);
  const cartItem = useCart((s) => s.items.find((i) => i.id === item.id));
  const qty = cartItem?.quantity ?? 0;
  const [selected, setSelected] = useState(false);
  const img = image ?? item.image_url ?? null;

  const handleAdd = () => {
    add({ id: item.id, name: item.name, price: item.price_inr, isVeg: item.is_veg, imageUrl: img });
    toast.success(`${item.name} added`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setSelected((s) => !s)}
      tabIndex={0}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-[28px] border bg-card-elevated shadow-soft transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-saffron/70 shadow-glow-saffron"
          : "border-border/60 hover:border-saffron/40"
      )}
    >
      {/* Ambient hover glow */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-x-6 -bottom-10 -z-10 h-32 rounded-full bg-gradient-saffron blur-3xl transition-opacity duration-700",
          selected ? "opacity-30" : "opacity-0 group-hover:opacity-25"
        )}
      />

      {/* Image */}
      <div className="relative aspect-[5/4] overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-saffron text-saffron-foreground">
            <span className="font-display text-6xl">{item.name[0]}</span>
          </div>
        )}

        {/* Gradient veil for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />

        {/* Top-row badges */}
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide backdrop-blur-md ring-1 ring-border/60",
              item.is_veg ? "text-veg" : "text-nonveg"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", item.is_veg ? "bg-veg" : "bg-nonveg")} />
            {item.is_veg ? "VEG" : "NON-VEG"}
          </span>

          {item.spicy_level >= 3 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-[10px] font-semibold text-spicy backdrop-blur-md ring-1 ring-border/60">
              <Flame className="h-3 w-3" /> Spicy
            </span>
          )}
        </div>

        {/* Featured badge bottom-left over image */}
        {item.badge && (
          <div className="absolute inset-x-5 bottom-4 flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] shadow-soft backdrop-blur",
                BADGE_STYLES[item.badge] ?? "bg-card/90 text-foreground"
              )}
            >
              {item.badge === "chef_special" && <Sparkles className="h-3 w-3" />}
              {BADGE_LABEL[item.badge] ?? item.badge}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-[1.35rem] leading-tight tracking-tight text-foreground">
              {item.name}
            </h3>
            {item.ingredients && (
              <p className="mt-1.5 line-clamp-1 text-xs italic text-muted-foreground">
                {item.ingredients}
              </p>
            )}
          </div>
          <div className="shrink-0 text-right">
            <p className="font-display text-[1.4rem] font-semibold leading-none text-chilli">
              {formatINR(item.price_inr)}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              per plate
            </p>
          </div>
        </header>

        {item.description && (
          <p className="line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}

        {/* Stats — refined, no harsh borders */}
        <dl className="grid grid-cols-3 gap-1 rounded-2xl bg-section/70 p-3 text-center">
          <div className="flex flex-col gap-1">
            <dt className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              Calories
            </dt>
            <dd className="font-display text-sm font-medium text-foreground">
              {item.calories ?? "—"}
            </dd>
          </div>
          <div className="flex flex-col gap-1 border-x border-border/40">
            <dt className="inline-flex items-center justify-center gap-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              <Leaf className="h-2.5 w-2.5" /> Fiber
            </dt>
            <dd className="font-display text-sm font-medium text-foreground">
              {item.fiber_g ? `${item.fiber_g}g` : "—"}
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="inline-flex items-center justify-center gap-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              <Flame className="h-2.5 w-2.5" /> Heat
            </dt>
            <dd className="mt-0.5 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-2 w-1 rounded-sm transition-colors",
                    i < item.spicy_level ? "bg-spicy" : "bg-muted"
                  )}
                />
              ))}
            </dd>
          </div>
        </dl>

        {/* CTA */}
        {qty === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            className="group/btn relative mt-1 inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-primary text-sm font-semibold tracking-wide text-primary-foreground shadow-glow-chilli transition-all hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
            <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
            Add to Cart
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-1 inline-flex h-12 items-center justify-between rounded-full border border-saffron/60 bg-card shadow-glow-saffron"
          >
            <button
              onClick={() => setQty(item.id, qty - 1)}
              aria-label="Decrease quantity"
              className="grid h-full w-14 place-items-center rounded-l-full text-saffron transition-all hover:bg-saffron/10 active:scale-90"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-display text-lg font-semibold text-foreground tabular-nums">
              {qty}
            </span>
            <button
              onClick={() => setQty(item.id, qty + 1)}
              aria-label="Increase quantity"
              className="grid h-full w-14 place-items-center rounded-r-full text-saffron transition-all hover:bg-saffron/10 active:scale-90"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
