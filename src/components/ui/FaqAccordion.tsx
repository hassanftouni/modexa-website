import type { Faq } from "@/content/types";
import { Icon } from "./icons";

/** Accessible FAQ list built on native <details>/<summary>. */
export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="card-surface group rounded-xl px-6 py-4 open:border-white/20"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium [&::-webkit-details-marker]:hidden">
            {faq.question}
            <Icon
              name="chevronDown"
              className="size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="pt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
