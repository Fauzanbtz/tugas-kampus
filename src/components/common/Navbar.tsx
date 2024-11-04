"use client";

import React, { useState, useEffect } from "react";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import Link from "next/link";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);

  const { toast } = useToast();

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

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      setLogin(true); // Set login state ke true jika token ada
    }
  }, []);

  const handleLogout = async () => {
    // Hapus token dari cookies
    Cookies.remove("token");

    // Update state login menjadi false setelah logout
    setLogin(false);

    // Tampilkan pesan toast
    await toast({
      description: "You have been logged out.",
    });
  };

  const openModal = () => {
    setModal(true);
  };

  return (
    <>
      <div className="flex justify-around items-center p-5 z-10 font-serif">
        <h1 className="hidden md:flex text-primary font-bold text-xl">
          Corkcicle-Sport.
        </h1>
        <div className="md:flex gap-6 hidden">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/contacts">Contacts</Link>
        </div>
        <div
          className={`flex flex-col duration-200 ${
            modal ? "left-0" : "-left-full"
          } top-0 absolute bg-white p-10 h-full w-2/3`}
        >
          <div className="flex justify-between ">
            <h1 className="pb-10 text-primary font-bold text-xl">Corkcicle-Sport.</h1>
            <IoCloseOutline
              className="text-2xl hover:cursor-pointer"
              onClick={() => setModal(false)}
            />
          </div>
          <div className="flex flex-col gap-8">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/contacts">Contacts</Link>
          </div>
        </div>
        <div className="flex text-2xl gap-3">
          <Link href="/cart">
            <CiShoppingCart />
          </Link>
          <Popover>
            <PopoverTrigger>
              <CiUser />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col w-28 gap-5">
              {login ? (
                <>
                  <Link
                    href="/profile"
                    className="text-center hover:text-blue-600"
                  >
                    PROFILE
                  </Link>
                  <Button variant={"ghost"} onClick={handleLogout}>
                    LOGOUT
                  </Button>
                </>
              ) : (
                <Link href="/login" className="text-center hover:text-blue-600">
                  LOGIN
                </Link>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <div className="md:hidden hover:cursor-pointer">
          <RxHamburgerMenu onClick={openModal} />
        </div>
      </div>
      <Toaster />
    </>
  );
}
