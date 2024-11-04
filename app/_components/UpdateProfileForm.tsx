import { updateGuest } from "../_lib/actions";
import SelectCountry from "./SelectCountry";
import SubmitButton from "./SubmitButton";

type UpdateProfileFormProps = {
  guest: {
    fullName: string;
    email: string;
    nationality: string;
    nationalId: string;
    countryFlag: string;
  };
};

function UpdateProfileForm({ guest }: UpdateProfileFormProps) {
  const { fullName, email, nationality, nationalId, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="flex flex-col gap-6 rounded-md bg-primary-900 px-6 py-8 text-lg md:px-12"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          defaultValue={fullName}
          name="fullName"
          className="w-full rounded-sm bg-primary-200 px-5 py-2 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 md:py-3"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          defaultValue={email}
          name="email"
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-2 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 md:py-3"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Country</label>
          {countryFlag && (
            <img
              src={countryFlag}
              name="countryFlag"
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          )}
        </div>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm md:py-3"
          defaultCountry={guest.nationality}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalId}
          name="nationalId"
          className="w-full rounded-sm bg-primary-200 px-5 py-2 text-primary-800 shadow-sm md:py-3"
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-6 md:mt-0 md:justify-end">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
