import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Saffron & Smoke" },
      { name: "description", content: "Review your dishes and place your order through our dining concierge." },
      { property: "og:title", content: "Your Cart — Saffron & Smoke" },
      { property: "og:description", content: "Review and confirm your order." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, openChat } = useCart();
  const total = subtotal();
  const taxes = Math.round(total * 0.05);
  const grand = total + taxes;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-saffron">Checkout</span>
        <h1 className="mt-3 font-display text-5xl">Your Order</h1>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border bg-card p-16 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-muted">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mt-6 font-display text-2xl">Nothing on the table yet</p>
          <p className="mt-2 text-muted-foreground">Browse the menu to add a few signature plates.</p>
          <Link to="/menu" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-glow-chilli">
            Open the Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 rounded-2xl border bg-card p-4 transition-all hover:shadow-soft">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-gradient-saffron text-saffron-foreground"><span className="font-display text-2xl">{item.name[0]}</span></div>
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <p className="font-display text-lg">{item.name}</p>
                    <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <p className="text-sm text-muted-foreground">{formatINR(item.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border bg-background">
                      <button onClick={() => setQty(item.id, item.quantity - 1)} className="grid h-9 w-9 place-items-center rounded-l-full hover:bg-accent/30"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => setQty(item.id, item.quantity + 1)} className="grid h-9 w-9 place-items-center rounded-r-full hover:bg-accent/30"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="font-display text-lg font-semibold text-chilli">{formatINR(item.price * item.quantity)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border bg-card-elevated p-6 shadow-elevated lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">Order Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(total)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">GST (5%)</dt><dd>{formatINR(taxes)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Delivery</dt><dd className="text-veg">Free</dd></div>
              <div className="mt-2 flex justify-between border-t pt-3">
                <dt className="font-display text-xl">Total</dt>
                <dd className="font-display text-2xl font-semibold text-gradient-saffron">{formatINR(grand)}</dd>
              </div>
            </dl>
            <button onClick={openChat} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary font-semibold text-primary-foreground shadow-glow-chilli">
              Place Order via Concierge <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Confirmed in under 60 seconds via WhatsApp</p>
          </aside>
        </div>
      )}
    </div>
  );
}
