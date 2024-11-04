"use client";

import { useState } from "react";
import { handleSignIn } from "../_lib/actions";
import SignInGoogle from "./SignInGoogle";
import AuthButton from "./AuthButton";

export default function SignInForm() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await handleSignIn(formData);
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary-900 p-4 text-lg md:px-8 md:py-6">
      <div className="mb-4 w-full">
        <SignInGoogle />
      </div>

      <p>Or enter your credentials</p>

      <form className="flex w-full flex-col gap-6">
        {/* Email Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-white">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full rounded-sm bg-primary-200 px-4 py-2 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
            required
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-white">
            Password:
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="w-full rounded-sm bg-primary-200 px-4 py-2 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
            required
          />
        </div>

        <AuthButton
          onClick={handleSubmit}
          className="!mt-3 rounded-md bg-accent-500 px-6 py-2 text-white hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
        >
          Sign in
        </AuthButton>

        {error && (
          <p className="text-center text-red-300">Invalid login credentials</p>
        )}
      </form>
    </div>
  );
}
