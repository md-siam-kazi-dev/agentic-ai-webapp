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
  roadmapTitle: string;
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
      "Built me a Next.js roadmap that skipped what I already knew. Finally feels personalized.",
    roadmapTitle: "Learn Next.js from React",
    createdAt: "2026-05-12T09:30:00.000Z",
  },
  {
    id: "rev_002",
    name: "Daniel Osei",
    role: "CS Student",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    comment:
      "Weekly hour breakdown kept me from burning out. Timeline actually felt doable.",
    roadmapTitle: "Learn Python for Data Science",
    createdAt: "2026-04-28T14:15:00.000Z",
  },
  {
    id: "rev_003",
    name: "Maria Fernandez",
    role: "UX Designer transitioning to dev",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    rating: 4,
    comment:
      "Regenerated twice for a slower pace, got real variation each time. Solid.",
    roadmapTitle: "Learn Frontend Development",
    createdAt: "2026-06-03T18:42:00.000Z",
  },
  {
    id: "rev_004",
    name: "Tom Nguyen",
    role: "Backend Engineer",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    rating: 5,
    comment:
      "Asked about my background first, then adjusted the plan for it. Not generic.",
    roadmapTitle: "Learn Go for Backend Development",
    createdAt: "2026-05-20T11:05:00.000Z",
  },
  {
    id: "rev_005",
    name: "Aisha Rahman",
    role: "Self-taught learner",
    avatarUrl: "https://i.pravatar.cc/150?img=25",
    rating: 4,
    comment:
      "Felt like a mentor, not a form. Talked me down to a more sustainable pace.",
    roadmapTitle: "Learn Data Structures & Algorithms",
    createdAt: "2026-06-15T08:20:00.000Z",
  },
  {
    id: "rev_006",
    name: "Jonas Weber",
    role: "Bootcamp graduate",
    avatarUrl: "https://i.pravatar.cc/150?img=53",
    rating: 5,
    comment:
      "Actual plan instead of an endless YouTube playlist. Stuck with it every week.",
    roadmapTitle: "Learn TypeScript Deeply",
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
        {review.roadmapTitle}
      </p>
    </Card>
  );
}

export function ReviewSection() {
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="w-full bg-surface/40 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <span className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
            Loved by learners
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What our users are saying
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-foreground/80">
            Real roadmaps, real progress. Here&apos;s what people built with Pathwise.
          </p>
        </FadeIn>
      </div>

      <div className="relative mt-12 flex w-full flex-col items-center justify-center gap-4 overflow-hidden">
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
