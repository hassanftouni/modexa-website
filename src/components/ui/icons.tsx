import type { SVGProps } from "react";

/**
 * Minimal inline icon set (stroke style, 24px grid) so the site needs no
 * external icon dependency. Icons are decorative by default (aria-hidden);
 * pass a `title` when an icon conveys meaning on its own.
 */
const paths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.4 13.4 0 0 1 0 18M12 3a13.4 13.4 0 0 0 0 18" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
      <path d="M3 4h2l2.5 12h11L21 8H6.4" />
    </>
  ),
  appWindow: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M6.5 6.6h.01M9.5 6.6h.01" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="2" />
      <path d="M12 5v4M9 14h.01M15 14h.01M8 17.5h8" />
      <circle cx="12" cy="4" r="1" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </>
  ),
  workflow: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M9 6h5a2 2 0 0 1 2 2v7" />
    </>
  ),
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  plug: (
    <>
      <path d="M9 7V3M15 7V3" />
      <path d="M6.5 7h11v4a5.5 5.5 0 0 1-11 0V7z" />
      <path d="M12 16.5V21" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4.6 4.6 0 0 0-6.1 6.1L3 18l3 3 5.6-5.6a4.6 4.6 0 0 0 6.1-6.1l-2.9 2.9-3-3 2.9-2.9z" />
  ),
  monitor: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  printer: (
    <>
      <path d="M7 8V3.5h10V8" />
      <rect x="4" y="8" width="16" height="7.5" rx="2" />
      <path d="M7 15.5h10V21H7v-5.5zM17 11.5h.01" />
    </>
  ),
  package: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" />
      <path d="M3.5 8.5L12 13l8.5-4.5M12 13v8" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.7a3.5 3.5 0 0 1 0 6.6M17.7 13.9a6.5 6.5 0 0 1 3.8 6.1" />
    </>
  ),
  chart: <path d="M3 3v18h18M8 17v-7M13 17V6M18 17v-4" />,
  wifiOff: (
    <>
      <path d="M2 2l20 20" />
      <path d="M8.5 16.4a5 5 0 0 1 6-.4M5 12.6a9.5 9.5 0 0 1 4.3-2.4M12.8 9.6a9.5 9.5 0 0 1 6.2 3M12 20h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.6-3.2 7.8-8 9-4.8-1.2-8-4.4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  refresh: <path d="M21 3v5.5h-5.5M21 8.5A9 9 0 1 0 21.5 12" />,
  check: <path d="M4 12.5l5 5L20 7" />,
  arrowRight: <path d="M4 12h16M13 5l7 7-7 7" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7.5l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l1.5 4.5L8 10.2a12.5 12.5 0 0 0 5.8 5.8l1.7-2.5L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </>
  ),
  star: (
    <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />
  ),
  terminal: <path d="M4 17l6-5-6-5M12 19h8" />,
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  cloud: <path d="M7 18a4.5 4.5 0 1 1 .6-9A6 6 0 0 1 19 10.5 4 4 0 0 1 18 18H7z" />,
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10.5" y="10.5" width="3" height="3" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 3.2" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13.5l9 5 9-5" />
    </>
  ),
  creditCard: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3z" />
      <path d="M9.5 8h5M9.5 12h5" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M9.5 21v-4h5v4M8.5 7h.01M12 7h.01M15.5 7h.01M8.5 11h.01M12 11h.01M15.5 11h.01" />
    </>
  ),
  zap: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  message: (
    <path d="M21 11.5a8.5 8.5 0 0 1-12 7.8L3 21l1.7-5.1A8.5 8.5 0 1 1 21 11.5z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  fileText: (
    <>
      <path d="M6 2h8l6 6v14H6V2z" />
      <path d="M14 2v6h6M9.5 13h5M9.5 17h5" />
    </>
  ),
  store: (
    <>
      <path d="M4.5 4h15l1.5 5.5a3.1 3.1 0 0 1-6.2.4 3.1 3.1 0 0 1-6.2 0 3.1 3.1 0 0 1-6.1-.4L4.5 4z" />
      <path d="M5.5 12.5V21h13v-8.5M9.5 21v-5h5v5" />
    </>
  ),
  utensils: (
    <>
      <path d="M6 3v7M9.5 3v7M7.7 10v11M7.7 10a1.9 1.9 0 0 0 1.8-2V3M7.7 10a1.9 1.9 0 0 1-1.7-2V3" />
      <path d="M16 3c2.2 0 3.7 2.1 3.7 5v5H16m0-10v18" />
    </>
  ),
} satisfies Record<string, React.ReactNode>;

export type IconName = keyof typeof paths;

export const iconNames = Object.keys(paths) as IconName[];

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  title?: string;
}

export function Icon({ name, title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
