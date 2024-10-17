// app/api/cart/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
    try {
      // Optionally, retrieve the userId from query parameters or headers for better filtering
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId"); // Get userId from query parameters
  
      if (!userId) {
        return NextResponse.json(
          { message: "User ID is required" },
          { status: 400 }
        );
      }
  
      // Fetch cart items for the specified user
      const cartItems = await prisma.cart.findMany({
        where: { userId: Number(userId) }, // Adjust this based on your schema
        include: {
          product: true, // Include product details if you have a relation
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
export async function POST(req: NextRequest) {
  try {
    // Ambil token dari cookies
    const cookies = req.cookies;
    const tokenCookie = cookies.get('token'); // Pastikan nama cookie sesuai dengan yang digunakan
    const token = tokenCookie ? tokenCookie.value : null; // Ambil nilai token dari objek cookie
    console.log("Token:", token); // Log untuk memverifikasi token yang diambil

    const decodedToken = await verifyToken(token); // Pastikan untuk menunggu hasil verifikasi
    console.log("Decoded Token:", decodedToken); // Log untuk melihat token yang terdekode

    if (!decodedToken) {
      console.error("Invalid token");
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Ambil data dari request body
    const { productId, quantity } = await req.json();
    const userId = decodedToken.id; // Ambil userId dari decoded token

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
      { message: "Failed to add product to cart", error: error.message },
      { status: 500 }
    );
  }
}
