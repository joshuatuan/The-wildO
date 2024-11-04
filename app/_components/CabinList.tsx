import { getCabins } from "../_lib/data-service";
import CabinCard from "./CabinCard";
import { Filter } from "../types/cabinFilter";

async function CabinList({ filter }: { filter: Filter }) {
  // noStore();
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 8);

  const cabinsLength = displayedCabins!.length || 0;

  return (
    <div
      className={`grid grid-cols-1 gap-8 ${cabinsLength > 1 ? "md:grid-cols-2" : "md:grid-cols-1"} lg:gap-10`}
    >
      {cabinsLength === 0 ? (
        <p className="col-span-full text-center text-lg text-primary-200">
          No cabins available
        </p>
      ) : (
        displayedCabins?.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin.id} />
        ))
      )}
    </div>
  );
}
export default CabinList;
