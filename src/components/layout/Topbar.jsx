"use client";

import { useState, useEffect } from "react";
import { Menu, Bell, MessageSquare, HelpCircle, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import SidebarContent from "./SidebarContent";

export default function Topbar({ user }) {
  const [open, setOpen] = useState(false);

  // ✅ Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

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

      {/* Welcome (center on mobile, left on desktop) */}
      <p className="text-2xl md:text-xl lg:text-2xl font-bold text-blue-800 md:mr-auto text-center md:text-left">
        Welcome back, <span className="font-bold">{user?.name || "User"}</span>
      </p>

      {/* Actions + user menu (right side) */}
      <div className="flex items-center justify-center md:justify-end gap-4">
        <HelpCircle className="h-5 w-5 cursor-pointer hover:text-gray-700" />
        <MessageSquare className="h-5 w-5 cursor-pointer hover:text-gray-700" />
        <Bell className="h-5 w-5 cursor-pointer hover:text-gray-700" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar || "/avatar.png"} alt={user?.name || "User"} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-medium">{user?.name || "User Name"}</span>
              <span className="text-xs text-gray-500">{user?.email || "user@email.com"}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {/* sign in */}}>Sign In</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {/* log out */}}>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
