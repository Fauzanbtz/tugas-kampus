import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

// Handle GET request: Fetch user profile
export async function GET(req: NextRequest): Promise<NextResponse> {
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value || "";

  try {
    const decodedToken = await verifyToken(token);

    // Jika token tidak valid atau null
    if (!decodedToken) {
      return NextResponse.json(
        { message: "Invalid or missing token" },
        { status: 401 }
      );
    }

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

// Handle PUT request: Update user profile
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value || "";

  try {
    const decodedToken = await verifyToken(token);

    // Jika token tidak valid atau null
    if (!decodedToken) {
      return NextResponse.json(
        { message: "Invalid or missing token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.id as number;

    const data = await req.json();

    // UBAH PROFILE
    const ubahProfile = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name: data?.name || undefined, // Perbarui nama jika ada
        email: data?.email || undefined, // Perbarui email jika ada
        password: data?.password || undefined, // Perbarui password jika ada
      },
    });

    return NextResponse.json(ubahProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
