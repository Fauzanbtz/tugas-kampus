import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan path ini sesuai dengan struktur proyek Anda

// Handler untuk mengambil detail produk berdasarkan ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // Mengambil ID dari params

  try {
    // Ambil produk berdasarkan ID
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id), // Konversi ID menjadi angka jika diperlukan
      },
    });

    // Jika produk tidak ditemukan
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Jika produk ditemukan
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
