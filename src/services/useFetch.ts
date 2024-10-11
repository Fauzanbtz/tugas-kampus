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
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await fetch("http://localhost:3000/api/products");
        console.log("Response from localhost:", res);

        if (!res.ok) {
          throw new Error("Fetching from localhost failed");
        }

        const data = await res.json();
        console.log("Data from localhost:", data);
        setDataFetch(data); 
      } catch (error) {
        console.warn("Error fetching from localhost, trying fallback URL...", error);

        try {
          const resFallback = await fetch("https://kelompok3project.vercel.app/api/products");
          console.log("Response from fallback URL:", resFallback);

          if (!resFallback.ok) {
            throw new Error("Fetching from fallback URL failed");
          }

          const dataFallback = await resFallback.json();
          console.log("Data from fallback URL:", dataFallback);
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
