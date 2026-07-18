import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { Marquee } from "@/components/ui/marquee";

type Review = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  topic: string;
  createdAt: string;
};

const reviews: Review[] = [
  {
    id: "rev_001",
    name: "Priya Sharma",
    role: "Frontend Developer",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    comment:
      "Explained a tricky React hook in plain English, then rewrote it cleaner when I asked. Feels like talking to a teammate.",
    topic: "Debugging React hooks",
    createdAt: "2026-05-12T09:30:00.000Z",
  },
  {
    id: "rev_002",
    name: "Daniel Osei",
    role: "CS Student",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment:
      "Helped me outline my whole thesis in one chat. Follow-up answers actually built on what we'd already discussed.",
    topic: "Planning a research project",
    createdAt: "2026-04-28T14:15:00.000Z",
  },
  {
    id: "rev_003",
    name: "Maria Fernandez",
    role: "UX Designer",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    rating: 4,
    comment:
      "Drafted three versions of a client email and tweaked the tone on command. Saved me ages.",
    topic: "Writing emails",
    createdAt: "2026-06-03T18:42:00.000Z",
  },
  {
    id: "rev_004",
    name: "Tom Nguyen",
    role: "Backend Engineer",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    comment:
      "Pasted an error log and it walked me to the fix step by step. Didn't just dump code — it explained why.",
    topic: "Tracing a server bug",
    createdAt: "2026-05-20T11:05:00.000Z",
  },
  {
    id: "rev_005",
    name: "Aisha Rahman",
    role: "Self-taught learner",
    avatarUrl: "https://i.pravatar.cc/150?img=25",
    rating: 4,
    comment:
      "Broke a hard concept down to my level, then leveled up when I was ready. Real back-and-forth.",
    topic: "Learning system design",
    createdAt: "2026-06-15T08:20:00.000Z",
  },
  {
    id: "rev_006",
    name: "Jonas Weber",
    role: "Bootcamp graduate",
    avatarUrl: "https://i.pravatar.cc/150?img=53",
    rating: 5,
    comment:
      "Brainstormed side-project ideas with me, then turned the best one into a starter plan. Genuinely useful.",
    topic: "Ideating a side project",
    createdAt: "2026-03-30T16:00:00.000Z",
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <Card className="w-80 gap-4 border-[color-mix(in_oklch,var(--color-dark),transparent_82%)] bg-bg p-5 shadow-sm dark:border-[color-mix(in_oklch,var(--color-surface),transparent_85%)]">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <img src={review.avatarUrl} alt={review.name} />
        </Avatar>
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{review.name}</p>
          <p className="truncate text-sm text-muted-foreground">{review.role}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/80">
        &ldquo;{review.comment}&rdquo;
      </p>
      <p className="mt-auto text-xs font-medium text-accent">
        {review.topic}
      </p>
    </Card>
  );
}

export function ReviewSection() {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="w-full max-w-full min-w-0 overflow-hidden bg-surface/40 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
            Loved by learners
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-foreground/80">
            Real conversations, real help. Here&apos;s what people are saying about Loom Ai.
          </p>
        </FadeIn>
      </div>

      <div className="relative mt-12 flex w-full max-w-full min-w-0 flex-col items-center justify-center gap-4 overflow-hidden">
        <Marquee className="[--duration:45s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>
        <Marquee reverse className="[--duration:45s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-r from-surface/40 via-transparent to-surface/40" />
      </div>
    </section>
  );
}
