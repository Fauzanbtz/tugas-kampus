"use client";

import useFetch from "@/services/useFetch";
import Navbar from "@/components/common/Navbar";
import Image from "next/image";
import Footer from "@/components/common/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Products() {
  const { datafetch, loading} = useFetch();


  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center items-center gap-6 pt-24">

        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="text-center">
                {/* Skeleton untuk gambar */}
                <Skeleton className="h-[400px] w-[400px] rounded-xl" />
                {/* Skeleton untuk nama produk */}
                <Skeleton className="h-6 w-[300px] mt-4" />
                {/* Skeleton untuk harga */}
                <Skeleton className="h-6 w-[100px] mt-2" />
              </div>
            ))
          : datafetch.map((item) => (
              <div key={item.id} className="text-center">
                {/* Tampilkan data produk jika sudah di-fetch */}
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                />
                <h1 className="font-serif text-2xl text-primary mt-4">
                  {item.name}
                </h1>
                <div className="flex justify-center gap-5 items-center">
                  <p className="text-lg mt-2">${item.price}</p>
                  <Button className="bg-muted">Add to Cart</Button>
                </div>
              </div>
            ))}
      </div>
      <Footer />
    </div>
  );
}
