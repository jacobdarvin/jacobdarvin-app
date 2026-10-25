import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const isSignedIn = request.cookies.has("auth-token");
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login") && isSignedIn) {
    return NextResponse.redirect(new URL("/post", request.url));
  }

  if (
    (pathname.startsWith("/post") || pathname.startsWith("/edit")) &&
    !isSignedIn
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/post", "/edit/:path*"],
};
