import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan path ini sesuai dengan struktur proyek Anda

// Handler untuk menangani permintaan GET dan POST
export async function GET() {
  try {
    // Ambil semua produk dari database
    const products = await prisma.product.findMany();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, price, image, description, stock } = await req.json();

    // Validasi input
    if (!name || !price || !image || !description || stock === undefined) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Buat produk baru
    const newProduct = await prisma.product.create({
      data: {
        name,
        price,
        image,
        description,
        stock,
      },
    });

    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
