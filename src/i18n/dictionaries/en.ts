/**
 * Interface strings (navigation, buttons, forms, errors, demo labels).
 * Editorial content — headings, descriptions, services, FAQs — lives in
 * content/ and is edited through Pages CMS instead.
 *
 * The Arabic dictionary must mirror this shape exactly (enforced by type).
 */
export const en = {
  meta: {
    siteTitle: "Modexa — Software for businesses that want to work better",
    siteDescription:
      "Modexa designs and builds websites, web applications, AI agents, business automation, custom software and Modexa POS — explained in plain language and supported after launch.",
    ogLocale: "en_US",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Modexa — home",
    footerNav: "Footer",
  },
  nav: {
    pos: "Modexa POS",
    services: "Services",
    work: "Work",
    about: "About",
    contact: "Contact",
    cta: "Start a project",
  },
  language: {
    label: "Language",
    switchTo: "العربية",
    switchToShort: "ع",
    switchToName: "Switch to Arabic",
  },
  common: {
    startProject: "Start a project",
    requestQuote: "Request a quote",
    requestDemo: "Request a demo",
    contactUs: "Contact us",
    seePos: "See Modexa POS",
    learnMore: "Learn more",
    allServices: "All services",
    viewProject: "View project",
    visitWebsite: "Visit website",
    backHome: "Back to home",
    sampleData: "Sample data",
  },
  footer: {
    tagline:
      "Websites, business software, automation and Modexa POS — built by one team that explains things clearly.",
    columns: {
      services: "Services",
      company: "Company",
      legal: "Legal",
    },
    links: {
      services: "All services",
      websites: "Websites",
      aiAutomation: "AI & Automation",
      products: "Products",
      pos: "Modexa POS",
      about: "About",
      work: "Work",
      customers: "Customers",
      contact: "Contact",
      quote: "Request a quote",
      privacy: "Privacy policy",
      terms: "Terms of service",
    },
    rights: "All rights reserved.",
  },
  forms: {
    required: "Required",
    selectPlaceholder: "Select an option",
    sending: "Sending…",
    fields: {
      fullName: "Full name",
      yourName: "Your name",
      businessName: "Business name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      country: "Country",
      service: "What do you need?",
      budget: "Estimated budget",
      contactMethod: "Preferred contact method",
      description: "Tell us about your project",
      descriptionPlaceholder:
        "In your own words: what does your business do, and what would you like to improve?",
      timeline: "When would you like it ready?",
      industry: "Type of business",
      industryPlaceholder: "e.g. restaurant, shop, clinic, consultancy",
      goals: "What should this project achieve?",
      goalsPlaceholder:
        "For example: take bookings online, stop losing sales when the internet drops, answer customer questions faster…",
      features: "Anything you already know you need",
      featuresPlaceholder: "A list is fine — features, pages, integrations…",
      existingUrl: "Current website (if any)",
      notes: "Anything else we should know?",
      consent:
        "I agree that Modexa may store my details and contact me about this request.",
    },
    errors: {
      fullName: "Please enter your full name.",
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      service: "Please choose what you need.",
      description: "Please describe your project in a few sentences.",
      goals: "Please describe what the project should achieve in a few sentences.",
      consent: "Please agree so we can reply to your request.",
      contactNotConfigured:
        "The contact form isn't connected yet. Please email us directly instead.",
      quoteNotConfigured:
        "The quote form isn't connected yet. Please email us directly instead.",
      sendFailed:
        "Something went wrong while sending. Your details are still here — please try again.",
    },
    contact: {
      submit: "Send message",
      successTitle: "Message received",
      successBody:
        "Thank you for contacting Modexa. A member of the team will read your message and reply personally.",
      again: "Send another message",
    },
    quote: {
      submit: "Request my quote",
      successTitle: "Request received",
      successBody:
        "Thank you. We'll review your project and reply with a recommendation and a custom quote. Nothing is priced automatically.",
      again: "Submit another request",
    },
    options: {
      service: [
        { value: "Modexa POS", label: "Modexa POS" },
        { value: "Business Website", label: "Business website" },
        { value: "Portfolio Website", label: "Portfolio website" },
        { value: "E-commerce Website", label: "Online store" },
        { value: "Web Application", label: "Web application" },
        { value: "AI Agent", label: "AI agent" },
        { value: "Business Automation", label: "Business automation" },
        { value: "Custom Software", label: "Custom software" },
        { value: "API Integration", label: "Connecting systems (API)" },
        { value: "Maintenance & Support", label: "Maintenance & support" },
        { value: "Other", label: "Something else / not sure" },
      ],
      budget: [
        { value: "To be discussed", label: "Not sure yet — let's discuss" },
        { value: "Under $1,000", label: "Under $1,000" },
        { value: "$1,000 – $5,000", label: "$1,000 – $5,000" },
        { value: "$5,000 – $15,000", label: "$5,000 – $15,000" },
        { value: "$15,000+", label: "$15,000+" },
      ],
      timeline: [
        { value: "Flexible", label: "Flexible" },
        { value: "Within 1 month", label: "Within 1 month" },
        { value: "1 – 3 months", label: "1 – 3 months" },
        { value: "3 – 6 months", label: "3 – 6 months" },
        { value: "6+ months", label: "More than 6 months" },
      ],
      contactMethod: [
        { value: "Email", label: "Email" },
        { value: "Phone", label: "Phone" },
        { value: "WhatsApp", label: "WhatsApp" },
      ],
    },
  },
  portfolio: {
    filtersLabel: "Filter projects by category",
    all: "All",
    empty: "No projects in this category yet.",
    categories: {
      websites: "Websites",
      "modexa-pos": "Modexa POS",
      ai: "AI",
      automation: "Automation",
      "web-applications": "Web applications",
    },
    status: {
      concept: "Concept",
      "in-progress": "In progress",
      completed: "Completed",
    },
    previewAlt: "preview",
  },
  products: {
    status: {
      available: "Available now",
      "coming-soon": "Coming soon",
      "in-development": "In development",
      "by-request": "Built on request",
    },
  },
  customers: {
    searchLabel: "Search customers",
    searchPlaceholder: "Search by name or industry",
    allTypes: "All",
    empty: "No customers match your search.",
  },
  posDemo: {
    label: "Interactive demo",
    disclaimer:
      "Interactive demonstration with sample data — it shows how Modexa POS works, but it is not the live product.",
    tabs: {
      order: "Take an order",
      kitchen: "Send to kitchen",
      sales: "Today's sales",
      stock: "Low stock",
    },
    tabHints: {
      order: "Tap items to add them to the ticket.",
      kitchen: "Each item prints at the right station automatically.",
      sales: "Daily totals, payment split and every invoice.",
      stock: "See what's running low and restock in one tap.",
    },
    network: {
      label: "Internet",
      online: "Online",
      offline: "Offline",
      localOk: "Local network connected — the POS keeps working",
      toggle: "Simulate an internet outage",
    },
    terminal: "Terminal 1 · Counter",
    categories: { all: "All", food: "Food", drinks: "Drinks", desserts: "Desserts" },
    items: {
      chicken: "Grilled chicken",
      burger: "Beef burger",
      fattoush: "Fattoush salad",
      fries: "Fries",
      lemonade: "Fresh lemonade",
      espresso: "Espresso",
      water: "Water",
      cake: "Chocolate cake",
    },
    ticket: "Current ticket",
    table: "Table 4",
    emptyTicket: "No items yet — tap a product.",
    subtotal: "Subtotal",
    total: "Total",
    charge: "Charge",
    clear: "Clear",
    sendOrder: "Send order",
    sent: "Sent to stations",
    stations: {
      kitchen: "Kitchen printer",
      bar: "Bar printer",
      receipt: "Receipt printer",
    },
    orderNo: "Order",
    printing: "Printing",
    printed: "Printed",
    noItemsForStation: "Nothing for this station",
    totalSales: "Total sales",
    rate: "rate",
    cashSales: "Cash sales",
    ledger: "Ledger",
    recentInvoices: "Recent invoices",
    invoiceNo: "Invoice",
    method: "Payment",
    amount: "Total",
    status: "Status",
    completed: "Completed",
    cash: "Cash USD",
    watchlist: "Low stock watchlist",
    stockLabel: "Stock",
    minLabel: "Min",
    restock: "Restock +20",
    restockAria: "Add 20 units of",
    stockItems: {
      onions: "Onions",
      carrots: "Carrots",
      fish: "Fish fillet",
      lemons: "Lemons",
    },
    ok: "OK",
    low: "Low",
  },
  walkthrough: {
    play: "Play",
    pause: "Pause",
    replay: "Replay",
    steps: "Walkthrough steps",
    step: "Step",
  },
  notFound: {
    eyebrow: "404 — Page not found",
    title: "We couldn't find that page.",
    body: "It may have moved, or the link may be wrong. You can go back home or tell us what you were looking for.",
    servicesLink: "Or browse our services",
  },
};

type DeepString<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? DeepString<U>[]
    : { [K in keyof T]: DeepString<T[K]> };

export type Dictionary = DeepString<typeof en>;
