"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

type DeleteReservationProps = {
  bookingId: number;
  onDelete: (bookingId: number) => void;
};

function DeleteReservation({ bookingId, onDelete }: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="flex w-[100px] items-center gap-2 rounded-md bg-primary-800 px-4 py-2 text-sm font-semibold text-primary-300 transition-colors hover:bg-primary-950"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
          <span>Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
