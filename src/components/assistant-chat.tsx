"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

type Step = {
  key: string;
  question: string;
  placeholder: string;
  options?: string[];
};

const steps: Step[] = [
  {
    key: "skills",
    question:
      "Welcome to Pathwise! I'll build you a personalized learning roadmap. First — what do you already know, and what do you want to learn? (e.g. \"Know Python, want to learn machine learning\")",
    placeholder: "I know..., I want to learn...",
  },
  {
    key: "timeframe",
    question: "Great. Over what timeframe do you want to reach your goal?",
    placeholder: "e.g. 8 weeks",
    options: ["4 weeks", "8 weeks", "12 weeks", "6 months"],
  },
  {
    key: "hours",
    question: "How many hours per day can you realistically study?",
    placeholder: "e.g. 1.5 hours",
    options: ["30 min", "1 hour", "1.5 hours", "2+ hours"],
  },
];

const replies: Record<string, string> = {
  skills: "Nice — got it. Let me factor in your background so we skip what you already know.",
  timeframe: "Perfect, that gives us a clear finish line to plan toward.",
  hours: "Awesome. Putting it together now…",
};

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const [done, setDone] = useState(false);
  const [collected, setCollected] = useState<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  useEffect(() => {
    const t = setTimeout(() => {
      setMessages([
        { id: nextId(), role: "assistant", content: steps[0].question },
      ]);
      setTyping(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  function send(value: string) {
    const text = value.trim();
    console.log(value)
    if (!text || done) return;

    const step = steps[stepIndex];
    setMessages((m) => [...m, { id: nextId(), role: "user", content: text }]);
    setInput("");
    setTyping(true);

    const updated = { ...collected, [step.key]: text };
    setCollected(updated);

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId(), role: "assistant", content: replies[step.key] },
      ]);

      if (stepIndex < steps.length - 1) {
        const next = stepIndex + 1;
        setStepIndex(next);
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            { id: nextId(), role: "assistant", content: steps[next].question },
          ]);
          setTyping(false);
        }, 700);
      } else {
        setDone(true);
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            {
              id: nextId(),
              role: "assistant",
              content: `Here's your plan summary:\n• Goal: ${updated.skills}\n• Timeframe: ${updated.timeframe}\n• Daily: ${updated.hours}\n\nYour full week-by-week roadmap is ready in "My Roadmaps".`,
            },
          ]);
          setTyping(false);
        }, 700);
      }
    }, 600);
  }

  const currentStep = steps[stepIndex];

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 py-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-bg">
          <Sparkles className="size-5" />
        </span>
        <div>
          <h1 className="text-lg font-semibold text-foreground">AI Assistant</h1>
          <p className="text-xs text-muted-foreground">
            {done ? "Roadmap ready" : `Step ${Math.min(stepIndex + 1, steps.length)} of ${steps.length}`}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-xl bg-surface/30 p-4"
      >
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={cn("flex items-end gap-2", m.role === "user" && "flex-row-reverse")}
          >
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full",
                m.role === "assistant"
                  ? "bg-accent text-bg"
                  : "bg-muted text-foreground"
              )}
            >
              {m.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
            </span>
            <div
              className={cn(
                "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm",
                m.role === "assistant"
                  ? "bg-bg text-foreground"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {m.content}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex items-end gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-bg">
              <Bot className="size-4" />
            </span>
            <div className="flex gap-1 rounded-2xl bg-bg px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-muted-foreground"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {!done && !typing && currentStep?.options && (
          <div className="flex flex-wrap gap-2">
            {currentStep.options.map((opt) => (
              <button
                key={opt}
                onClick={() => send(opt)}
                className="rounded-full border border-border bg-bg px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={done || typing}
            placeholder={done ? "Your roadmap is ready" : currentStep?.placeholder}
            className="h-10 flex-1 rounded-lg border border-border bg-bg px-4 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
          />
          <Button type="submit" size="icon-lg" disabled={done || typing || !input.trim()}>
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
