"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";
import { type Cabin } from "../types/cabin";
import { type User } from "../types/user";
import Image from "next/image";
import { UserCircleIcon, UserIcon } from "@heroicons/react/24/solid";

type ReservationFormProp = {
  cabin: Cabin;
  user: User;
  // guest:
};

function ReservationForm({ cabin, user, guest }: ReservationFormProp) {
  let numNights;
  let cabinPrice;

  const { range, resetRange } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  if (startDate && endDate) {
    numNights = differenceInDays(endDate, startDate);
    cabinPrice = numNights * (regularPrice - discount);
  }

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  // this will bind the booking data as the first argument of the createBooking fn
  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="grid">
      <div className="flex items-center justify-between bg-primary-800 px-8 py-4 text-primary-300 md:rounded-r-md md:rounded-br-none md:px-16 md:py-2">
        <p>Logged in as</p>
        <div className="flex items-center gap-2">
          {user!.image ? (
            <>
              <img
                // Important to display google profile images
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
                src={user!.image}
                alt={`${user!.name} profile picture`}
              />
            </>
          ) : (
            <UserCircleIcon className="h-8" />
          )}
          <p>{guest.fullName}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          // we need to do this here because can't use hook on the server actions
          createBookingWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-5 bg-primary-900 px-8 py-10 text-lg md:rounded-b-md md:px-16"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-7 text-primary-800 shadow-sm placeholder:text-primary-600"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-center gap-6 md:justify-end">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
