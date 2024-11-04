"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  // CHANGE
  const { range, resetRange } = useReservation();

  if (!range?.from || !range?.to) return null;

  return (
    <div className="text shadow-slate-900 px- fixed bottom-6 left-1/2 flex w-80 -translate-x-1/2 items-center rounded-lg bg-accent-500 px-4 py-3 text-lg font-semibold text-primary-800 shadow-xl md:px-8">
      <p className="">
        <p className="text-center text-2xl">👋</p>
        Don&apos;t forget to reserve your dates from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        onClick={resetRange}
        className="rounded-full p-1 transition-all hover:bg-accent-600"
      >
        <XMarkIcon className="h-7 w-7" />
      </button>
    </div>
  );
}

export default ReservationReminder;
