"use client";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 h-screen border-r border-gray-200 bg-white">
      <SidebarContent />
    </aside>
  );
}
