import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Inovasion() {
  return (
    <div className="bg-[url('/images/drinking.jpg')] bg-cover bg-center h-1/2 w-full">
      <div className="flex justify-between items-center pt-96 pb-10 px-7 md:px-28">
        <div className="text-white">
          <h1 className="font-bold font-serif text-3xl md:text-8xl ">
            The Game <br />
            Changer
          </h1>
          <p>-500ML</p>
        </div>
        <div className="bg-white rounded-xl text-center w-28 md:w-auto">
          <Image
            src="https://corkcicle.com/cdn/shop/products/2016GMN-2_900x.png?v=1693226195"
            alt=""
            width={200}
            height={200}
          />
          <Link href="/products" className="text-primary underline underline-offset-1">
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
