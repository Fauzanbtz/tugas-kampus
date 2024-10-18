import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Fauzan",
    username: "@FauzanGanteng",
    body: "gajah terbang keliatan apanya ?",
    img: "https://i.pinimg.com/564x/42/1e/1d/421e1dd6be652135be6e6a3be6b53ddb.jpg",
  },
  {
    name: "Khanif",
    username: "@Khanifpah",
    body: "dua tiga tutup botol, ini website cakep betooool",
    img: "https://i.pinimg.com/564x/8a/1a/35/8a1a35d348d66b122d202c556eb2da25.jpg",
  },
  {
    name: "Arkhan",
    username: "@ArkhanSadboy",
    body: "pliss dapet nilai tinggi",
    img: "https://i.pinimg.com/564x/bc/b8/b0/bcb8b04bf6708aebd78dfe9167991838.jpg",
  },
  {
    name: "Tami",
    username: "@Tamiah",
    body: "dimana ada event cosplay, disitu ada saya",
    img: "https://i.pinimg.com/564x/5b/59/44/5b594416a4a9834caeea04173c43a71d.jpg",
  },
  {
    name: "Abay",
    username: "@AbaySleeping",
    body: "ngantuk banget deh",
    img: "https://i.pinimg.com/enabled_hi/564x/16/08/a0/1608a083d706ad0673147101e70b22dd.jpg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}>
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full object-fill w-8 h-8"
          width={32}
          height={32}
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonial() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
