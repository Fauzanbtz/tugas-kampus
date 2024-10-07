"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Image1 from "../../../public/images/products/Product_img.png";
import Image2 from "../../../public/images/products/Product_img (1).png";
import Image3 from "../../../public/images/products/Product_img (2).png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const data = [
  {
    id: 1,
    image: Image1,
    desc: "Face Mask",
  },
  {
    id: 1,
    image: Image2,
    desc: "Body Spray",
  },
  {
    id: 1,
    image: Image3,
    desc: "Stay Free Ultra Pad",
  },
  {
    id: 1,
    image: Image1,
    desc: "Face Mask",
  },
  {
    id: 1,
    image: Image2,
    desc: "Body Spray",
  },
  {
    id: 1,
    image: Image3,
    desc: "Stay Free Ultra Pad",
  },
];

export default function ProductsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center py-10">
      <h1 className="font-bold text-4xl">NEW PRODUCTS</h1>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent className="-ml-1">
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-around p-6">
                    <Image src={item.image} alt="image" />
                    <h1 className="font-bold">{item.desc}</h1>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center justify-center md:justify-start gap-5 mt-5">
        <Button
          className="p-2 px-10  rounded-full "
          onClick={() => api?.scrollTo(current - 1)}>
          <FaArrowLeft className="text-xl" />
        </Button>
        <Button
          className="p-2 px-10 rounded-full"
          onClick={() => api?.scrollTo(current + 1)}>
          <FaArrowRight className="text-xl" />
        </Button>
      </div>
    </div>
  );
}
