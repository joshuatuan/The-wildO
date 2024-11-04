import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import about2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";
import { ImageCarousel } from "../_components/ImageCarousel";
import TextExpander from "../_components/TextExpander";

export const revalidate = 86400; //1 day

export const metadata = {
  title: "About",
};

export default async function Page() {
  const cabins = await getCabins();

  return (
    <div className="grid grid-cols-1 items-center gap-y-10 md:grid-cols-5 md:gap-x-16 md:gap-y-20 md:text-lg">
      <div className="md:col-span-3">
        <h1 className="mb-6 text-2xl font-medium text-accent-400 md:mb-10 md:text-4xl">
          Welcome to The Wild Oasis
        </h1>

        {/* desktop */}
        <div className="hidden space-y-4 md:block md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>

        {/* mobile */}
        <div className="space-y-4 md:hidden">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
          </p>
          <p>
            <TextExpander maxWords={0}>
              Wander through lush forests, breathe in the fresh air, and watch
              the stars twinkle above from the warmth of a campfire or your hot
              tub. This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </TextExpander>
          </p>
        </div>
      </div>

      <div className="relative hidden aspect-square md:col-span-2 md:block">
        <Image
          src={image1}
          placeholder="blur"
          quality={80}
          alt="Family sitting around a fire pit in front of cabin"
          className="rounded-md drop-shadow-[0px_4px_12px_rgba(44,61,79,0.6)]"
        />
      </div>

      <div className="relative hidden aspect-square md:col-span-2 md:block">
        <Image
          src={about2}
          placeholder="blur"
          quality={80}
          alt="Family that manages The Wild Oasis"
          className="rounded-md drop-shadow-[0px_4px_12px_rgba(44,61,79,0.6)]"
        />
      </div>

      <div className="flex w-full items-center justify-center drop-shadow-[0px_8px_59px_rgba(44,61,79,0.6)] md:hidden">
        <div className="mx-auto h-80 w-80">
          <ImageCarousel />
        </div>
      </div>

      <div className="md:col-span-3">
        <h1 className="mb-6 text-2xl font-medium text-accent-400 md:mb-10 md:text-4xl">
          Managed by our family since 1962
        </h1>

        <div className="space-y-4 md:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center md:col-span-full">
        <a
          href="/cabins"
          className="mb-14 inline-block rounded-md bg-accent-500 px-8 py-5 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600 md:mb-16 md:mt-0 md:px-16 md:py-5 md:text-2xl"
        >
          Explore our luxury cabins
        </a>
      </div>
    </div>
  );
}
