"use client";

import useFetch from "@/services/useFetch";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { BlurFade } from "@/components/ui/blur-fade";

export default function Products() {
  const { datafetch, loading } = useFetch();
  const router = useRouter();

  // Fungsi untuk menambahkan produk ke keranjang
  const handleAddToCart = async (productId: any) => {
    const token = Cookies.get("token");

    try {
      if (!token) {
        router.push("/login");
        throw new Error("Token tidak ditemukan, pastikan Anda sudah login.");
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Menambahkan token ke header
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Gagal menambahkan produk ke keranjang"
        );
      }

      const data = await response.json();
      console.log(data); // Log data untuk memastikan respons dari server
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const { toast } = useToast();

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center items-center gap-6 py-24">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                <Skeleton className="h-6 w-[300px] mt-4" />
                <Skeleton className="h-6 w-[100px] mt-2" />
              </div>
            ))
          : datafetch.map((item) => (
              <div key={item.id} className="text-center">
                <BlurFade delay={0.1 * item.id} inView>
                  <a href={`/products/detail?id=${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      priority
                      className="bg-[#F3F3F3] rounded-md"
                    />
                    <h1 className="font-serif text-2xl text-primary mt-4">
                      {item.name}
                    </h1>
                  </a>
                  <div className="flex justify-center gap-5 items-center">
                    <p className="text-lg mt-2">${item.price}</p>
                    <Button
                      className="bg-muted"
                      onClick={async () => {
                        try {
                          await handleAddToCart(item.id); // Panggil fungsi addToCart
                          toast({
                            title: "Success!",
                            description: "Item has been added to your cart.",
                          });
                        } catch {
                          toast({
                            title: "Uh oh! Something went wrong.",
                            description:
                              "There was a problem with your request.",
                          });
                        }
                      }}>
                      Add to Cart
                    </Button>
                  </div>
                </BlurFade>
              </div>
            ))}
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}
