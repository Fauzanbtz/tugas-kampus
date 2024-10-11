import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ message: "Database connection successful" }, { status: 200 });
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { message: "Database connection failed", error },
      { status: 500 }
    );
  }
}
