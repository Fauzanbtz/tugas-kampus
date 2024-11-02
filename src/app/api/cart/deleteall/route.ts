import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Sesuaikan path prisma dengan lokasi file Anda

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await req.json();

    // Menghapus semua item dalam cart untuk userId tertentu
    const deleteCart = await prisma.cart.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ message: "Cart cleared successfully", deletedCount: deleteCart.count });
  } catch (error) {
    console.error("Error deleting all cart items:", error);
    return NextResponse.json(
      { message: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
