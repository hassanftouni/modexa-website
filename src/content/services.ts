import type { Service } from "./types";

export const services: Service[] = [
  {
    slug: "website-development",
    name: "Website Development",
    icon: "globe",
    shortDescription:
      "Modern, responsive and high-performance websites for businesses, startups and professionals.",
    problem:
      "An outdated or slow website costs credibility and customers. Many businesses still rely on sites that don't work well on mobile, load slowly or fail to communicate what they actually offer.",
    solution:
      "Modexa designs and develops fast, responsive websites with a clear structure, modern design and an SEO-ready foundation — built to represent your business professionally on every device.",
    benefits: [
      "Professional first impression",
      "Fast loading and mobile-first",
      "SEO-ready structure",
      "Easy to extend as you grow",
    ],
    features: [
      "Custom design matched to your brand",
      "Responsive layouts for all screen sizes",
      "Performance and Core Web Vitals optimization",
      "Contact and lead-capture forms",
      "Analytics integration possibilities",
      "Secure deployment on modern hosting",
    ],
    examples: [
      "Company presentation website",
      "Restaurant website with menu",
      "Local business website with booking contact",
    ],
  },
  {
    slug: "portfolio-websites",
    name: "Portfolio Websites",
    icon: "layout",
    shortDescription:
      "Professional personal websites for developers, designers, freelancers, students and business professionals.",
    problem:
      "A CV alone rarely shows what you can really do. Professionals without a strong online presence lose opportunities to those who present their work well.",
    solution:
      "Modexa builds elegant personal websites that present your work, skills and experience in a way that makes a lasting impression on employers and clients.",
    benefits: [
      "Stand out from other candidates",
      "Present projects visually",
      "One professional link for CVs and profiles",
      "Personal branding that feels premium",
    ],
    features: [
      "Personal branding and custom design",
      "Project showcase sections",
      "About, skills and experience pages",
      "Contact form and social links",
      "Fast, SEO-friendly and mobile-ready",
    ],
    examples: [
      "Developer portfolio with project case studies",
      "Designer portfolio with visual galleries",
      "Freelancer website with services and contact",
    ],
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    icon: "cart",
    shortDescription:
      "Online stores with product management, secure checkout and modern customer experiences.",
    problem:
      "Selling only offline — or through a clunky store — limits growth. Customers expect smooth browsing, clear product pages and a trustworthy checkout.",
    solution:
      "Modexa builds online stores with clean product presentation, organized catalogs and secure checkout flows, designed to convert visitors into customers.",
    benefits: [
      "Sell online around the clock",
      "Professional shopping experience",
      "Organized product management",
      "Built to scale with your catalog",
    ],
    features: [
      "Product catalog and category structure",
      "Shopping cart and secure checkout integration",
      "Order and inventory management options",
      "Payment provider integrations",
      "Mobile-optimized shopping experience",
    ],
    examples: [
      "Retail store selling products online",
      "Restaurant with online ordering",
      "Brand store with a curated catalog",
    ],
  },
  {
    slug: "web-applications",
    name: "Custom Web Applications",
    icon: "appWindow",
    shortDescription:
      "Dashboards, booking systems, internal tools, inventory systems and customer platforms.",
    problem:
      "Spreadsheets and manual processes break down as a business grows. Off-the-shelf tools rarely fit the way a specific business actually works.",
    solution:
      "Modexa develops custom web applications — dashboards, booking systems, internal tools and customer platforms — designed around your real workflow.",
    benefits: [
      "Software that matches your process",
      "One place for your business data",
      "Less manual work and fewer errors",
      "Access from any device",
    ],
    features: [
      "Custom dashboards and reporting",
      "Booking and scheduling systems",
      "Inventory and stock management",
      "Customer and staff management",
      "Role-based access control",
      "API integrations with your existing tools",
    ],
    examples: [
      "Booking system for a clinic or salon",
      "Internal inventory dashboard",
      "Customer portal for a service business",
    ],
  },
  {
    slug: "ai-agents",
    name: "AI Agents",
    icon: "bot",
    shortDescription:
      "Intelligent agents that can answer questions, support customers, process information and automate repetitive tasks.",
    problem:
      "Teams spend hours every day answering the same questions, qualifying leads and moving information between systems — work that is repetitive but still needs to be done well.",
    solution:
      "Modexa designs AI agents around your business knowledge and processes. They can answer customer questions, qualify leads, assist with bookings and handle repetitive information work — with humans staying in control.",
    benefits: [
      "Faster responses for customers",
      "Team time freed for real work",
      "Consistent, accurate answers",
      "Available outside business hours",
    ],
    features: [
      "AI customer-support agents",
      "Lead qualification agents",
      "Appointment and booking assistants",
      "Knowledge-base question answering",
      "Website chat integration",
      "Escalation to human staff when needed",
    ],
    examples: [
      "Support agent trained on your service catalog",
      "Lead qualification assistant for a sales team",
      "FAQ assistant for a booking business",
    ],
  },
  {
    slug: "business-automation",
    name: "Business Automation",
    icon: "workflow",
    shortDescription:
      "Automated workflows for emails, leads, customer support, reporting, scheduling and operations.",
    problem:
      "Manual, repetitive processes — copying data, sending follow-ups, compiling reports — quietly consume time and introduce mistakes.",
    solution:
      "Modexa maps your existing workflow and automates the repetitive parts: email flows, lead handling, notifications, reporting and internal operations, tailored to how your business runs.",
    benefits: [
      "Hours saved every week",
      "Fewer manual errors",
      "Faster follow-ups and responses",
      "Processes that scale with you",
    ],
    features: [
      "Automated email workflows",
      "Lead collection and routing",
      "Scheduled report generation",
      "Internal notifications and alerts",
      "Customer follow-up sequences",
      "Data synchronization between tools",
    ],
    examples: [
      "Automatic follow-up flow for new leads",
      "Weekly sales report generation",
      "Automated appointment reminders",
    ],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    icon: "code",
    shortDescription:
      "Software designed specifically for the customer's business requirements.",
    problem:
      "Generic software forces businesses to change how they work. Critical requirements end up handled with workarounds or not at all.",
    solution:
      "Modexa builds software from your requirements up — desktop, web or hybrid — so the system fits the business instead of the other way around.",
    benefits: [
      "Exactly the features you need",
      "No licensing lock-in surprises",
      "Grows with your business",
      "Direct line to the team that built it",
    ],
    features: [
      "Requirements analysis and planning",
      "Custom business logic and workflows",
      "Desktop and web application options",
      "Local-network and offline capabilities",
      "Integration with existing systems",
      "Ongoing support and maintenance agreements",
    ],
    examples: [
      "A POS system tailored to a restaurant's flow",
      "License and update management tooling",
      "Industry-specific management software",
    ],
  },
  {
    slug: "api-integrations",
    name: "API Integrations",
    icon: "plug",
    shortDescription:
      "Connect websites and software with payment systems, messaging services, CRMs, databases and third-party platforms.",
    problem:
      "Disconnected tools mean double data entry and information that never quite matches. Systems that can't talk to each other slow everything down.",
    solution:
      "Modexa connects your website and software to the services you rely on — payments, messaging, CRMs, databases and other platforms — with secure, reliable integrations.",
    benefits: [
      "Systems that share data automatically",
      "No more double entry",
      "Real-time information flow",
      "Secure, maintained connections",
    ],
    features: [
      "Payment gateway integrations",
      "Messaging service connections",
      "CRM and database synchronization",
      "Third-party platform APIs",
      "Custom REST API development",
      "Webhook-based automations",
    ],
    examples: [
      "Payment provider connected to an online store",
      "Website leads synced to a CRM",
      "Order notifications sent to a messaging channel",
    ],
  },
  {
    slug: "maintenance-support",
    name: "Maintenance & Support",
    icon: "wrench",
    shortDescription:
      "Updates, monitoring, improvements and technical support that keep your software healthy after launch.",
    problem:
      "Software is never truly finished. Without updates and monitoring, small issues grow, security drifts and performance degrades over time.",
    solution:
      "Modexa offers maintenance and support agreements: updates, fixes, monitoring and continuous improvements — so your product stays fast, secure and reliable.",
    benefits: [
      "A product that keeps improving",
      "Issues caught before customers notice",
      "Predictable support when you need it",
      "Security kept up to date",
    ],
    features: [
      "Regular updates and dependency maintenance",
      "Bug fixing and issue resolution",
      "Performance monitoring",
      "Backup verification",
      "Feature improvements over time",
      "Agreed response times",
    ],
    examples: [
      "Monthly maintenance for a business website",
      "Support agreement for a POS deployment",
      "Continuous improvement of a web application",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
