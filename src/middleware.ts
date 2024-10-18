import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Jika kamu menggunakan jose untuk JWT verifikasi

// Fungsi untuk verifikasi JWT
async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload; // Kembalikan payload jika token valid
  } catch {
    throw new Error("Invalid token");
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  // Jika tidak ada token, redirect ke halaman login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verifikasi token JWT
    await verifyJWT(token.value); 

    // Jika token valid, lanjutkan ke route berikutnya
    return NextResponse.next();
  } catch {
    // Jika token tidak valid atau expired, redirect ke login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Tentukan route yang memerlukan middleware
export const config = {
  matcher: ["/profile"], // Halaman yang memerlukan autentikasi
};
