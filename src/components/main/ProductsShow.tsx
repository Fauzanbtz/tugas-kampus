"use client";

import React from "react";
import Image from "next/image";

const data = [
  {
    image:
      "https://corkcicle.com/cdn/shop/files/2020CSB-04_900x.png?v=1725800633",
    desc: "Steel Insulated Water Bottle",
    price: 3000.0,
  },
  {
    image:
      "https://corkcicle.com/cdn/shop/files/HP2020HERB-01_900x.png?v=1728067840",
    desc: "Steel Insulated Water Bottle",
    price: 3000.0,
  },
  {
    image:
      "https://corkcicle.com/cdn/shop/files/2020SUW-03_900x.png?v=1721316114",
    desc: "Steel Insulated Water Bottle",
    price: 3000.0,
  },
];

export default function ProductsShow() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center py-10 ">
      <h1 className="font-bold text-2xl md:text-4xl text-primary text-center md:w-2/3">
        Get the attention with our bottles of stainless steel! BPA-free &
        non-toxic stainless steel water bottles come in chilly & unique designs.
      </h1>
      <div className="flex md:flex-row flex-col justify-around text-primary">
        {data.map((item, index) => (
          <div key={index}>
            <Image src={item.image} alt="image" width={500} height={200}/>
            <div className="text-center">
              <h1 className="text-xl font-bold">{item.desc}</h1>
              <p>$ {item.price} USD</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
