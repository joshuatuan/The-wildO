import { type ReactNode } from "react";
import { signInAction } from "../_lib/actions";

function SignInGoogle({
  children = "Continue with Google",
}: {
  children?: ReactNode;
}) {
  return (
    <form action={signInAction}>
      <button className="flex !w-full items-center justify-center gap-3 rounded-md border border-primary-300 px-4 py-2 text-lg font-medium hover:bg-primary-800 md:py-3">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span className="pt-1">{children}</span>
      </button>
    </form>
  );
}
export default SignInGoogle;
