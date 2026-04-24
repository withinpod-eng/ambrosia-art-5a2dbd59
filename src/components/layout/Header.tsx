import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X, Sun, Moon, Flame } from "lucide-react";
import { useCart } from "@/store/cart";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Story" },
  { to: "/contact", label: "Reserve" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const openCart = useCart((s) => s.open);
  const { resolved, toggle } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6",
          scrolled
            ? "glass rounded-full border shadow-soft mx-3 sm:mx-6"
            : "border border-transparent"
        )}
      >
        <Link to="/" className="group flex items-center gap-2 py-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-primary shadow-glow-chilli">
            <Flame className="h-4 w-4 text-primary-foreground" strokeWidth={2.4} />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-tight">
              Saffron <span className="text-gradient-saffron">&amp;</span> Smoke
            </span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Modern Indian
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground after:scale-x-100" }}
              activeOptions={{ exact: item.to === "/" }}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:bottom-1 after:left-1/2 after:h-px after:w-6 after:-translate-x-1/2 after:scale-x-0 after:bg-saffron after:transition-transform"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {resolved === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={openCart}
            aria-label="Open cart"
            className="relative rounded-full"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-primary px-1 text-[10px] font-semibold text-primary-foreground shadow-glow-chilli animate-scale-in">
                {count}
              </span>
            )}
          </Button>

          <Link
            to="/contact"
            className="hidden rounded-full bg-gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-glow-chilli transition-transform hover:scale-105 md:inline-flex"
          >
            Book a Table
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-3 top-full mt-2 origin-top rounded-3xl border bg-popover/95 p-4 shadow-elevated backdrop-blur-xl animate-scale-in lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-2xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-accent/20 hover:text-foreground"
                activeProps={{ className: "bg-accent/20 text-foreground" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-2 rounded-2xl bg-gradient-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-glow-chilli"
            >
              Book a Table
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
