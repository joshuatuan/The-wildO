import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

interface ReservationCardProps {
  booking: {
    id: number;
    startDate: string;
    endDate: string;
    numNights: number;
    totalPrice: number;
    numGuests: number;
    created_at: string;
    cabins: {
      name: string;
      image: string;
    };
  };
  onDelete: (bookingId: number) => Promise<void>;
}

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

  const isPastBooking = isPast(new Date(startDate));
  const headerColor = isPastBooking
    ? "text-primary-300"
    : "text-accent-500 font-semibold";

  return (
    <div className="flex max-w-lg flex-col overflow-hidden rounded-md bg-primary-900 shadow-lg transition-shadow hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-40">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          quality={10}
          fill
          className="rounded-lg rounded-b-none object-cover"
        />
      </div>

      {/* HEADER */}
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className={`text-xl ${headerColor} md:text-2xl`}>
            {numNights} nights in Cabin {name}
          </h3>
        </div>

        {/* BODY */}
        <div className="block gap-2 md:flex">
          <p className="text-primary-300 md:text-lg">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
          <p className="text-primary-300 md:text-lg">
            {isToday(new Date(startDate))
              ? "Today"
              : `(${formatDistanceFromNow(startDate)})`}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-baseline gap-2">
          <p className={`text-xl ${headerColor} md:text-2xl`}>${totalPrice}</p>
          <p className="text-xl text-primary-300 md:text-2xl">
            &bull; {numGuests} guest{numGuests > 1 ? "s" : ""}
          </p>
          <p className="text-sm font-semibold text-primary-400">
            Booked on {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>

        {!isPastBooking && (
          <div className="flex items-center gap-4 border-primary-800">
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex items-center justify-center gap-2 rounded-md bg-accent-600 px-4 py-2 text-sm font-semibold text-primary-950 transition-colors hover:bg-accent-700"
            >
              <PencilSquareIcon className="h-5 w-5" />
              <span>Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
