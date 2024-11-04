import AuthForms from "../_components/AuthForms";
import SelectCountry from "../_components/SelectCountry";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="mx-auto mt-4 max-w-xl px-4 md:mt-0">
      <AuthForms
      // SelectCountry={
      //   <SelectCountry
      //     name="nationality"
      //     id="nationality"
      //     className="w-full rounded-sm bg-primary-200 px-4 py-2 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500 md:py-3"
      //     required={true}
      //   />
      />
    </div>
  );
}
