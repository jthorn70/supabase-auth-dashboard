import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("sb-access-token"); // Check for auth token

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect unauthorized users
  }

  return NextResponse.next();
}

// Apply middleware only to /dashboard
export const config = {
  matcher: ["/dashboard"],
};
