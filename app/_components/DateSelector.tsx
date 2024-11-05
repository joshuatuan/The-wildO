"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";
import { Cabin } from "../types/cabin";
import { Settings } from "../types/settings";

// export type Range = {
//   from: Date | undefined;
//   to: Date | undefined;
// };

export type Range = DateRange;

function isAlreadyBooked(range: Range | undefined, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! })
    )
  );
}

type DateSelectorProps = {
  cabin: Cabin;
  settings: Settings;
  bookedDates: Date[];
};

function DateSelector({ cabin, settings, bookedDates }: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();

  // prevents selecting a range of dates that contains an already booked date in between
  const displayRange = isAlreadyBooked(range, bookedDates) ? undefined : range;

  const { regularPrice, discount } = cabin;

  let numNights;
  let cabinPrice;
  if (displayRange?.to && displayRange?.from) {
    numNights = differenceInDays(displayRange.to, displayRange.from);
    cabinPrice = numNights * (regularPrice - discount);
  }

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  const endMonth = new Date();
  endMonth.setFullYear(endMonth.getFullYear() + 2); // Set endMonth to a year from now

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-5 text-lg md:scale-100 md:pt-10"
        mode="range"
        selected={displayRange}
        onSelect={(selectedRange: DateRange | undefined) =>
          setRange(selectedRange as Range)
        }
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        disabled={
          (curDate) =>
            isPast(curDate) ||
            bookedDates.some((date) => isSameDay(date, curDate))
          // if curr day is past or in bookedDates, disable it (disable=true)
          // .some() method will stop checking as soon as it finds the first match.
        }
        endMonth={endMonth}
        captionLayout="dropdown"
        hideNavigation={false}
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-4 text-primary-800 md:rounded-b-md md:rounded-br-none md:px-8">
        <div className="flex items-baseline gap-2 md:gap-6">
          <div className="flex flex-col items-baseline">
            {discount > 0 ? (
              <div>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
                <span className="">/night</span>
              </div>
            ) : (
              <span className="text-2xl">${regularPrice} /night</span>
            )}
            {numNights ? (
              <div className="md:hidden">
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-xl font-semibold md:text-2xl">
                  ${cabinPrice}
                </span>
              </div>
            ) : null}
          </div>
          {numNights ? (
            <>
              <p className="rounded-md text-2xl md:bg-accent-600 md:px-3 md:py-2">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="hidden md:block">
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="rounded-md border border-primary-800 px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-accent-600"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
