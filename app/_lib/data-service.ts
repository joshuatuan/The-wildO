import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { CabinData, CabinsData } from "../types/action";
import bcrypt from "bcryptjs";
import { Booking } from "../types/booking";
import { Guest } from "../types/user";

export async function getCabin(id: number): Promise<CabinData> {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export const getCabins = async function (): Promise<CabinsData[]> {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string): Promise<Guest> {
  const { data } = await supabase
    .from("guests")
    .select(
      "id, created_at, fullName, email, nationalId, nationality, countryFlag"
    )
    .eq("email", email)
    .single();

  // sign in callback handles the possibility of no guest
  return data as Guest;
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: number): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)"
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  // @ts-expect-error: i don't know why it's expecting an array of cabins at type Booking cabins:{}
  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const todayStr = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${todayStr},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

type newGuest = {
  email: string;
  fullName: string;
};

export async function createGuest(newGuest: newGuest) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function saltAndHashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export async function registerGuest(email: string, password: string) {
  const passwordHash = await saltAndHashPassword(password);

  const { data, error } = await supabase
    .from("guests")
    .insert([{ email, passwordHash: passwordHash }]);

  if (error) throw new Error("User could not be created");

  return data;
}
/*
/////////////
// CREATE



export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from("guests")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
*/
