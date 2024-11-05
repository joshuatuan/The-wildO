"use client";

import { useState } from "react";
import SignInGoogle from "./SignInGoogle";
import { handleSignUp } from "../_lib/actions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import AuthButton from "./AuthButton";

export default function SignUpForm() {
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const passwordReq = password.length >= 8;
  const passwordMatch = password === confirmPw;

  // Updated handleSubmit to accept FormData instead of the event
  const handleSubmit = async (formData: FormData) => {
    setError(null);
    try {
      await handleSignUp(formData);
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary-900 p-6 text-lg md:px-8 md:py-6">
      <div className="mb-4 w-full">
        <SignInGoogle />
      </div>

      <p>Or register here</p>

      <form className="flex w-full flex-col space-y-6 md:space-y-3">
        {/* Name Input */}
        <div className="space-y-2 md:space-y-1">
          <label htmlFor="fullName" className="text-white">
            Full Name:
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="w-full rounded-sm bg-primary-200 px-4 py-2 text-primary-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
            required
          />
        </div>

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
          <div className="flex items-center">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <span className="ml-3 text-sm text-gray-300">
              (minimum of 8 characters)
            </span>
          </div>

          <div className="relative w-full">
            <input
              value={password}
              onChange={(e) => {
                if (password.length === 0) {
                  setConfirmPw("");
                }
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              className={`w-full rounded-sm bg-primary-200 px-4 py-2 text-primary-800 shadow-sm focus:outline-none focus:ring-2 ${!passwordReq && password ? "focus:ring-red-300" : "focus:ring-accent-500"}`}
              required
            />
            {password.length >= 8 && (
              <CheckCircleIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-green-600" />
            )}
          </div>
        </div>

        {/* Password confirmation */}
        {password && passwordReq && (
          <div className="space-y-2">
            <label htmlFor="pwConfirmation" className="text-white">
              Confirm Password:
            </label>
            <div className="relative w-full">
              <input
                onChange={(e) => setConfirmPw(e.target.value)}
                type="password"
                name="pwConfirmation"
                id="pwConfirmation"
                className={`w-full rounded-sm bg-primary-200 px-4 py-2 text-primary-800 shadow-sm focus:outline-none focus:ring-2 ${!passwordMatch && confirmPw ? "focus:ring-red-300" : "focus:ring-accent-500"}`}
                required
              />
              {passwordMatch && (
                <CheckCircleIcon className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-green-600" />
              )}
            </div>
            {confirmPw && password !== confirmPw && (
              <p className="text-sm text-red-300">Password does not match</p>
            )}
          </div>
        )}

        {error && <p className="text-center text-red-300">{error}</p>}

        {/* Action Type & Submit */}
        <AuthButton
          onClick={handleSubmit}
          className="!mt-6 rounded-md bg-accent-500 px-6 py-2 text-white hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 disabled:cursor-not-allowed"
        >
          Sign up
        </AuthButton>
      </form>
    </div>
  );
}
