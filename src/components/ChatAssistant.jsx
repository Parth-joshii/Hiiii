import { AnimatePresence, motion } from "framer-motion";
import { Bot, CornerDownLeft, MessageCircle, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { buildAssistantReply } from "@/data/assistantReplies";
import { projects, profile, skillGroups, experiences, certifications } from "@/data/portfolio";
import { saveInquiry } from "@/lib/inquiries";

const assistantStats = {
  total: 4500,
  languages: 9,
};

const prompts = [
  { label: "Skills", question: "What are Parth Joshi's skills?" },
  { label: "Projects", question: "Tell me about Parth Joshi's projects." },
  { label: "Hindi RAG", question: "पार्थ जोशी का RAG चैटबॉट क्या है?" },
  { label: "Contact", question: "How can I contact Parth Joshi?" },
];

const initialMessages = [
  {
    role: "assistant",
    text: `Hi, I am PARTH.AI. I understand ${assistantStats.total.toLocaleString()}+ portfolio question patterns across ${assistantStats.languages} languages. Ask me about Parth's skills, projects, experience, certifications, or contact details.`,
  },
];

async function getAssistantReply(input) {
  const { detectPortfolioIntent } = await import("@/data/questionBank");
  const intent = detectPortfolioIntent(input);
  const allSkills = skillGroups.flatMap((group) => group.skills.map((skill) => skill.name));

  return buildAssistantReply({
    input,
    intent,
    profile,
    skills: allSkills,
    projects,
    experiences,
    certifications,
  });
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const messagesRef = useRef(null);

  const lastMessage = messages[messages.length - 1]?.text;
  const compactPreview = useMemo(() => lastMessage?.slice(0, 72), [lastMessage]);

  useEffect(() => {
    if (!open || !messagesRef.current) return;

    const timeoutId = window.setTimeout(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 80);

    return () => window.clearTimeout(timeoutId);
  }, [messages, open]);

  const sendMessage = async (value = input) => {
    const text = value.trim();
    if (!text) return;

    setMessages((current) => [...current, { role: "user", text }]);
    setInput("");

    const reply = await getAssistantReply(text);

    setMessages((current) => [
      ...current,
      { role: "assistant", text: reply },
    ]);

    saveInquiry({
      type: "chatbot-query",
      question: text,
      assistantReply: reply,
      source: "PARTH.AI assistant",
    });
    window.setTimeout(() => inputRef.current?.focus(), 40);
  };

  return (
    <div className="fixed bottom-5 right-4 z-[80] sm:right-6">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel edge-highlight mb-4 w-[min(calc(100vw-2rem),25rem)] overflow-hidden rounded-lg"
          >
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md bg-primary/[0.14] text-primary shadow-glow">
                  <Bot className="size-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-white">PARTH.AI Assistant</p>
                  <p className="text-xs text-muted-foreground">Portfolio intelligence</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close assistant">
                <X />
              </Button>
            </div>

            <div ref={messagesRef} className="max-h-[22rem] space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={`${message.role}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-white/10 bg-white/[0.055] text-muted-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {prompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    className="rounded-sm border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/45 hover:text-white"
                    onClick={() => sendMessage(prompt.question)}
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
              <form
                className="flex items-center gap-2"
                onSubmit={(event) => {
                  event.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="h-11 min-w-0 flex-1 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  placeholder="Ask about Parth..."
                />
                <Button size="icon" type="submit" aria-label="Send message">
                  <CornerDownLeft />
                </Button>
              </form>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((value) => !value)}
        className="ml-auto flex h-14 items-center gap-3 rounded-lg border border-primary/30 bg-background/95 px-4 text-left shadow-glow transition hover:border-primary/60 md:bg-background/85"
        aria-label="Open PARTH.AI assistant"
      >
        <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
          {open ? <X className="size-4" /> : <MessageCircle className="size-4" />}
        </span>
        <span className="hidden max-w-48 sm:block">
          <span className="flex items-center gap-1 font-display text-sm font-bold text-white">
            PARTH.AI <Sparkles className="size-3 text-primary" />
          </span>
          <span className="block truncate text-xs text-muted-foreground">{compactPreview}</span>
        </span>
      </motion.button>
    </div>
  );
}
