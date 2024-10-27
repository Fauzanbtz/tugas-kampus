// app/register/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      <div className="p-20 bg-white  rounded-xl shadow-md">
        <h1 className="font-bold text-center text-2xl">
          Create an Account
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Sign up for our e-commerce platform
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="bg-[#004197] hover:bg-[#003a7a] transition-colors">
            SUBMIT
          </Button>
        </form>
        {successMessage && (
          <p className="bg-green-400 text-center p-2 rounded-xl my-6">
            {successMessage}
          </p>
        )}
        {error && (
          <p className="bg-red-600 text-center p-2 rounded-xl my-6">{error}</p>
        )}
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700">
            LOGIN HERE
          </Link>
        </p>
      </div>
    </div>
  );
}
