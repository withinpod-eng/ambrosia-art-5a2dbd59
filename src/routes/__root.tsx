import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/hooks/use-theme";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ChatbotPopup } from "@/components/layout/ChatbotPopup";
import { ChatbotFab } from "@/components/layout/ChatbotFab";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-gradient-saffron">404</h1>
        <h2 className="mt-4 font-display text-2xl">Dish not on the menu</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for has been served and cleared. Let's get you back to the table.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-chilli"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

const themeBootstrap = `(function(){try{var t=localStorage.getItem('ss-theme')||'auto';var d=t==='dark'||(t==='auto'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: "Saffron & Smoke — Premium Indian Dining in Mumbai" },
      { name: "description", content: "Cinematic Indian fine dining in Mumbai. Tandoor classics, biryani, and modern plates. Order online or reserve a table at Saffron & Smoke." },
      { name: "theme-color", content: "#0D0D0D" },
      { property: "og:title", content: "Saffron & Smoke — Premium Indian Dining" },
      { property: "og:description", content: "Cinematic Indian dining: tandoor classics, slow-cooked biryani, and modern plates. Order or reserve in Mumbai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@300..800&family=Lora:ital,wght@1,400..600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000, refetchOnWindowFocus: false } },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="relative flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="flex-1 pt-20">
            <Outlet />
          </main>
          <Footer />
          <CartDrawer />
          <ChatbotPopup />
          <ChatbotFab />
          <Toaster richColors position="top-center" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
