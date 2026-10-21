import { Icon } from "./icons";

interface FaqItem {
  slug: string;
  question: string;
  answer: string;
}

/** Accessible FAQ list built on native <details>/<summary>. */
export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="border-t border-edge">
      {faqs.map((faq) => (
        <details key={faq.slug} className="group border-b border-edge">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-start text-lg font-medium transition-colors hover:text-brand-accent">
            {faq.question}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-edge transition-transform duration-300 group-open:rotate-45">
              <Icon name="close" className="size-3.5 rotate-45" />
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-soft/80">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
