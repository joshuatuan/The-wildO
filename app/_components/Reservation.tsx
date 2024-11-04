import { auth } from "../_lib/auth";
import {
  getBookedDatesByCabinId,
  getGuest,
  getSettings,
} from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";
import { type Cabin } from "../types/cabin";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [bookedDates, settings] = await Promise.all([
    getBookedDatesByCabinId(cabin.id),
    getSettings(),
  ]);

  const session = await auth(); // Google auths have name and image in session. Credential auths does not
  const guest = await getGuest(session?.user?.email);

  return (
    <div className="grid rounded-md border border-primary-800 md:min-h-[425px] md:grid-cols-2">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} guest={guest} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
