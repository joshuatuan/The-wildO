import Header from "./_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_components/ReservationContext";
import { ReactNode } from "react";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap", // default font first then swap once downloaded
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description: "Luxurious cabin hotel, located in the heart of Tondo, Manila",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body
        className={`${josefin.className} flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />
        <div className="grid flex-1 px-5 pb-12 pt-4 md:px-8 md:py-12">
          <main className="mx-auto w-full max-w-7xl">
              <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
