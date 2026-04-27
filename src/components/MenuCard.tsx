import { Plus, Flame, Leaf } from "lucide-react";
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
  const img = image ?? item.image_url ?? null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-2 hover:border-saffron hover:shadow-[0_0_0_2px_hsl(var(--saffron)/0.6),0_20px_60px_-15px_hsl(var(--saffron)/0.55),0_0_80px_-10px_hsl(var(--chilli)/0.45)]"
    >
      {/* Ambient background glow on hover */}
      <div className="pointer-events-none absolute -inset-1 -z-10 rounded-[2rem] bg-gradient-to-br from-saffron/30 via-chilli/20 to-ember/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

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
        {/* Saffron glow ring on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-inset ring-saffron/60 transition-opacity duration-500 group-hover:opacity-100" />

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

        <button
          onClick={() => {
            add({ id: item.id, name: item.name, price: item.price_inr, isVeg: item.is_veg, imageUrl: img });
            toast.success(`${item.name} added`, { description: "Added to your order" });
          }}
          className="group/btn mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground shadow-glow-chilli transition-all hover:opacity-95"
        >
          <Plus className="h-4 w-4 transition-transform group-hover/btn:rotate-90" />
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}
