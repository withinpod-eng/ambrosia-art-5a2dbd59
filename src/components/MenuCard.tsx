import { useState } from "react";
import { Plus, Minus, Flame, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import type { MenuItem } from "@/hooks/use-menu";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const BADGE_STYLES: Record<string, string> = {
  bestseller: "bg-chilli text-chilli-foreground",
  chef_special: "bg-saffron text-saffron-foreground",
  limited: "bg-ember text-primary-foreground",
  fresh: "bg-veg text-primary-foreground",
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setSelected((s) => !s)}
      tabIndex={0}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border-2 bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-saffron hover:shadow-glow-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99]",
        selected ? "border-saffron shadow-glow-saffron" : "border-border"
      )}
    >
      {/* Ambient background glow on hover/select */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-2 -z-10 rounded-[2rem] bg-gradient-saffron blur-2xl transition-opacity duration-500 group-hover:opacity-40",
          selected ? "opacity-40" : "opacity-0"
        )}
      />

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {img ? (
          <img
            src={img}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-125"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-saffron text-saffron-foreground">
            <span className="font-display text-5xl">{item.name[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 ring-2 ring-inset ring-saffron/60 transition-opacity duration-500 group-hover:opacity-100",
            selected ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-[10px] font-semibold backdrop-blur",
              item.is_veg ? "text-veg" : "text-nonveg"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", item.is_veg ? "bg-veg" : "bg-nonveg")} />
            {item.is_veg ? "Veg" : "Non-veg"}
          </span>
          {item.badge && (
            <span className={cn("inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider", BADGE_STYLES[item.badge] ?? "bg-muted text-muted-foreground")}>
              {BADGE_LABEL[item.badge] ?? item.badge}
            </span>
          )}
        </div>

        {item.spicy_level >= 3 && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-2 py-1 text-[10px] font-semibold text-spicy backdrop-blur">
            <Flame className="h-3 w-3" /> Spicy
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <header className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight">{item.name}</h3>
            {item.ingredients && (
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.ingredients}</p>
            )}
          </div>
          <p className="shrink-0 font-display text-xl font-semibold text-chilli">
            {formatINR(item.price_inr)}
          </p>
        </header>

        {item.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        )}

        <dl className="mt-auto grid grid-cols-3 gap-2 rounded-2xl bg-section/60 p-2.5 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
          <div>
            <dt>Cal</dt>
            <dd className="mt-0.5 font-display text-base text-foreground">{item.calories ?? "—"}</dd>
          </div>
          <div className="border-x">
            <dt className="flex items-center justify-center gap-0.5"><Leaf className="h-2.5 w-2.5" /> Fiber</dt>
            <dd className="mt-0.5 font-display text-base text-foreground">{item.fiber_g ? `${item.fiber_g}g` : "—"}</dd>
          </div>
          <div>
            <dt className="flex items-center justify-center gap-0.5"><Flame className="h-2.5 w-2.5" /></dt>
            <dd className="mt-0.5 flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={cn("h-2 w-1 rounded-sm", i < item.spicy_level ? "bg-spicy" : "bg-muted")} />
              ))}
            </dd>
          </div>
        </dl>

        {qty === 0 ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            className="group/btn mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-glow-chilli transition-all hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
          >
            <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
            Add to Cart
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-1 inline-flex h-11 items-center justify-between rounded-full border-2 border-saffron bg-card shadow-glow-saffron"
          >
            <button
              onClick={() => setQty(item.id, qty - 1)}
              aria-label="Decrease quantity"
              className="grid h-full w-12 place-items-center rounded-l-full text-saffron transition-colors hover:bg-saffron/10 active:scale-95"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="font-display text-lg font-semibold text-foreground">{qty}</span>
            <button
              onClick={() => setQty(item.id, qty + 1)}
              aria-label="Increase quantity"
              className="grid h-full w-12 place-items-center rounded-r-full text-saffron transition-colors hover:bg-saffron/10 active:scale-95"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
