import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie?.value || "";

    // Verifikasi token
    const decodedToken = await verifyToken(token);

    // Jika token tidak valid atau null
    if (!decodedToken) {
      return NextResponse.json({ message: "Invalid or missing token" }, { status: 401 });
    }

    // Pastikan decodedToken memiliki ID
    const userId = decodedToken.id as number;

    const userProfile = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!userProfile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userProfile, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}
