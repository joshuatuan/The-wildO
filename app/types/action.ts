export type BookingData = {
  startDate: Date | null;
  endDate: Date | null;
  numNights: number | undefined;
  cabinPrice: number | undefined;
  cabinId: number;
};

export type BookingApiData = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string;
    image: string;
  }[];
};

export type CabinsData = {
  id: number;
  name: string;
  discount: number;
  maxCapacity: number;
  regularPrice: number;
  image: string;
};

export type CabinData = {
  id: number;
  created_at: string;
  name: string;
  discount: number;
  maxCapacity: number;
  regularPrice: number;
  description: string;
  image: string;
};
