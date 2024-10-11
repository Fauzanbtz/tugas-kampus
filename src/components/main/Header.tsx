import React from "react";
import Image from "next/image";
// import Image_Cover from "../../../public/images/cover_img.png"
import Delivery from "../../../public/images/actor.png";
import { Button } from "../ui/button";
import { GiLeafSwirl } from "react-icons/gi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { MdOutlineCleanHands } from "react-icons/md";
import { CiTempHigh } from "react-icons/ci";
import { BiSolidVirusBlock } from "react-icons/bi";
import Marquee from "../ui/marquee";
import TypingAnimation from "@/components/ui/typing-animation";

export function TypingAnimationDemo() {
  return (
    <TypingAnimation
      className="text-4xl font-bold text-black dark:text-white"
      text="Typing Animation"
    />
  );
}

const data = [
  {
    logo: <GiLeafSwirl />,
    desc: "BPA-Free",
  },
  {
    logo: <AiFillSafetyCertificate />,
    desc: "1 Year Warranty",
  },
  {
    logo: <BiSolidVirusBlock />,
    desc: "Anti Bacteria",
  },
  {
    logo: <CiTempHigh />,
    desc: "12h Hot/18h Cold",
  },
  {
    logo: <MdOutlineCleanHands />,
    desc: "Easy Clean",
  },
];

export default function Header() {
  return (
    <>
      <div className="md:h-screen bg-secondary flex flex-col md:flex-row justify-around  items-center gap-6">
        <div className="md:w-1/2 flex flex-col items-center md:items-start  gap-6">
          <h1 className="text-primary font-bold text-6xl text-center md:text-left">
            Have Colder.Hotter.Longer.
          </h1>

          <p className="text-[#707070]">
            Which is the same as saying through shrinking from toil and pain.
            These cases are perfectly simple and easy to distinguish.
          </p>

          <Button className="bg-[#f2b43b] w-fit text-primary">
            Start Shopping
          </Button>
        </div>
        <div className="">
          <Image
            src={Delivery}
            alt="image"
            width={500}
            className="rounded-xl"
          />
        </div>
      </div>
      <div className="relative flex h-[200px] w-full overflow-hidden bg-primary">
        <Marquee pauseOnHover className="[--duration:20s]">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 px-10  rounded-lg">
              <div className="text-8xl text-[#f2b43b]">{item.logo}</div>
              <p className="text-2xl text-white font-bold">{item.desc}</p>
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6  from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6  from-background"></div>
      </div>
    </>
  );
}
