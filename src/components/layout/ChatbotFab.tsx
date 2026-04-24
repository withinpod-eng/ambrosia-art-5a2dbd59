import { useCart } from "@/store/cart";
import { Bot } from "lucide-react";

export function ChatbotFab() {
  const { openChat, isChatOpen, items } = useCart();
  if (isChatOpen) return null;
  return (
    <button
      onClick={openChat}
      aria-label="Open dining concierge"
      className="group fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow-chilli transition-transform hover:scale-110 animate-pulse-glow"
    >
      <Bot className="h-6 w-6" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-saffron px-1 text-[10px] font-bold text-saffron-foreground">
          {items.reduce((n, i) => n + i.quantity, 0)}
        </span>
      )}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
        Concierge
      </span>
    </button>
  );
}
