"use client";

import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";

export function ImageCarousel() {
  return (
    <Carousel className="rounded-md">
      <Image
        src={image1}
        alt="Family sitting around a fire pit in front of cabin"
      />
      <Image src={image2} alt="Family that manages The Wild Oasis" />
    </Carousel>
  );
}
