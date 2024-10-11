"use client";

import { useState, useEffect } from "react";

type Data = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const useFetch = () => {
  const [datafetch, setDataFetch] = useState<Data[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading ke true ketika mulai fetch
      try {
        // Menambahkan delay 2 detik
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setDataFetch(data); // Set data setelah berhasil fetch
      } catch {
        setError("data error"); // Jika ada error
      } finally {
        setLoading(false); // Set loading ke false setelah fetch selesai
      }
    };

    fetchData();
  }, []);

  return { datafetch, error, loading }; // Mengembalikan state loading
};

export default useFetch;
