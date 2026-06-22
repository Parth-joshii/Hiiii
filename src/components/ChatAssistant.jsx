import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { Bot, CornerDownLeft, GripVertical, MessageCircle, Sparkles, X } from "lucide-react";
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
  const dragConstraintsRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragControls = useDragControls();

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
    <div ref={dragConstraintsRef} className="fixed inset-0 z-[80] pointer-events-none">
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={dragConstraintsRef}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={() => {
          window.setTimeout(() => {
            isDraggingRef.current = false;
          }, 0);
        }}
        className="pointer-events-auto absolute bottom-4 right-4 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="chat-panel edge-highlight relative isolate w-[min(calc(100vw-2rem),26rem)] overflow-hidden rounded-lg"
            >
              <div className="relative z-10 flex items-stretch justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3">
                <div
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-md select-none cursor-grab active:cursor-grabbing"
                  onPointerDown={(event) => {
                    dragControls.start(event);
                  }}
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-glow">
                    <Bot className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-display text-sm font-bold text-white">PARTH.AI</p>
                      <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        AI
                      </span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">Portfolio assistant</p>
                  </div>
                  <GripVertical className="size-4 shrink-0 text-muted-foreground/80" />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  className="shrink-0 border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.07] hover:text-white"
                >
                  <X />
                </Button>
              </div>

              <div ref={messagesRef} className="relative z-10 max-h-[22rem] space-y-3 overflow-y-auto p-4">
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
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "border border-white/10 bg-white/[0.04] text-muted-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10 border-t border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  {prompts.map((prompt) => (
                    <button
                      key={prompt.label}
                      type="button"
                      className="rounded-sm border border-white/10 bg-white/[0.045] px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/45 hover:text-white"
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
                    className="h-11 min-w-0 flex-1 rounded-md border border-white/10 bg-[#090b12] px-3 text-sm text-white outline-none transition placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
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
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onPointerDown={(event) => {
            dragControls.start(event);
          }}
          onClick={() => {
            if (isDraggingRef.current) return;
            setOpen((value) => !value);
          }}
          title={compactPreview ?? "Open PARTH.AI assistant"}
          className="grid size-14 place-items-center rounded-full border border-primary/30 bg-[#080b11] text-primary shadow-glow transition hover:border-primary/60 hover:bg-[#0b0f17]"
          aria-label="Open PARTH.AI assistant"
        >
          {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        </motion.button>
      </motion.div>
    </div>
  );
}
