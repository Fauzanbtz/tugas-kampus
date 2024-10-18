import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function POST(req: NextRequest) {
  try {
    const { name, password, email, role } = await req.json();

    if (!name || !password || !email) {
      return NextResponse.json(
        { message: "All fields (name, email, password) are required" },
        { status: 400 }
      );
    }


    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }


    // Buat pengguna baru
    const user = await prisma.user.create({
      data: {
        name,
        password,
        email,
        role: role || "USER",
      },
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
