import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { type CabinsData } from "../types/action";

function CabinCard({ cabin }: { cabin: CabinsData }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-primary-800 bg-primary-950 transition-all duration-300 hover:shadow-lg hover:shadow-primary-900 md:w-[330px] lg:w-[400px] xl:w-[500px]">
      <div className="relative h-48 md:h-56">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-2xl font-semibold text-primary-100">{name}</h3>

        <div className="mb-4 flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-primary-600" />
          <p className="text-base text-primary-200">
            For up to <span className="font-bold">{maxCapacity}</span> guests
          </p>
        </div>

        <div className="mb-4 flex items-baseline justify-between">
          <div>
            {discount > 0 ? (
              <>
                <span className="text-2xl font-bold text-accent-500">
                  ${regularPrice - discount}
                </span>
                <span className="ml-2 text-sm font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-accent-500">
                ${regularPrice}
              </span>
            )}
            <span className="ml-1 text-sm text-primary-200">/ night</span>
          </div>
          {discount > 0 && (
            <span className="rounded-xl bg-white px-2 py-1 text-sm font-semibold text-primary-950">
              Save ${discount}
            </span>
          )}
        </div>

        <Link
          href={`/cabins/${id}`}
          className="inline-block w-full rounded-xl bg-accent-600 px-4 py-3 text-center font-semibold text-primary-950 transition-colors hover:bg-accent-700 md:py-2"
        >
          Details & Reservation
        </Link>
      </div>
    </div>
  );
}

export default CabinCard;
