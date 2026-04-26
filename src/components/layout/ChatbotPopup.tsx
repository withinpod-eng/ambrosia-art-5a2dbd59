import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Msg = { role: "bot" | "user"; text: string; timestamp: number };

export function ChatbotPopup() {
  const { isChatOpen, closeChat, items, subtotal, clear } = useCart();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<"intro" | "name" | "phone" | "confirm" | "placing" | "done">("intro");
  const [orderId, setOrderId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = subtotal();
  const taxes = Math.round(total * 0.05);
  const grand = total + taxes;

  useEffect(() => {
    if (!isChatOpen) return;
    setMessages([
      {
        role: "bot",
        text: "Namaste! I'm Saffi, your dining concierge. I'll confirm your order in under a minute. Can I have your name?",
        timestamp: Date.now(),
      },
    ]);
    setStage("name");
    setOrderId(null);
  }, [isChatOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, stage]);

  const push = (m: Msg) => setMessages((arr) => [...arr, m]);

  const send = async () => {
    const value = input.trim();
    if (!value) return;
    push({ role: "user", text: value, timestamp: Date.now() });
    setInput("");

    if (stage === "name") {
      setName(value);
      setStage("phone");
      setTimeout(() => push({ role: "bot", text: `Lovely to meet you, ${value.split(" ")[0]}. What's the best mobile number to confirm your order?`, timestamp: Date.now() }), 500);
      return;
    }
    if (stage === "phone") {
      const cleaned = value.replace(/\D/g, "");
      if (cleaned.length < 7) {
        setTimeout(() => push({ role: "bot", text: "That number seems short. Could you share a 10-digit Indian mobile?", timestamp: Date.now() }), 400);
        return;
      }
      setPhone(value);
      setStage("confirm");
      setTimeout(() => push({ role: "bot", text: `Perfect. I have ${items.length} dishes for you, total ${formatINR(grand)}. Shall I place the order? (type yes to confirm)`, timestamp: Date.now() }), 500);
      return;
    }
    if (stage === "confirm") {
      if (!/^y(es)?$/i.test(value)) {
        setTimeout(() => push({ role: "bot", text: "No problem — let me know when you're ready by typing 'yes'.", timestamp: Date.now() }), 400);
        return;
      }
      await placeOrder();
    }
  };

  const placeOrder = async () => {
    setStage("placing");
    push({ role: "bot", text: "Securing your table in our kitchen queue…", timestamp: Date.now() });
    // Static demo: generate a local order reference. Wire to a webhook later.
    await new Promise((r) => setTimeout(r, 1200));
    const ref = Math.random().toString(36).slice(2, 10).toUpperCase();
    setOrderId(ref);
    setStage("done");
    push({
      role: "bot",
      text: `Confirmed! Your order #${ref} is on its way. We'll WhatsApp ${phone} with live updates.`,
      timestamp: Date.now(),
    });
    setTimeout(() => clear(), 1500);
  };

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-end p-4 sm:items-center sm:justify-center">
      <div onClick={closeChat} className="absolute inset-0 bg-foreground/50 backdrop-blur-sm animate-fade-up" />
      <div className="relative flex h-[640px] max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border bg-card shadow-elevated animate-scale-in">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-primary px-5 py-4 text-primary-foreground">
          <div className="absolute inset-0 bg-hero-glow opacity-40" />
          <div className="relative flex items-center gap-3">
            <div className="relative">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-foreground/20 backdrop-blur">
                <Bot className="h-5 w-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-veg ring-2 ring-primary animate-pulse-glow" />
            </div>
            <div className="flex-1">
              <p className="font-display text-lg leading-none">Saffi</p>
              <p className="text-xs opacity-80">Dining concierge · Online</p>
            </div>
            <button onClick={closeChat} aria-label="Close" className="rounded-full p-2 transition-colors hover:bg-primary-foreground/20">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Order summary */}
        {stage !== "done" && items.length > 0 && (
          <div className="border-b bg-section/40 px-5 py-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Order summary</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm">{items.length} dishes</p>
              <p className="font-display text-base font-semibold text-gradient-saffron">{formatINR(grand)}</p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex gap-2 animate-fade-up", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "bot" && (
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-saffron text-saffron-foreground">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-snug",
                  m.role === "user"
                    ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
                    : "rounded-bl-sm bg-muted text-foreground"
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {stage === "placing" && (
            <div className="flex items-center gap-2 px-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-saffron" />
              <span>Placing your order…</span>
            </div>
          )}
          {stage === "done" && (
            <div className="rounded-2xl border border-veg/30 bg-veg/10 p-5 text-center animate-scale-in">
              <CheckCircle2 className="mx-auto h-12 w-12 text-veg" />
              <p className="mt-3 font-display text-xl">Order Confirmed</p>
              <p className="mt-1 text-sm text-muted-foreground">Reference #{orderId}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-saffron/15 px-3 py-1 text-xs font-medium text-saffron">
                <Sparkles className="h-3 w-3" /> Estimated 35–45 min
              </p>
            </div>
          )}
        </div>

        {/* Input */}
        {stage !== "placing" && stage !== "done" && (
          <div className="border-t bg-card px-3 py-3">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-center gap-2 rounded-full border bg-background pl-4 pr-1.5 focus-within:ring-2 focus-within:ring-saffron"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  stage === "name" ? "Your name…" :
                  stage === "phone" ? "+91 9..." :
                  "Type yes to confirm"
                }
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow-chilli transition-transform hover:scale-105 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        {stage === "done" && (
          <div className="border-t bg-card p-3">
            <Button onClick={closeChat} className="h-11 w-full rounded-full bg-gradient-primary text-primary-foreground">
              Close
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
