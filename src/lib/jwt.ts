// /lib/jwt.ts
import { SignJWT, jwtVerify, JWTPayload } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "secret");

// Fungsi untuk membuat JWT
export async function signToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(JWT_SECRET);
}

// Fungsi untuk memverifikasi JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error: Error | any) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}
