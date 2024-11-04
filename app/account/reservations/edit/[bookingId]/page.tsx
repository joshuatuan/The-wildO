import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

type params = {
  params: {
    bookingId: string;
  };
};

export default async function Page({ params }: params) {
  const { bookingId } = params;

  const { numGuests, observations, cabinId } = await getBooking(
    Number(bookingId)
  );
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="mb-7 text-xl font-semibold text-accent-400 md:text-2xl">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="flex flex-col gap-8 bg-primary-900 px-4 py-8 text-lg md:gap-6 md:px-12"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-2 text-primary-800 shadow-sm md:py-3"
            required
            defaultValue={numGuests}
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
            className="w-full rounded-sm bg-primary-200 px-5 py-2 text-primary-800 shadow-sm md:py-3"
            defaultValue={observations}
          />
        </div>

        <div className="flex items-center justify-center gap-6 md:justify-end">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
        <input type="hidden" name="bookingId" value={bookingId}></input>
      </form>
    </div>
  );
}
