import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from "@/components/ui/fade-in"

const faqs = [
  {
    question: "What can Loom Ai help me with?",
    answer:
      "Almost anything you'd ask an assistant — explain a tricky concept, brainstorm ideas, draft an email, debug code, plan a project, or just chat through a problem. It follows the whole conversation as you go.",
  },
  {
    question: "Does Loom Ai remember our conversation?",
    answer:
      "Yes. Every message stays in the chat thread, so Loom Ai can reference earlier replies and build on them instead of starting from scratch each time.",
  },
  {
    question: "How is Loom Ai different from a search engine?",
    answer:
      "Instead of a list of links, Loom Ai gives you a direct, conversational answer you can follow up on. Ask for a simpler explanation or a rewrite and it adapts in real time.",
  },
  {
    question: "Can Loom Ai help with coding and technical work?",
    answer:
      "Definitely. Paste in an error, share a snippet, or describe what you're building and Loom Ai can explain, refactor, or suggest approaches. It's a thinking partner, not just an answer machine.",
  },
  {
    question: "Do I need to create an account to use Loom Ai?",
    answer:
      "You can open the chat and start talking right away. A free account lets you keep your history and pick up where you left off as new features roll out.",
  },
  {
    question: "Is there a cost to use Loom Ai?",
    answer:
      "Loom Ai has a free tier that covers everyday chat. Pro and Team plans unlock higher usage limits and advanced features as the product grows.",
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
            Everything you need to know about chatting with Loom Ai.
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
