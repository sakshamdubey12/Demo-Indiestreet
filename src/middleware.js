import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    const decoded = jwt.decode(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    if (decoded.role === "admin") {
      if (
        req.nextUrl.pathname.includes("vendor") &&
        !req.nextUrl.pathname.includes("admin/vendor")
      ) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    } else if (decoded.role === "vendor") {
      if (req.nextUrl.pathname.includes("admin")) {
        return NextResponse.redirect(new URL("/vendor", req.url));
      }
      return NextResponse.next();
    } else if (decoded.role === "user") {
      if (
        req.nextUrl.pathname.includes("admin") ||
        req.nextUrl.pathname.includes("vendor") 
      ) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch (error) {
    return NextResponse.error(error);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"],
};
// /,"/customer-profile"
