export type User = {
  email: string;
  guestId: number;
  image: string;
  name: string;
} | null;

// Guest information and all that
export type Guest = {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalId: string | null;
  nationality: string | null;
  countryFlag: string | null;
};
