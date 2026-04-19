import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "coffee-shop-secret-key"
);

const protectedRoutes = ["/dashboard", "/admin", "/purchase"];
const adminRoutes = ["/admin"];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/login") {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const redirectTo = (payload as any).role === "admin" ? "/admin/users" : "/dashboard";
        return NextResponse.redirect(new URL(redirectTo, request.url));
      } catch {
      }
    }
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && adminRoutes.some(route => pathname.startsWith(route))) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      if ((payload as any).role !== "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*", "/purchase/:path*"],
};