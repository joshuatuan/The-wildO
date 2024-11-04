import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import Image from "next/image";
import { CabinData } from "../types/action";

function Cabin({ cabin }: { cabin: CabinData }) {
  const { name, maxCapacity, image, description } = cabin;
  const lorem =
    "ipsum dolor sit amet consectetur adipisicing elit. Culpa molestias pariatur architecto velit nihil sint aspernatur, quo nostrum eaque sit fuga dignissimos nulla! Adipisci non, perspiciatis officiis quod facilis doloribus.";

  const maxDescWords = 15;
  return (
    <div>
      {/* mobile */}
      <div className="relative h-64 w-full drop-shadow-[0px_4px_12px_rgba(198,153,99,0.1)] md:hidden">
        <Image
          src={image}
          fill
          className="rounded-lg object-cover"
          alt={`Cabin ${name}`}
        />
      </div>
      {/* desktop */}
      <div className="mb-2 grid grid-cols-1 items-center justify-center gap-5 rounded-md border-primary-800 px-6 pt-8 md:mb-24 md:grid md:grid-cols-[3fr_4fr] md:gap-14 md:border md:py-2">
        <div className="relative hidden h-64 w-full drop-shadow-[0px_4px_12px_rgba(198,153,99,0.1)] md:block md:h-full md:-translate-x-3 md:scale-[1.15]">
          <Image
            src={image}
            fill
            className="rounded-lg object-cover"
            alt={`Cabin ${name}`}
          />
        </div>
        <div>
          <h3 className="mb-5 rounded-3xl bg-primary-950 pb-1 text-5xl font-black text-accent-100 md:w-[120%] md:translate-x-[-254px] md:p-4 md:text-start md:text-7xl">
            Cabin {name}
          </h3>

          <p className="mb-8 text-lg text-primary-300 md:mb-10">
            <TextExpander maxWords={maxDescWords}>{description}</TextExpander>
          </p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <strong>{maxCapacity}</strong> guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the <strong>Dolomites</strong> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <strong>100%</strong> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cabin;
