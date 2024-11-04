"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type ReservationFilter } from "../types/cabinFilter";
import { ReactNode } from "react";

function ReservationFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter =
    (searchParams.get("type") as ReservationFilter) || "upcoming"; //fallback if null

  function handleFilter(filter: ReservationFilter) {
    const params = new URLSearchParams(searchParams);
    params.set("type", filter);

    // navigating on that new/filtered route:
    // we have to set the pathname from the root and shit
    // in this case that's localhost/cabins ? capacity=*filter
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // scroll false wont let the page scroll up or reset
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        filter="upcoming"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Upcoming
      </Button>
      <Button
        filter="past"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        Past
      </Button>
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All
      </Button>
    </div>
  );
}

type ButtonProps = {
  filter: ReservationFilter;
  handleFilter: (filter: ReservationFilter) => void;
  activeFilter: ReservationFilter;
  children: ReactNode;
};

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}

export default ReservationFilter;
