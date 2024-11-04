import React from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { PiThermometerColdLight } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";

export default function Majesty() {
  return (
    <div className="md:h-screen flex flex-col md:flex-row justify-around items-center py-10 px-5">
      <div className="md:w-1/2 flex flex-col gap-10">
        <div className="text-primary flex flex-col gap-8">
          <h1 className="text-primary text-6xl font-bold">
            The travel
            <br /> majesty
          </h1>
          <p className="text-xl">
            Make your drinking style cooler with a corkcicle which can maintain
            the hygiene and freshness of your drink.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <MdOutlineWbSunny className="text-muted text-3xl" />{" "}
          <p className="text-primary text-xl">Hot for 8hrs</p>
          <PiThermometerColdLight className="text-muted text-3xl" />{" "}
          <p className="text-primary text-xl">Cold for 14hrs</p>
        </div>
        <Link
          href="/products"
          className="w-fit px-10 bg-muted text-primary p-2 rounded-md">
          $10.000 USD View Detail
        </Link>
      </div>
      <div className="pt-10 md:pt-0">
        <Image
          src="https://cdn.prod.website-files.com/6306108e26f4bb1bc5ad6e3d/6310a72a620367ef24333ae5_about-02.png"
          alt=""
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
