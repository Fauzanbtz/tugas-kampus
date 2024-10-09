import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {

  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Tentukan route yang memerlukan middleware
export const config = {
  matcher: ["/cart", "/profile"], // Halaman yang memerlukan autentikasi
};