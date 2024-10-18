// app/api/cart/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

// Handler untuk GET request (ambil item dari cart)
export async function GET(req: Request): Promise<NextResponse> {
  try {
    // Ambil userId dari query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Ambil item dari cart untuk user yang diberikan
    const cartItems = await prisma.cart.findMany({
      where: { userId: Number(userId) }, // Pastikan sesuai skema
      include: {
        product: true, // Termasuk detail produk jika ada relasi
      },
    });

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

// Handler untuk POST request (tambahkan item ke cart)
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Ambil token dari cookies
    const tokenCookie = req.cookies.get('token');
    const token = tokenCookie?.value || null;

    if (!token) {
      console.error("No token found in cookies");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
      console.error("Invalid token");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const { productId, quantity }: { productId: number, quantity: number } = await req.json();
    const userId = decodedToken.id as number;

    // Periksa apakah item sudah ada di keranjang
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: userId,
        productId: productId,
      },
    });

    if (existingCartItem) {
      // Jika item sudah ada, update kuantitas
      await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
      });
    } else {
      // Jika item belum ada, buat entri baru di keranjang
      await prisma.cart.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: quantity || 1, // Default quantity jika tidak diberikan
        },
      });
    }

    return NextResponse.json(
      { message: "Product added to cart successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { message: "Failed to add product to cart", error: (error as Error).message },
      { status: 500 }
    );
  }
}
