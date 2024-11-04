import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { type CabinsData } from "../types/action";

function CabinCard({ cabin }: { cabin: CabinsData }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex border border-primary-800">
      <div className="relative flex-1">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="flex-1 border-r border-primary-800 object-cover"
        />
      </div>

      <div className="md:flex-grow">
        <div className="bg-primary-950 px-3 pb-2 pt-2 md:px-7 md:pb-4 md:pt-5">
          <h3 className="mb-3 text-xl font-semibold text-accent-500 md:text-2xl">
            Cabin {name}
          </h3>

          <div className="mb-3 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-base text-primary-200 md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline gap-2 md:justify-end md:gap-3">
            {discount > 0 ? (
              <>
                <span className="text-2xl font-[350] md:text-3xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-[350] md:text-3xl">
                ${regularPrice}
              </span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 bg-primary-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block border-l border-primary-800 px-3 py-4 transition-all hover:bg-accent-600 hover:text-primary-900 md:px-6 md:py-4"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
