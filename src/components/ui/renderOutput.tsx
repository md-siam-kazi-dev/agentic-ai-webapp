"use client";

import { useEffect, useState, type ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

function CodeBlock({ language, value }: { language?: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-border/60 bg-[#0b0b0f]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/50">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-white/90">
        <code className="font-mono">{value}</code>
      </pre>
    </div>
  );
}

const markdownComponents = {
  code({ className, children, ...props }: ComponentProps<"code">) {
    const match = /language-(\w+)/.exec(className || "");
    const text = String(children ?? "").replace(/\n$/, "");
    const isBlock = Boolean(match) || text.includes("\n");

    if (!isBlock) {
      return (
        <code
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }

    return <CodeBlock language={match?.[1]} value={text} />;
  },
  pre({ children }: ComponentProps<"pre">) {
    return <>{children}</>;
  },
};

export function StreamingMarkdown({ aiOutput }: { aiOutput: string }) {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 3;
      setShown(aiOutput.slice(0, i));
      if (i >= aiOutput.length) {
        clearInterval(id);
        setDone(true);
      }
    }, 14);
    return () => clearInterval(id);
  }, [aiOutput]);

  return (
    <div className="space-y-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {shown}
      </ReactMarkdown>
      {!done && (
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-foreground/60 align-middle" />
      )}
    </div>
  );
}

export default function RenderMarkdown({ aiOutput }: { aiOutput: string }) {
  return (
    <div className="space-y-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {aiOutput}
      </ReactMarkdown>
    </div>
  );
}
