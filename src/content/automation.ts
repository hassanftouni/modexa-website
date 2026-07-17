import type { AutomationUseCase } from "./types";

const availabilityNote = "Can be developed based on project requirements.";

export const aiAgents: AutomationUseCase[] = [
  {
    name: "AI customer-support agent",
    icon: "message",
    description:
      "Answers customer questions using your business knowledge, around the clock, and hands over to your team when needed.",
    availability: availabilityNote,
  },
  {
    name: "AI lead qualification agent",
    icon: "users",
    description:
      "Collects visitor details, asks the right qualifying questions and routes serious leads to your team.",
    availability: availabilityNote,
  },
  {
    name: "AI appointment assistant",
    icon: "calendar",
    description:
      "Helps customers find available times and request bookings without waiting for a reply.",
    availability: availabilityNote,
  },
  {
    name: "Website or WhatsApp chatbot",
    icon: "bot",
    description:
      "Conversational chat on your website — with messaging-channel integrations such as WhatsApp available based on project requirements.",
    availability: availabilityNote,
  },
];

export const automationUseCases: AutomationUseCase[] = [
  {
    name: "Customer support automation",
    icon: "message",
    description:
      "Frequently asked questions answered instantly, tickets organized and routed to the right person.",
  },
  {
    name: "Lead automation",
    icon: "zap",
    description:
      "New leads captured from your website, stored centrally and followed up automatically.",
  },
  {
    name: "Booking automation",
    icon: "calendar",
    description:
      "Appointment requests, confirmations and reminders handled without manual back-and-forth.",
  },
  {
    name: "Email workflows",
    icon: "mail",
    description:
      "Welcome sequences, follow-ups and notifications sent automatically at the right moments.",
  },
  {
    name: "Data-processing automation",
    icon: "database",
    description:
      "Repetitive data entry, transfers between systems and formatting work done automatically.",
  },
  {
    name: "Reporting automation",
    icon: "chart",
    description:
      "Sales, operations and performance reports generated and delivered on a schedule.",
  },
  {
    name: "Internal notifications",
    icon: "bot",
    description:
      "The right people notified automatically when orders, leads or issues need attention.",
  },
  {
    name: "Custom AI integrations",
    icon: "cpu",
    description:
      "AI capabilities embedded into your existing tools and workflows, designed around your process.",
    availability: availabilityNote,
  },
];
