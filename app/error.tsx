"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Oops! Something went wrong</h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="inline-block rounded-lg bg-accent-500 px-6 py-3 text-lg text-primary-800 hover:bg-accent-600"
      >
        Try again
      </button>
    </main>
  );
}
