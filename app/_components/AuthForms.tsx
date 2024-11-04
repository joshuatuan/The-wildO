"use client";

import { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

export default function AuthForms() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="text-lg">
      {isSignUp ? (
        /////////////// SIGN UP
        <div>
          <div className="flex flex-col">
            <SignUpForm />
            <span className="mt-8 text-center">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-accent-400 hover:underline"
              >
                {" "}
                Sign in instead
              </button>
            </span>
          </div>
        </div>
      ) : (
        //////////// SIGN IN
        <div className="flex flex-col">
          <SignInForm />
          <span className="mt-8 text-center">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => setIsSignUp(true)}
              className="text-accent-400 hover:underline"
            >
              {" "}
              Sign up now
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
