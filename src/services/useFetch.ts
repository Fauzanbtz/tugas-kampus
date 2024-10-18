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
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      console.log("Fetching data...");

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await fetch("api/products");

        if (!res.ok) {
          throw new Error("Fetching from localhost failed");
        }

        const data = await res.json();
        setDataFetch(data); 
      } catch (error) {
        console.warn("Error fetching from localhost, trying fallback URL...", error);

        try {
          const resFallback = await fetch("https://kelompok3project.vercel.app/api/products");

          if (!resFallback.ok) {
            throw new Error("Fetching from fallback URL failed");
          }

          const dataFallback = await resFallback.json();
          setDataFetch(dataFallback); 
        } catch (fallbackError) {
          setError("Failed to fetch data from both URLs"); 
          console.error("Error fetching from fallback URL...", fallbackError);
        }
      } finally {
        setLoading(false); 
        console.log("Fetching complete.");
      }
    };

    fetchData();
  }, []);

  return { datafetch, error, loading }; // Mengembalikan state loading
};

export default useFetch;
