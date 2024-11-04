import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";

const reviews = [
  {
    name: "Fauzan",
    username: "Incredible for staying hydrated!",
    body: "My Corkcicle bottle keeps my water ice-cold all day. It's ideal for intense workouts and hot days—truly a must-have!",
    img: "https://i.pinimg.com/564x/0d/b8/9e/0db89e4f5b087b2693e663bf96f01335.jpg",
  },
  {
    name: "Khanif",
    username: "Stylish and practical.",
    body: "This bottle combines great design with real functionality. It’s super sturdy, leak-proof, and looks amazing wherever I take it.",
    img: "https://i.pinimg.com/564x/8a/1a/35/8a1a35d348d66b122d202c556eb2da25.jpg",
  },
  {
    name: "Arkhan",
    username: "Perfect for active lifestyles.",
    body: "Keeps my drinks fresh and cold during long days out. The sleek design and insulation make it a top choice for me.",
    img: "https://i.pinimg.com/564x/bc/b8/b0/bcb8b04bf6708aebd78dfe9167991838.jpg",
  },
  {
    name: "Tami",
    username: "So convenient and easy to use.",
    body: "The handle makes it simple to carry, and it’s easy to clean. Great for anyone with an on-the-go lifestyle.",
    img: "https://i.pinimg.com/564x/5b/59/44/5b594416a4a9834caeea04173c43a71d.jpg",
  },
  {
    name: "Abay",
    username: "Fantastic quality and eco-conscious.",
    body: "Love that it’s reusable and built to last. Keeps my drinks at just the right temperature, and it’s worth every penny!",
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
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}>
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full object-fill w-10 h-10"
          width={100}
          height={100}
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
      <blockquote className="mt-2 text-">&quot;{body}&quot;</blockquote>
    </figure>
  );
};

export function Testimonial() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review}/>
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
