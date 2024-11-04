"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  pendingLabel: string;
  children: ReactNode;
};

export default function SubmitButton({
  pendingLabel = "Submitting...",
  children,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="rounded-md bg-accent-500 px-6 py-3 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 md:px-8 md:py-4"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
