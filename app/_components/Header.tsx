import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
import { auth } from "../_lib/auth";

async function Header() {
  const session = await auth(); //current session of the currently logged in user

  return (
    <header className="z-10 px-6 pt-8 md:px-8 md:pb-5 md:pt-8">
      <div className="mx-auto max-w-7xl items-center justify-between md:flex">
        <div className="hidden md:block">
          <Logo />
        </div>
        {/* <Logo /> */}

        <Navigation session={session} />
      </div>
    </header>
  );
}

export default Header;
