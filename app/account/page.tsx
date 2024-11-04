import { auth } from "../_lib/auth";
import { getGuest } from "../_lib/data-service";

export const metadata = {
  title: "Guest",
};

// account is protected. without a signed in account user can't get here.
export default async function Page() {
  const session = await auth();

  const { fullName } = await getGuest(session!.user!.email);
  const firstName = fullName?.split(" ").at(0);

  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {firstName}
    </h2>
  );
}
