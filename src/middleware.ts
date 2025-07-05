import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get("host") || "";
  const hostname = host.split(":")[0];

  // Local development environment
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes(".localhost")) {
      return hostname.split(".")[0];
    }

    return null;
  }

  // Production environment - you'll need to define your root domain
  const rootDomain = process.env.ROOT_DOMAIN || "yourdomain.com";
  const rootDomainFormatted = rootDomain.split(":")[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes("---") && hostname.endsWith(".vercel.app")) {
    const parts = hostname.split("---");
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  console.log("isSubdomain", isSubdomain);
  console.log("hostname", hostname);
  console.log("rootDomainFormatted", rootDomainFormatted);
  console.log(
    "hostname.replace(`.${rootDomainFormatted}`, '')",
    hostname.replace(`.${rootDomainFormatted}`, "")
  );

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, "") : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  console.log("subdomain", subdomain);
  console.log("pathname", pathname);

  const routesNotAllowedInSubdomain = [
    "/home",
    "/create-page",
    "/login",
    "/signup",
  ];

  // Handle subdomain logic for the test route
  if (subdomain) {
    if (routesNotAllowedInSubdomain.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // For the root path on a subdomain, rewrite to the test/[slug] page
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/test/${subdomain}`, request.url));
    }
  }

  // Authentication logic for protected routes
  if (pathname.startsWith("/home")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/test/:path*",
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     * 4. /login and /signup pages
     */
    "/((?!api|_next|login|signup|[\\w-]+\\.\\w+).*)",
  ],
};
