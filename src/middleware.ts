import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is an admin route
  if (pathname.startsWith("/admin")) {
    // Get token from cookies (we'll update our auth to use cookies for better security)
    const token = request.cookies.get("access_token")?.value;

    // If no token is found, redirect to login
    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while authenticated, redirect to admin
  if (pathname === "/login") {
    const token = request.cookies.get("access_token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
