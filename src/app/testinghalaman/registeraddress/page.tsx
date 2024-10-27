"use client"

import React, { FormEvent, useState } from "react";

export default function AddressRegister() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

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

    try {
      const response = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Jika diperlukan, tambahkan token untuk otorisasi
          // "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (!response.ok) {
        throw new Error("Failed to register address");
      }

      const responseData = await response.json();
      console.log("Address registration successful:", responseData);
      // Tambahkan logika untuk menangani sukses, seperti navigasi ke halaman lain
    } catch (error) {
      console.error("Error during address registration:", error);
      // Tampilkan pesan kesalahan kepada pengguna jika perlu
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Register Address</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please enter your address details
        </p>
        <form onSubmit={handleSubmit}>
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
            Register Address
          </button>
        </form>
      </div>
    </div>
  );
}
