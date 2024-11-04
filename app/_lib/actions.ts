"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getGuest, saltAndHashPassword } from "./data-service";
import { redirect } from "next/navigation";
import { type BookingData } from "../types/action";
import { signInSchema } from "./zod";

export async function updateGuest(formData: FormData) {
  // nextjs automatically handles all the form data on the form and shit. web api standard ting yea for the form

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalId = formData.get("nationalId") as string | null;
  const nation = formData.get("nationality") as string | null;
  const fullName = formData.get("fullName") as string | null;

  const [nationality, countryFlag] = nation ? nation.split("%") : [null, null]; //'nationality%flagEmoji'

  // regex that checks for an alphanumeric string between 6 and 12 characters
  if (nationalId && !/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error("Please provide a valid national ID");

  const updateData = { fullName, nationality, countryFlag, nationalId };

  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user!.guestId)
    .select();
  if (error) throw new Error(error.message);

  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // array of booking ids this user has made
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  // this will protect other rows from being manipulated by a modified cURL request
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function createBooking(
  bookingData: BookingData,
  formData: FormData
) {
  // 1. Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000) || "",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}

export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1. Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2. Authorization
  const guestBookings = await getBookings(session!.user!.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3. Building update data
  const updateData = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations")?.slice(0, 1000) || "",
  };

  // 4. Mutation with the supabase API
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) throw new Error(error.message);

  // 5. revalidating cache and redirecting
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function handleSignIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // Sign-in logic
  const res = await signIn("credentials", {
    email,
    password,
    redirectTo: "/account",
  });
  // await signIn("google", { redirectTo: "/account" });

  if (!res || res.error) {
    throw new Error(res.error); // This will contain "Invalid credentials" if auth fails
  }
}

export async function handleSignUp(formData: FormData) {
  const emailData = formData.get("email") as string;
  const passwordData = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const { email, password } = await signInSchema.parseAsync({
    email: emailData,
    password: passwordData,
  });

  const isRegistered = await getGuest(email);

  if (isRegistered) {
    throw new Error("User already exists");
  }

  const passwordHash = await saltAndHashPassword(password);
  const { error } = await supabase
    .from("guests")
    .insert([{ email, passwordHash, fullName }]);

  if (error) {
    throw new Error("User could not be created");
  }

  const res = await signIn("credentials", {
    email,
    password,
    redirectTo: "/account",
  });
  // await signIn("google", { redirectTo: "/account" });

  if (!res || res.error) {
    throw new Error(res.error);
  }
}
