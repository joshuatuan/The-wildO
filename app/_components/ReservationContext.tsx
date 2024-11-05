"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { type Range } from "./DateSelector";

type ReservationContextValue = {
  range: Range;
  setRange: (range: Range) => void;
  resetRange: () => void;
};

const ReservationContext = createContext<ReservationContextValue | undefined>(
  undefined
);

const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<Range>(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
