import type { Product } from "./types";

export const productStatusLabels: Record<Product["status"], string> = {
  available: "Available",
  "coming-soon": "Coming soon",
  "in-development": "In development",
  "by-request": "Available by request",
};

export const products: Product[] = [
  {
    slug: "modexa-pos",
    name: "Modexa POS",
    icon: "monitor",
    status: "available",
    shortDescription:
      "A complete point-of-sale platform for restaurants, cafés, bars and retail — checkout, inventory, employees, printing and insights in one system.",
    highlights: [
      "Fast checkout with multiple terminals",
      "Offline local-network operation",
      "Kitchen, bar and receipt printing",
      "Inventory, employees and analytics",
    ],
    href: "/products/modexa-pos",
  },
  {
    slug: "business-dashboards",
    name: "Business Dashboards",
    icon: "chart",
    status: "by-request",
    shortDescription:
      "Custom dashboards that bring your sales, operations and customer data into one clear, live overview.",
    highlights: [
      "Live KPIs and reports",
      "Data from your existing tools",
      "Role-based access",
      "Built around your metrics",
    ],
  },
  {
    slug: "booking-systems",
    name: "Booking Systems",
    icon: "calendar",
    status: "by-request",
    shortDescription:
      "Online booking and scheduling platforms for appointments, reservations and resource management.",
    highlights: [
      "Online appointment booking",
      "Automated reminders",
      "Staff and resource scheduling",
      "Customer self-service",
    ],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    icon: "code",
    status: "by-request",
    shortDescription:
      "Software built from your requirements — internal tools, management systems and industry-specific platforms.",
    highlights: [
      "Designed around your workflow",
      "Web, desktop or hybrid",
      "Integrations with your tools",
      "Long-term support options",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
