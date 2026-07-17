import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from "@/components/ui/fade-in"

const faqs = [
  {
    question: "Does Pathwise account for skills I already know?",
    answer:
      "Yes. Before generating your roadmap, the AI asks about the technologies and skills you already have. It then skips topics you've mastered and focuses your time on what's new, so you're never relearning the basics.",
  },
  {
    question: "Can I edit my roadmap after it's generated?",
    answer:
      "Absolutely. Every generated roadmap can be tweaked — adjust the duration, pace, or weekly topics before you save it. Your saved roadmaps live in 'My Roadmaps' and stay fully editable.",
  },
  {
    question: "How is a time-boxed roadmap different from a generic tutorial list?",
    answer:
      "Generic lists tell you what to learn; Pathwise tells you when. It spreads topics across the exact weeks and daily hours you have available, giving you a realistic, week-by-week plan instead of an endless checklist.",
  },
  {
    question: "What if I miss a few days or fall behind?",
    answer:
      "Roadmaps are flexible. You can regenerate a variation with a new pace, extend the timeline, or ask the AI assistant to 'make it more realistic' based on your current progress.",
  },
  {
    question: "Do I need to create an account to use Pathwise?",
    answer:
      "You can browse the public roadmap library without an account. To generate a personalized roadmap, save plans, and track progress, you'll need a free account — sign up takes seconds.",
  },
  {
    question: "Is there a cost to use Pathwise?",
    answer:
      "Pathwise has a free tier that covers personalized roadmaps and progress tracking. Pro and Team plans unlock advanced features like shared team roadmaps and finer control over output detail.",
  },
]

export function FaqSection() {
  return (
    <section className="w-full bg-surface/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb-10 text-center">
          <span className="inline-flex items-center rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
            Questions
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-foreground/80">
            Everything you need to know about building your personalized learning
            roadmap with Pathwise.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Accordion multiple={false} className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-foreground/50">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  )
}
