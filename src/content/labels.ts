import type { PortfolioCategory, ProjectStatus } from "./types";

/** Display labels shared by server and client components (no fs imports here). */
export const portfolioCategoryLabels: Record<PortfolioCategory, string> = {
  websites: "Websites",
  "modexa-pos": "Modexa POS",
  ai: "AI",
  automation: "Automation",
  "web-applications": "Web applications",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  concept: "Concept Project",
  "in-progress": "In progress",
  completed: "Completed",
};
