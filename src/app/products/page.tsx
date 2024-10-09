"use client";

import React from "react";
import useFetch from "@/services/useFetch";

export default function Products() {
  const {datafetch} = useFetch();

  return <div>
    {datafetch.map((item)=>(
      <div key={item.id}>
        <h1>{item.title}</h1>
      </div>
    ))}
  </div>;
}
