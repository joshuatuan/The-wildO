import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import Image from "next/image";
import { CabinData } from "../types/action";

function Cabin({ cabin }: { cabin: CabinData }) {
  const { name, maxCapacity, image, description } = cabin;

  const maxDescWords = 40;
  const descWords = description.split(" ").length;

  return (
    <>
      <div className="relative h-64 w-full border border-primary-800 md:hidden md:-translate-x-3 md:scale-[1.15]">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>
      <div className="mb-14 grid grid-cols-1 items-center justify-center gap-5 border border-primary-800 px-10 pt-8 md:mb-24 md:grid md:grid-cols-[3fr_4fr] md:gap-20 md:py-3">
        <div className="relative hidden h-64 w-full md:block md:h-full md:-translate-x-3 md:scale-[1.15]">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>
        <div>
          <h3 className="mb-5 bg-primary-950 pb-1 text-center text-4xl font-black text-accent-100 md:w-[150%] md:translate-x-[-254px] md:p-6 md:text-start md:text-7xl">
            Cabin {name}
          </h3>

          <p className="mb-8 text-lg text-primary-300 md:mb-10">
            {descWords > maxDescWords ? (
              <TextExpander maxWords={maxDescWords}>{description}</TextExpander>
            ) : (
              description
            )}
          </p>

          <ul className="mb-7 flex flex-col gap-4">
            <li className="flex items-center gap-3">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex items-center gap-3">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Cabin;
