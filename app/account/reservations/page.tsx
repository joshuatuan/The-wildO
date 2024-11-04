import ReservationFilter from "@/app/_components/ReservationFilter";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import { type ReservationFilter as ReservationFilterType } from "@/app/types/cabinFilter";

export const metadata = {
  title: "Reservations",
};

type searchParams = {
  searchParams: {
    type: ReservationFilterType;
  };
};

export default async function Page({ searchParams }: searchParams) {
  const session = await auth();
  const bookings = await getBookings(session!.user!.guestId);

  const filter = searchParams?.type ?? "upcoming";

  return (
    <div>
      <h2 className="mb-8 text-2xl text-accent-400 first-line:font-semibold md:mb-0">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <>
          <div className="mb-5 mt-2 flex md:mr-8 md:justify-end">
            <ReservationFilter />
          </div>
          <ReservationList bookings={bookings} filter={filter} />
        </>
      )}
    </div>
  );
}
