import { ReactNode } from "react";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-[4rem_1fr] gap-1.5 md:h-full md:grid-cols-[16rem_1fr] md:gap-8">
      <SideNavigation />
      <div className="px-2 py-1 md:px-1">{children}</div>
    </div>
  );
}