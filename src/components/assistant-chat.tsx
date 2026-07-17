"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, Copy, Sparkles, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { StreamingMarkdown } from "./ui/renderOutput";

type Role = "assistant" | "user";

type Message = {
  id: number;
  role: Role;
  content: string;
};

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const nextId = () => ++idRef.current;

  const pushMessage = useCallback((role: Role, content: string) => {
    setMessages((m) => [...m, { id: nextId(), role, content }]);
  }, []);

  async function copyText(id: number, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
    } catch {
      // ignore clipboard errors
    }
  }

  const empty = messages.length === 0 && !loading;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send() {
    const value = input.trim();
    if (!value || loading) return;

    const history = [...messages, { role: "user" as const, content: value }];
    pushMessage("user", value);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/grok", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      pushMessage("assistant", data.content);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      pushMessage("assistant", `Sorry, something went wrong: ${message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-6">
     

      {empty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
          <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-accent/15 text-accent">
              <Sparkles className="size-7" />
            </span>
            <p className="text-base">Hi, I&apos;m Loom Ai. Ask me anything to get started.</p>
          </div>

          <div className="w-full max-w-2xl">
            <InputBar
              input={input}
              setInput={setInput}
              send={send}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            ref={scrollRef}
            className="no-scrollbar flex-1 space-y-4 overflow-y-auto rounded-xl bg-surface/30 p-4"
          >
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn("flex flex-col gap-1", m.role === "user" ? "items-end" : "items-start")}
              >
                {m.role === "user" ? (
                  <div className="max-w-[85%] whitespace-pre-wrap px-1 text-[15px] leading-relaxed text-foreground">
                    {m.content}
                  </div>
                ) : (
                  <div className="w-full max-w-[85%]">
                    <div className="text-[15px] leading-relaxed text-foreground">
                      <StreamingMarkdown aiOutput={m.content} />
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => copyText(m.id, m.content)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Copy className="size-3.5" />
                        {copiedId === m.id ? "Copied" : "Copy"}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label="Like"
                      >
                        <ThumbsUp className="size-3.5" />
                        Like
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <div className="flex items-start">
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

          <div className="mt-4 w-full">
            <InputBar
              input={input}
              setInput={setInput}
              send={send}
              loading={loading}
              error={error}
            />
          </div>
        </>
      )}
    </div>
  );
}

function InputBar({
  input,
  setInput,
  send,
  loading,
  error,
}: {
  input: string;
  setInput: (v: string) => void;
  send: () => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Message Loom Ai…"
          className="h-14 bg-bg py-3 text-base"
          disabled={loading}
        />
        <Button
          onClick={send}
          disabled={loading || !input.trim()}
          className="h-14 shrink-0 px-4"
        >
          <ArrowUp className="size-5" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );
}