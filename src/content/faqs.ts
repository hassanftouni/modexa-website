import type { Faq } from "./types";

/** General FAQs used on the contact / quote pages. */
export const generalFaqs: Faq[] = [
  {
    question: "How much does a project cost?",
    answer:
      "Every project is different, so Modexa doesn't use fixed price lists. After a short discovery conversation about your goals and requirements, you receive a clear custom quote — with no obligation.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused business website can often be delivered in a few weeks, while larger platforms and custom software take longer. You get a realistic timeline as part of your quote.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. Modexa offers maintenance and support agreements covering updates, fixes, monitoring and improvements based on what your project needs.",
  },
  {
    question: "Can Modexa work with my existing systems?",
    answer:
      "In most cases, yes. Modexa builds API integrations that connect new software with payment systems, messaging services, CRMs, databases and other platforms you already use.",
  },
];

/** FAQs specific to Modexa POS, shown on the product page. */
export const posFaqs: Faq[] = [
  {
    question: "Does Modexa POS work without internet?",
    answer:
      "Yes. Modexa POS is designed to run on your local network, so checkout, printing and daily operations keep working even when the internet connection drops.",
  },
  {
    question: "Can I run more than one terminal?",
    answer:
      "Yes. Multiple POS terminals can operate together on the same local network, sharing products, orders and reporting.",
  },
  {
    question: "Which businesses is Modexa POS designed for?",
    answer:
      "Modexa POS is built for restaurants, cafés, bars, retail stores and shops — from single locations to growing multi-branch businesses.",
  },
  {
    question: "Does it support kitchen and receipt printing?",
    answer:
      "Yes. Orders can be routed to kitchen and bar printers, and customer receipts print at the counter — with printer roles configured per station.",
  },
  {
    question: "How is my data protected?",
    answer:
      "Modexa POS includes secure backup functionality so your sales and business data can be restored if something goes wrong with a device.",
  },
  {
    question: "How do updates and licensing work?",
    answer:
      "Modexa POS includes license management and automatic updates, so your system stays current without manual installation work. Details are agreed as part of your quote.",
  },
];
