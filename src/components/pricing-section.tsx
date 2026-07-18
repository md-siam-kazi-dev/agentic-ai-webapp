"use client";

// import Link from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "For curious minds getting started with Loom Ai.",
    features: [
      "50 messages a day",
      "Access to the core assistant",
      "Chat history saved to your library",
      "Web and mobile access",
    ],
    cta: "Start chatting",
    href: "/assistant",
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "per month",
    description: "For people who live in conversation.",
    features: [
      "Unlimited messages",
      "Priority model routing",
      "Longer memory across chats",
      "Export and organize history",
      "Early access to new features",
    ],
    cta: "Go Pro",
    href: "/register",
    featured: true,
  },
  {
    name: "Team",
    price: "$29",
    cadence: "per seat / month",
    description: "For teams that think out loud together.",
    features: [
      "Everything in Pro",
      "Shared team workspace",
      "Admin controls and billing",
      "SSO and priority support",
    ],
    cta: "Start a team",
    href: "/register",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

export function PricingSection() {
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="w-full px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
          <Sparkles className="size-4" />
          Pricing
        </span>
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Simple plans that grow with your curiosity
        </h2>
        <p className="max-w-xl text-base text-muted-foreground">
          Start free, upgrade when conversation becomes part of your day. No
          hidden fees, cancel anytime.
        </p>
      </div>

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "visible"}
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={item}
            whileHover={
              reduce
                ? undefined
                : { y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }
            }
            className={cn("flex", plan.featured ? "lg:-mt-2 lg:mb-2" : "")}
          >
            <Card
              className={cn(
                "group/card flex w-full flex-col gap-0 bg-gray-100 p-6 transition-[box-shadow,border-color] duration-200 dark:bg-[#1a1a1a]",
                "shadow-sm ring-1 ring-foreground/10 hover:shadow-lg",
                plan.featured && "ring-2 ring-accent"
              )}
            >
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-lg text-foreground">
                    {plan.name}
                  </CardTitle>
                  {plan.featured && (
                    <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                      Most popular
                    </span>
                  )}
                </div>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {plan.cadence}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="flex flex-col gap-3 text-left">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<Link href={plan.href} />}
                  className={cn(
                    "w-full",
                    plan.featured
                      ? ""
                      : "border-foreground/15"
                  )}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
