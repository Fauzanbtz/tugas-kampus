"use client";

import { useState, useEffect } from "react";
type data = {
  id: number,
  name: string,
  description: string,
  price: number,
  image: string
}

const useFetch = () => {
  const [datafetch, setDataFetch] = useState<data[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        const products = data
        setDataFetch(products);
      } catch {
        setError("data error");
      }
    };
    fetchData();
  }, []);

  return { datafetch, error };
};

export default useFetch;
