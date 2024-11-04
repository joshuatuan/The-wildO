import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import CabinsFilter from "../_components/CabinsFilter";
import ReservationReminder from "../_components/ReservationReminder";
import { type Filter as FilterType } from "../types/cabinFilter";

// export const revalidate = 3600; //60s*60s = 1hr ~ revalidate every hour. for static pages. if dynamic already then no need for this

export const metadata = {
  title: "Cabins",
};

type SearchParams = {
  searchParams?: {
    capacity: FilterType;
  };
};

export default function Page({ searchParams }: SearchParams) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400 md:text-5xl">
        Our Luxury Cabins
      </h1>
      <p className="mb-8 max-w-6xl text-base text-primary-200 md:mb-10 md:text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="mb-8 flex justify-end">
        <CabinsFilter />
      </div>

      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
