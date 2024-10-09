"use client";

import React, { useState, useEffect } from "react";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

export default function Navbar() {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup saat component unmount
    };
  }, [modal]);

  const openModal = () => {
    setModal(true);
  };
  return (
    <>
      <div className="flex justify-around items-center p-5">
        <h1 className="hidden md:flex">FAUZANSHOP</h1>
        <div className="md:flex gap-6 hidden">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/contacts">Contacts</Link>
        </div>
        <div
          className={`flex flex-col duration-200 ${
            modal ? "left-0" : "-left-full"
          } top-0 absolute bg-white p-10 h-full w-2/3`}>
          <div className="flex justify-between ">
            <h1 className="pb-10">FAUZANSHOP</h1>
            <IoCloseOutline className="text-2xl hover:cursor-pointer" onClick={() => setModal(false)} />
          </div>
          <div className="flex flex-col gap-8">
            <Link href="/home">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/contacts">Contacts</Link>
          </div>
        </div>
        <div className="flex text-2xl gap-3">
          <Link href="/cart">
            <CiShoppingCart />
          </Link>
          <Link href="/profile">
            <CiUser />
          </Link>
        </div>
        <div className="md:hidden hover:cursor-pointer">
          <RxHamburgerMenu onClick={openModal} />
        </div>
      </div>
    </>
  );
}
