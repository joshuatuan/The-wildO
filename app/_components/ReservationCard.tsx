import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";
import { Booking } from "../types/booking";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

type ReservationCardProps = {
  booking: Booking;
  onDelete: (bookingId: number) => void;
};

function ReservationCard({ booking, onDelete }: ReservationCardProps) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="border border-primary-800">
      <div className="relative h-32 w-full md:hidden">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="border-r border-primary-800 object-cover"
        />
      </div>
      <div className="flex flex-col border border-primary-800 md:flex-row">
        <div className="relative hidden aspect-square h-44 md:block">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="border-r border-primary-800 object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 px-4 py-3 md:flex-grow md:gap-0 md:px-6">
          {isPast(new Date(startDate)) ? (
            //MOBILE
            <span className="flex h-7 items-center justify-center self-start rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200 md:hidden">
              past
            </span>
          ) : (
            <span className="flex h-7 items-center justify-center self-start rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200 md:hidden">
              upcoming
            </span>
          )}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {numNights} nights in Cabin {name}
            </h3>
            {isPast(new Date(startDate)) ? (
              <span className="hidden h-7 items-center rounded-sm bg-yellow-800 px-3 text-xs font-bold uppercase text-yellow-200 md:flex">
                past
              </span>
            ) : (
              <span className="hidden h-7 items-center rounded-sm bg-green-800 px-3 text-xs font-bold uppercase text-green-200 md:flex">
                upcoming
              </span>
            )}
          </div>

          <p className="text-lg text-primary-300">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            )
          </p>

          <div className="flex flex-col items-baseline md:mt-auto md:flex-row md:gap-5">
            <div className="flex gap-1.5">
              <p className="text-xl font-semibold text-accent-400">
                ${totalPrice}
              </p>
              <p className="text-primary-300">&bull;</p>
              <p className="text-lg text-primary-300">
                {numGuests} guest{numGuests > 1 && "s"}
              </p>
            </div>
            <p className="text-base text-primary-400 md:ml-auto md:text-sm">
              Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
            </p>
          </div>
        </div>

        {!isPast(startDate) ? (
          <div className="flex items-center justify-around border-t border-primary-800 py-4 md:w-[100px] md:flex-col md:border-l md:border-t-0 md:py-0">
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center gap-2 px-5 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900 md:flex-grow md:border-b md:border-primary-800"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
