import { getCountries } from "@/app/_lib/data-service";

type Country = {
  name: string;
  flag: string;
  independent: boolean;
};

type SelectCountryProps = {
  defaultCountry?: string | null;
  name: string;
  id: string;
  className: string;
  required?: boolean;
};

async function SelectCountry({
  defaultCountry,
  name,
  id,
  className,
  required = false,
}: SelectCountryProps) {
  const countries = await getCountries();
  const flag =
    countries.find((country: Country) => country.name === defaultCountry)
      ?.flag ?? "";

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}` || undefined}
      className={className}
      required={required}
    >
      <option value="">Select country...</option>
      {countries.map((c: Country) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
