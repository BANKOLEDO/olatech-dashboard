"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // ✅ Special layout for login page
  if (pathname === "/login") {
    return (
      <>
        <header className="w-full border-b bg-white px-4 py-3 flex justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">OLATECH</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </>
    );
  }

  // ✅ Full layout for other pages
  return (
    <div className="flex h-screen">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
