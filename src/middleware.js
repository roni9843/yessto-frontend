// src/middleware.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  // // console.log("this is middleware -> ", token);

  if (
    !token &&
    (req.nextUrl.pathname.startsWith("/checkout") ||
      req.nextUrl.pathname.startsWith("/order") ||
      req.nextUrl.pathname.startsWith("//orderShippingInfo"))
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    const callbackUrl = req.nextUrl.pathname.slice(1); // Remove the leading slash
    url.searchParams.set("callbackUrl", callbackUrl); // Set the modified callbackUrl

    return NextResponse.redirect(url.href);
  }

  return NextResponse.next(); // Proceed to the requested page if token is present
}

export const config = {
  // matcher: ["/checkout/:path*", "/order/:path*", "/orderShippingInfo/:path*"], // Apply middleware to specific routes
  matcher: ["/checkout/:path*", "/order/:path*", "/orderShippingInfo/:path*"], // Apply middleware to specific routes
};
