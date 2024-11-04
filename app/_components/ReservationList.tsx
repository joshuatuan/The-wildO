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
    <div className="flex justify-center">
      <ul className="max-h-[calc(100vh-20rem)] space-y-8 overflow-auto overflow-y-auto md:max-h-[calc(100vh-20rem)] md:space-y-6 md:px-0">
        {sortedBookings!.map((booking) => (
          <ReservationCard
            booking={booking}
            key={booking.id}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ReservationList;
