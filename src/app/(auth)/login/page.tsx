"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [islogin, setIslogin] = useState("")

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 60,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // Tangani berbagai pesan kesalahan
          if (data.message === "Username and password required") {
            console.log("Username dan password diperlukan.");
            setError("Username dan password diperlukan.")
          } else if (data.message === "Invalid credentials") {
            console.log("Kredensial tidak valid.");
            setError("password atau username salah.")
          } else if (data.accessToken) {
            // Simpan token jika respons valid
            document.cookie = `token=${data.accessToken}; path=/; max-age=3600; secure; SameSite=Lax`;
            console.log("Token saved:", data);
            setTimeout(() => {
              router.push("/")
            }, 3000);
            setIslogin("LOGIN BERHASIL")
          } else {
            console.log("Ada yang bermasalah:", data.message);
          }
        } else {
          console.log("Ada yang bermasalah");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-10 bg-gray-300 rounded-xl">
        <h1 className="font-bold text-center">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="username">USERNAME</label>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="bg-[#004197]">
            SUBMIT
          </Button>
        </form>
        {islogin ? <p className="bg-green-400 text-center p-2 rounded-xl my-6">{islogin}</p> : ""}
        {error ? <p className="bg-red-600 text-center p-2 rounded-xl my-6">{error}</p> : <p></p>}
        <p>
          dont have account ?{" "}
          <Link href="/register" className="text-blue-700">
            REGISTER HERE
          </Link>
        </p>
      </div>
    </div>
  );
}
