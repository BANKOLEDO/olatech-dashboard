"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Wallet, BarChart3, FileText, Receipt,
  RefreshCcw, CreditCard, MessageSquare, Settings, HelpCircle, LogOut, Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mainMenu = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Wallets", href: "/wallets", icon: Wallet },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Invoices", href: "/invoices", icon: Receipt },
];

const features = [
  { name: "Recurring", href: "/recurring", icon: RefreshCcw },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
];

const controls = [
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help Desk", href: "/help", icon: HelpCircle },
];

function Section({ title, items, onClick }) {
  const pathname = usePathname();
  return (
    <div className="mt-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2 px-4">{title}</p>
      <div className="flex flex-col gap-1">
        {items.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              onClick={onClick}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 mx-2 text-sm transition ${
                active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              {name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function SidebarContent({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-[0.61rem] border-b border-gray-200">
        <div className="h-10 w-10 rounded-full bg-brand text-white font-bold grid place-items-center">F</div>
        <span className="font-bold text-lg">OLATECH</span>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-9 text-sm rounded-lg" />
        </div>
      </div>

      <Section title="Main Menu" items={mainMenu} onClick={onNavigate} />
      <Section title="Features" items={features} onClick={onNavigate} />
      <Section title="Control" items={controls} onClick={onNavigate} />

      {/* Logout */}
      <div className="mt-2 px-2">
        <button className="flex items-center gap-3 text-sm text-red-500 hover:bg-red-50 w-full rounded-lg px-4 py-2">
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>

      {/* Starter Plan card */}
      <div className="mt-auto mb-6 mx-4 p-4 rounded-xl bg-orange-50 border border-orange-200">
        <h4 className="font-semibold text-sm">Starter Plan</h4>
        <p className="text-xs text-gray-600 mt-1">
          Upgrade to the enterprise plan & get attractive discounts
        </p>
        <Button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
          Upgrade Now
        </Button>
      </div>
    </div>
  );
}
