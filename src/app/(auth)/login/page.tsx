"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [islogin, setIslogin] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if (data.message === "Username and password required") {
            console.log("Username dan password diperlukan.");
            setError("Username dan password diperlukan.");
          } else if (data.message === "Invalid email or password") {
            console.log("Kredensial tidak valid.");
            setError("password atau email salah.");
          } else if (data.token) {
            // Simpan token jika respons valid
            document.cookie = `token=${data.token}; path=/; max-age=3600; secure; SameSite=Lax`;
            console.log("Token saved:", data.token);
            setTimeout(() => {
              router.push("/");
            }, 1000);
            setError("");
            setIslogin("LOGIN BERHASIL");
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
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      <div className="p-10 bg-white rounded-xl">
        <h1 className="font-bold text-center">LOGIN</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
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
        {islogin ? (
          <p className="bg-green-400 text-center p-2 rounded-xl my-6">
            {islogin}
          </p>
        ) : (
          ""
        )}
        {error ? (
          <p className="bg-red-600 text-center p-2 rounded-xl my-6">{error}</p>
        ) : (
          <p></p>
        )}
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
//https://www.youtube.com/watch?v=jsaOTcBe-dM
