// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      guestId?: string;
      // add other properties from the original user type if needed
    } & DefaultSession["user"];
  }

  interface User {
    guestId?: string;
    // add other properties from the original user type if needed
  }
}
