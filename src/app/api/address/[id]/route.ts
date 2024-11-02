import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
// import { verifyToken } from "@/lib/jwt";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value || null;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // const decodedToken = await verifyToken(token);
    // const userId = decodedToken?.id as number;
    const addressId = Number(params.id);
    const { street, city, state, postalCode, country } = await req.json();

    // Memperbarui alamat di database
    const updatedAddress = await prisma.address.update({
      where: { id: addressId },
      data: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    });

    return NextResponse.json(updatedAddress, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update address." },
      { status: 500 }
    );
  }
}
