import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { FaqSection } from "@/components/faq-section";
import { ReviewSection } from "@/components/review-section";
import { TrustedBySection } from "@/components/trusted-by-section";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-full flex-col items-center gap-8 overflow-x-hidden px-4 py-20 text-center sm:px-6 lg:px-8">
      <FadeIn>
        <span className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
          AI chat, reimagined
        </span>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Loom Ai — your AI assistant for anything
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="max-w-xl text-lg text-muted-foreground">
          Ask questions, brainstorm ideas, and get clear answers. Loom Ai is a
          simple, fast chat built for real conversations.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/assistant" />}>
            Start chatting
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="/register" />}>
            Create account
          </Button>
        </div>
      </FadeIn>

      <FadeIn>
        <TrustedBySection />
      </FadeIn>

      <FadeIn>
        <ReviewSection />
      </FadeIn>

      <FaqSection />
    </main>
  );
}
