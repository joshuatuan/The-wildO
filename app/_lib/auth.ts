import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
import Credentials from "next-auth/providers/credentials";
import { supabase } from "./supabase";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Validate input
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // Check if user exists in the database
        // const user = await getGuest(email);

        const { data: user } = await supabase
          .from("guests")
          .select("*")
          .eq("email", email)
          .single();

        if (!user) {
          // throw new Error("User not found.");
          return null;
        }
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (!isMatch) {
          return null;
          // throw new Error("Invalid password.");
        }

        // If everything is fine, return the user object
        return user;
      },
    }),
  ],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user; // trick to convert it to boolean
      // if this returns true the middleware will grant access to the protected routes
    },

    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email!);
        if (!existingGuest)
          // this runs before the signing in process (kinda like a middleware)
          await createGuest({ email: user.email!, fullName: user.name! });
        return true;
      } catch {
        return false;
      }
    },

    async session({ session }) {
      // will run after the signIn call back or every auth() calls ata
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest.id; // mutating the guest id to the sesh
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
