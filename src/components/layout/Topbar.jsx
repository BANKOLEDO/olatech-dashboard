"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Bell, MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SidebarContent from "./SidebarContent";
import BellIcon from "@/components/layout/BellIcon"

export default function Topbar({ user }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "User", email: "user@email.com" });
  const pathname = usePathname();
  const router = useRouter();

  // Simulate fetching user data based on dummyToken
  useEffect(() => {
    const token = localStorage.getItem("dummyToken");
    if (token) {
      const name = localStorage.getItem("userName") || "User";
      const email = localStorage.getItem("userEmail") || "user@email.com";
      setUserData({ name, email });
    } else {
      setUserData({ name: "User", email: "user@email.com" });
    }
  }, []);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("dummyToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  // Render only logo on login page
  if (pathname === "/login") {
    return (
      <header className="w-full border-b bg-white px-4 py-3 flex justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-brand text-white font-bold grid place-items-center">F</div>
          <span className="font-bold text-lg">OLATECH</span>
        </div>
      </header>
    );
  }

  // Render full topbar for other pages
  return (
    <header className="w-full border-b bg-white px-4 py-3 flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
      {/* Row 1 (mobile): menu + logo */}
      <div className="flex items-center gap-2 md:hidden justify-between">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader>
              <VisuallyHidden>
                <SheetTitle>Sidebar Navigation</SheetTitle>
              </VisuallyHidden>
            </SheetHeader>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <span className="text-xl font-bold text-brand">OLATECH</span>
      </div>

      {/* Welcome (center on mobile, left on desktop, hidden on login page) */}
      <p className="text-2xl md:text-xl lg:text-2xl font-bold text-blue-800 md:mr-auto text-center md:text-left">
        Welcome back, <span className="font-bold">{userData.name}</span>
      </p>

      {/* Actions + user menu (right side) */}
      <div className="flex items-center justify-center md:justify-end gap-4">
        <a href="/help"><HelpCircle className="h-5 w-5 cursor-pointer hover:text-gray-700" /></a>
        <a href="/feedback"> <MessageSquare className="h-5 w-5 cursor-pointer hover:text-gray-700" /></a>
        <BellIcon />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userData.avatar || "/avatar.png"} alt={userData.name} />
              <AvatarFallback>{userData.name[0]}</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium">{userData.name}</span>
              <span className="text-xs text-gray-500">{userData.email}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/login")}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}