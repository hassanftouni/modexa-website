import { notFound } from "next/navigation";

// The locale layout disables dynamic params; this route must accept any path.
export const dynamicParams = true;

/** Any unknown path inside a locale renders that locale's not-found page. */
export default function CatchAll() {
  notFound();
}
