import type { PosFeatureGroup } from "./types";

export const posFeatureGroups: PosFeatureGroup[] = [
  {
    title: "Fast Checkout",
    icon: "creditCard",
    description:
      "A checkout flow designed for speed during rush hours — clear, simple and reliable for staff.",
    features: [
      "Quick product selection",
      "Order modifications and notes",
      "Multiple payment handling",
      "Fast daily operations",
    ],
  },
  {
    title: "Multi-Terminal Operation",
    icon: "monitor",
    description:
      "Run several POS terminals together on the same local network, sharing products, orders and reports.",
    features: [
      "Multiple terminals per location",
      "Shared product catalog",
      "Synchronized orders",
      "Station-specific roles",
    ],
  },
  {
    title: "Offline Local-Network Mode",
    icon: "wifiOff",
    description:
      "Modexa POS runs on your local network, so sales continue even when the internet goes down.",
    features: [
      "No internet required for daily work",
      "Local-network synchronization",
      "Stable operation during outages",
      "Designed for real-world conditions",
    ],
  },
  {
    title: "Kitchen, Bar & Receipt Printing",
    icon: "printer",
    description:
      "Route orders to the right station automatically — kitchen tickets, bar tickets and customer receipts.",
    features: [
      "Kitchen printing",
      "Bar printing",
      "Receipt printing",
      "Printer roles per station",
    ],
  },
  {
    title: "Inventory Management",
    icon: "package",
    description:
      "Track stock levels, organize products and keep inventory aligned with what actually sells.",
    features: [
      "Product and category management",
      "Stock level tracking",
      "Inventory adjustments",
      "Low-stock visibility",
    ],
  },
  {
    title: "Employee Management",
    icon: "users",
    description:
      "Manage staff accounts, roles and permissions so everyone sees exactly what they need.",
    features: [
      "Staff accounts and roles",
      "Permission control",
      "Activity overview",
      "Per-employee reporting",
    ],
  },
  {
    title: "Customer Management",
    icon: "star",
    description:
      "Keep track of customers and their history to build better relationships and repeat business.",
    features: [
      "Customer records",
      "Purchase history",
      "Customer-linked orders",
      "Foundation for loyalty features",
    ],
  },
  {
    title: "Sales Reports & Analytics",
    icon: "chart",
    description:
      "Modern dashboards that turn daily sales into clear insights about your business.",
    features: [
      "Daily and periodic sales reports",
      "Best-seller insights",
      "Revenue overviews",
      "Business analytics dashboards",
    ],
  },
  {
    title: "Multi-Branch Support",
    icon: "building",
    description:
      "Grow from one location to many — Modexa POS is designed with multi-branch businesses in mind.",
    features: [
      "Per-branch configuration",
      "Branch-level reporting",
      "Consistent product data",
      "Built to scale with you",
    ],
  },
  {
    title: "Secure Backups",
    icon: "shield",
    description:
      "Automatic, secure backups protect your sales data so it can be restored when hardware fails.",
    features: [
      "Automatic backup routines",
      "Safe data restoration",
      "Protection against device failure",
      "Peace of mind for owners",
    ],
  },
  {
    title: "License Management & Updates",
    icon: "refresh",
    description:
      "Licensing and automatic updates are built in, keeping every terminal current without manual work.",
    features: [
      "License management",
      "Automatic updates",
      "Version consistency across terminals",
      "No manual installation rounds",
    ],
  },
  {
    title: "Modern Dashboard Interface",
    icon: "layout",
    description:
      "A clean, modern interface that staff learn quickly and owners actually enjoy using.",
    features: [
      "Clear, modern UI",
      "Fast staff onboarding",
      "Owner-focused dashboards",
      "Designed for daily use",
    ],
  },
];

export const posIndustries = [
  { name: "Restaurants", icon: "utensils" },
  { name: "Cafés", icon: "clock" },
  { name: "Bars", icon: "star" },
  { name: "Retail stores", icon: "store" },
  { name: "Shops", icon: "cart" },
  { name: "Multi-branch businesses", icon: "building" },
] as const;
