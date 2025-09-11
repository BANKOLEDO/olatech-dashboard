import Link from "next/link";
import { Bell } from "lucide-react";

export default function BellIcon({ unreadCount }) {
  return (
    <Link href="/notifications" className="relative">
      <Bell className="h-6 w-6 cursor-pointer hover:text-gray-700" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border border-white"></span>
      )}
    </Link>
  );
}
