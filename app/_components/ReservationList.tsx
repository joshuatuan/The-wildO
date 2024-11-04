"use client";

import { isPast } from "date-fns";
import { deleteBooking } from "../_lib/actions";
import { Booking } from "../types/booking";
import { ReservationFilter } from "../types/cabinFilter";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

type ReservationListProps = {
  bookings: Booking[];
  filter: ReservationFilter;
};

function ReservationList({ bookings, filter }: ReservationListProps) {
  // the state when there's no async function has been ran, the function called when we delete
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  }

  let sortedBookings;
  if (filter === "upcoming") {
    sortedBookings = optimisticBookings.filter(
      (booking) => !isPast(booking.startDate)
    );
  }
  if (filter === "past") {
    sortedBookings = optimisticBookings.filter((booking) =>
      isPast(booking.startDate)
    );
  }
  if (filter === "all") {
    sortedBookings = optimisticBookings;
  }
  sortedBookings = sortedBookings!.slice().sort((a, b) => b.id - a.id); //desc order

  return (
    <ul className="space-y-10 md:space-y-6 md:px-8">
      {sortedBookings!.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;

// let displayedCabins;
// if (filter === "all") displayedCabins = cabins;
// if (filter === "small")
//   displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
// if (filter === "medium")
//   displayedCabins = cabins.filter(
//     (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
//   );
// if (filter === "large")
//   displayedCabins = cabins.filter((cabin) => cabin.maxCapacity > 8);

// return (
//   <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
//     {displayedCabins?.map((cabin) => (
