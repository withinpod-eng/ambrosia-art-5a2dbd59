import { Link } from "@tanstack/react-router";
import { Flame, Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-footer text-footer-foreground">
      <div className="absolute inset-0 bg-hero-glow opacity-50" />
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-saffron to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-primary shadow-glow-chilli">
              <Flame className="h-5 w-5 text-primary-foreground" />
            </span>
            <div>
              <p className="font-display text-2xl font-semibold">
                Saffron <span className="text-gradient-saffron">&amp;</span> Smoke
              </p>
              <p className="text-xs uppercase tracking-[0.3em] opacity-60">Modern Indian Kitchen</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-75">
            A cinematic Indian dining experience — heritage recipes, modern plating, and ingredients sourced
            from artisanal farms across the subcontinent.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-colors hover:bg-saffron hover:text-saffron-foreground">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-colors hover:bg-saffron hover:text-saffron-foreground">
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Explore</h4>
          <ul className="space-y-2 text-sm opacity-75">
            <li><Link to="/" className="hover:text-saffron">Home</Link></li>
            <li><Link to="/menu" className="hover:text-saffron">Menu</Link></li>
            <li><Link to="/about" className="hover:text-saffron">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-saffron">Reservations</Link></li>
            <li><Link to="/cart" className="hover:text-saffron">Your Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-lg">Visit</h4>
          <ul className="space-y-3 text-sm opacity-75">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" /> 12 Heritage Lane, Bandra West, Mumbai 400050</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0 text-saffron" /> +91 98200 12345</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0 text-saffron" /> hello@saffronandsmoke.in</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs opacity-60 sm:flex-row">
          <p>© {new Date().getFullYear()} Saffron &amp; Smoke. Crafted with fire.</p>
          <p>Open daily · 12:00 – 23:30 IST</p>
        </div>
      </div>
    </footer>
  );
}
