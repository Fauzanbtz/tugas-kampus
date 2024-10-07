import React from "react";
import Link from "next/link";
import { CiBellOn, CiShoppingCart } from "react-icons/ci";

export default function Navbar() {
  return (
    <div className="flex justify-around p-5 ">
      <h1>FAUZANSHOP</h1>
      <div className="flex gap-6">
        <Link href="#">Home</Link>
        <Link href="#">About Us</Link>
        <Link href="#">Products</Link>
        <Link href="#">Contacts</Link>
      </div>
      <div className="flex text-2xl">
        <CiBellOn />
        <CiShoppingCart />
      </div>
    </div>
  );
}
