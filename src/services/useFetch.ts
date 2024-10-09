"use client";

import { useState, useEffect } from "react";
type data = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  images: string
}

const useFetch = () => {
  const [datafetch, setDataFetch] = useState<data[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        const products = data.products
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
