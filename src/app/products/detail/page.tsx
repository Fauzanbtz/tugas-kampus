"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Tentukan tipe data produk
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("id"); // Ambil productId di sini

    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${productId}`);
      if (response.ok) {
        const data: Product = await response.json();
        setProduct(data);
      } else {
        toast({
          title: "Error fetching product",
          description: "Failed to load product details.",
        });
        router.push("/products");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [router, toast]);

  const handleAddToCart = async (productId: number) => {
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
          Authorization: `Bearer ${token}`,
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
      console.log(data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center py-24">
          <Skeleton className="h-[600px] w-[400px] rounded-xl" />
          <Skeleton className="h-6 w-[300px] mt-4" />
          <Skeleton className="h-6 w-[100px] mt-2" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center py-24">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 py-24">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full justify-center">
          <h1 className="font-serif text-3xl text-primary">{product.name}</h1>
          <p className="text-lg mt-4"><b>Price:</b> ${product.price}</p>
          <p className="text-lg mt-2">Description: {product.description}</p>
          <p className="text-lg mt-2">Stock: {product.stock}</p>
          <Button
            className="bg-muted"
            onClick={async () => {
              try {
                await handleAddToCart(product.id);
                toast({
                  title: "Success!",
                  description: "Item has been added to your cart.",
                });
              } catch {
                toast({
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
                });
              }
            }}>
            Add to Cart
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
