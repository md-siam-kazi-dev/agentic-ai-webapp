import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { FaqSection } from "@/components/faq-section";
import { ReviewSection } from "@/components/review-section";
import { TrustedBySection } from "@/components/trusted-by-section";

export default function HomePage() {
  return (
    <main className="mx-auto flex  flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8">
      <FadeIn>
        <span className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
          AI-powered learning roadmaps
        </span>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Learn anything, on your schedule
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p className="max-w-xl text-lg text-muted-foreground">
          Pathwise generates a personalized, time-boxed learning roadmap after a short
          AI conversation about your skills, timeline, and daily availability.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="/register" />}>
            Start with the AI Assistant
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/explore" />}>
            Browse Roadmaps
          </Button>
        </div>
      </FadeIn>
      <TrustedBySection />
      <FaqSection />
      <ReviewSection />
    </main>
  );
}
