import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, subtotal, openChat } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const total = subtotal();
  const taxes = Math.round(total * 0.05);
  const grand = total + taxes;

  return (
    <>
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        role="dialog"
        aria-label="Your cart"
        className={cn(
          "fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l bg-card shadow-elevated transition-transform duration-500",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <p className="font-display text-2xl">Your Order</p>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {items.length} {items.length === 1 ? "dish" : "dishes"} curated
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close cart" className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid h-20 w-20 place-items-center rounded-full bg-muted">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="mt-6 font-display text-xl">Your plate is empty</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Browse the menu and add a few signature dishes to begin your feast.
              </p>
              <Link
                to="/menu"
                onClick={close}
                className="mt-6 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-chilli"
              >
                Explore the Menu
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="group flex gap-4 rounded-2xl border bg-card-elevated p-3 transition-all hover:shadow-soft"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-saffron text-saffron-foreground">
                        <span className="font-display text-xl">{item.name[0]}</span>
                      </div>
                    )}
                    <span
                      className={cn(
                        "absolute left-1.5 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-sm border",
                        item.isVeg ? "border-veg" : "border-nonveg"
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", item.isVeg ? "bg-veg" : "bg-nonveg")} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-medium leading-tight">{item.name}</p>
                      <button
                        onClick={() => remove(item.id)}
                        aria-label="Remove"
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{formatINR(item.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border bg-background">
                        <button
                          onClick={() => setQty(item.id, item.quantity - 1)}
                          aria-label="Decrease"
                          className="grid h-8 w-8 place-items-center rounded-l-full transition-colors hover:bg-accent/30"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => setQty(item.id, item.quantity + 1)}
                          aria-label="Increase"
                          className="grid h-8 w-8 place-items-center rounded-r-full transition-colors hover:bg-accent/30"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-base font-semibold text-chilli">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t bg-section/60 px-6 py-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(total)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">GST (5%)</dt><dd>{formatINR(taxes)}</dd></div>
              <div className="mt-2 flex justify-between border-t pt-2">
                <dt className="font-display text-lg">Total</dt>
                <dd className="font-display text-xl font-semibold text-gradient-saffron">{formatINR(grand)}</dd>
              </div>
            </dl>
            <Button
              type="button"
              onClick={openChat}
              className="mt-5 h-12 w-full rounded-full bg-gradient-primary text-base font-semibold text-primary-foreground shadow-glow-chilli hover:opacity-95"
            >
              Place Order via Concierge
            </Button>
            <p className="mt-2 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Confirmed in under 60 seconds
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
