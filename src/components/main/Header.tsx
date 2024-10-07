import React from "react";
import Image from "next/image";
import Image_Cover from "../../../public/images/cover_img.png"
import { Button } from "../ui/button";

export default function Header() {
  return (
    <div className="md:h-screen flex flex-col md:flex-row justify-center items-center gap-6">
      <div className="md:w-1/2 flex flex-col items-center md:items-start  gap-6">
        <h1 className="text-[#3A408C] font-bold text-6xl text-center md:text-left">
          PROVIDING SERVICES AT YOUR DOOR
        </h1>
        <p className="text-[#707070]">
          <span className="font-bold ">MACC Essentials</span> has an important
          role in making supplies and services available to customers and their
          patients during this critical time. This includes services from
          various domains. Our aim is to aid you. As much we can.
        </p>
        <Button className="bg-red-600 w-fit">LEARN MORE</Button>
      </div>
      <div className="">
        <Image src={Image_Cover} alt="image" className=""/>
      </div>
    </div>
  );
}
