"use client"

import React, { useState } from "react";

export default function Formtest() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validasi form jika perlu
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: username,
      email,
      password,
    };

    try {
      // Mengirim data ke endpoint user/register
      const userResponse = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!userResponse.ok) {
        throw new Error("Failed to register user");
      }

      // Ambil response dari pendaftaran user
      const userDataResponse = await userResponse.json();
      console.log("User registration successful:", userDataResponse);

      // Mengirim alamat ke endpoint address
      const addressData = {
        addresses: [
          {
            street: address,
            city,
            state,
            postalCode: zipCode,
            country,
          },
        ],
      };

      const addressResponse = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userDataResponse.token}`, // Gunakan token jika diperlukan
        },
        body: JSON.stringify(addressData),
      });

      if (!addressResponse.ok) {
        throw new Error("Failed to register address");
      }

      const addressDataResponse = await addressResponse.json();
      console.log("Address registration successful:", addressDataResponse);
      
      // Tambahkan logika setelah pendaftaran sukses, misalnya navigasi ke halaman lain

    } catch (error) {
      console.error("Error during registration:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika perlu
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">
          Create an Account
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Sign up for our e-commerce platform
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">State</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700">ZIP Code</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Country</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="CAN">Canada</option>
                <option value="UK">United Kingdom</option>
                {/* Tambahkan lebih banyak pilihan negara jika diperlukan */}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
