import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, localeCookie } from "@/i18n/config";

/**
 * Locale routing.
 *
 * All pages live under app/[lang]. English keeps its original URLs, so an
 * unprefixed request (/services) is rewritten internally to /en/services.
 * Arabic URLs (/ar/...) pass straight through.
 *
 * A visitor who explicitly chose Arabic (via the language switcher, which
 * sets the NEXT_LOCALE cookie) is redirected from an English URL to its
 * Arabic counterpart, so the choice persists across navigation and reloads.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return NextResponse.next();
  }

  // /en/... is the internal form of English pages; send visitors to the
  // canonical, unprefixed URL.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  if (request.cookies.get(localeCookie)?.value === "ar") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
    return NextResponse.redirect(url);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Skip Next internals, metadata routes and any path with a file extension
    // (images, icon.svg, robots.txt, sitemap.xml, ...).
    "/((?!_next|api|opengraph-image|twitter-image|.*\\..*).*)",
  ],
};
