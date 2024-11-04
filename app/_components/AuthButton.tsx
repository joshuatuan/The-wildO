"use client";

import { MouseEvent, ReactNode, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

type AuthButtonProps = {
  onClick: (formData: FormData) => Promise<void>;
  className: string;
  children: ReactNode;
};

function AuthButton({ onClick, className, children }: AuthButtonProps) {
  const [isPending, startTransition] = useTransition();

  // MouseEvent cause the handleAuth is attached to a button's "on click"
  async function handleAuth(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault(); // Prevent default button action
    const form = e.currentTarget.form; // Get the form element
    if (form) {
      startTransition(async () => await onClick(new FormData(form))); // Pass the form data to auth
    }
  }

  return (
    <button
      onClick={handleAuth}
      className={`${className} flex h-12 items-center justify-center`}
    >
      {!isPending ? (
        children
      ) : (
        <span className="flex items-center justify-center">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default AuthButton;