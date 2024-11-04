"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Filter } from "../types/cabinFilter";
import { ReactNode } from "react";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = (searchParams.get("capacity") as Filter) || "all"; //fallbacks to all if null

  function handleFilter(filter: Filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    // navigating on that new/filtered route:
    // we have to set the pathname from the root and shit
    // in this case that's localhost/cabins ? capacity=*filter
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // scroll false wont let the page scroll up or reset
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>

      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

type ButtonProps = {
  filter: Filter;
  handleFilter: (filter: Filter) => void;
  activeFilter: Filter;
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

export default Filter;
