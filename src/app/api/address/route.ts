// app/api/addresses/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Ambil token dari cookies
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value || null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Dekode JWT untuk mendapatkan userId
    const decodedToken = await verifyToken(token);
    const userId = decodedToken?.id as number;

    // Ambil alamat berdasarkan userId
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(addresses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to retrieve addresses." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();

  // Ambil token dari cookies
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value || null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Dekode JWT untuk mendapatkan userId
    const decodedToken = await verifyToken(token);
    const userId = decodedToken?.id as number;

    // Menyimpan alamat baru untuk pengguna
    const savedAddresses = await prisma.address.create({
      data: {
        userId,
        street: data.street,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
        country: data.country,
      },
    });

    return NextResponse.json(savedAddresses, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to register addresses." },
      { status: 500 }
    );
  }
}
