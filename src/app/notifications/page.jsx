"use client";

import { useState } from "react";
import {
  Mail,
  AlertCircle,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
  X,
} from "lucide-react";

// Realistic dashboard-related notifications
const dummyNotifications = [
  {
    id: 1,
    title: "Payment Successful",
    message: "Your subscription payment of $49.99 was processed.",
    details: "Transaction ID: TXN123456789 • Paid using Visa ending in 4242.",
    read: false,
    type: "transaction",
    time: "5m ago",
  },
  {
    id: 2,
    title: "Payment Failed",
    message: "Your payment of $19.99 could not be completed.",
    details:
      "Your bank declined this transaction. Please update your payment method.",
    read: false,
    type: "alert",
    time: "20m ago",
  },
  {
    id: 3,
    title: "Subscription Renewed",
    message: "Your Premium Plan was successfully renewed.",
    details: "Plan: Premium • Renewal Date: Jan 10, 2025 • Amount: $49.99",
    read: true,
    type: "subscription",
    time: "1h ago",
  },
  {
    id: 4,
    title: "New Login Detected",
    message: "Your account was accessed from a new device.",
    details: "Location: Lagos, Nigeria • Device: Chrome on Windows",
    read: false,
    type: "security",
    time: "2h ago",
  },
  {
    id: 5,
    title: "Invoice Generated",
    message: "Your invoice for January is ready to download.",
    details: "Invoice #INV2025-001 • Amount: $49.99 • Due Date: Jan 15, 2025",
    read: true,
    type: "transaction",
    time: "5h ago",
  },
  {
    id: 6,
    title: "Subscription Expiring",
    message: "Your Pro subscription will expire in 3 days.",
    details: "Plan: Pro • Expiry Date: Jan 13, 2025 • Renew to avoid downtime.",
    read: false,
    type: "subscription",
    time: "1d ago",
  },
  {
    id: 7,
    title: "Refund Processed",
    message: "A refund of $15.00 has been issued to your account.",
    details:
      "Transaction ID: TXN987654321 • Refunded to MasterCard ending in 5544.",
    read: true,
    type: "transaction",
    time: "2d ago",
  },
  {
    id: 8,
    title: "System Update",
    message: "We’ve updated our Terms of Service.",
    details:
      "Version 2.3 now includes GDPR compliance and new data privacy options.",
    read: true,
    type: "info",
    time: "3d ago",
  },
  {
    id: 9,
    title: "Password Changed",
    message: "Your password was successfully updated.",
    details: "Changed at: Jan 7, 2025 • IP: 102.89.45.233 • Device: iPhone 14",
    read: false,
    type: "security",
    time: "3d ago",
  },
  {
    id: 10,
    title: "Trial Period Ending",
    message: "Your free trial will expire in 24 hours.",
    details: "Upgrade to continue using premium features without interruption.",
    read: false,
    type: "subscription",
    time: "4d ago",
  },
  {
    id: 11,
    title: "Card Expiring Soon",
    message: "Your payment card on file will expire soon.",
    details: "Visa ending in 4242 • Expiry Date: Jan 2025 • Update card now.",
    read: true,
    type: "alert",
    time: "5d ago",
  },
  {
    id: 12,
    title: "Unusual Activity Detected",
    message: "We noticed unusual login attempts on your account.",
    details:
      "Failed login attempts: 3 • Location: Unknown • Action: Change password.",
    read: false,
    type: "security",
    time: "6d ago",
  },
  {
    id: 13,
    title: "Feature Release",
    message: "New dashboard analytics have been rolled out.",
    details:
      "Includes: Real-time transaction tracking, subscription trends, and charts.",
    read: true,
    type: "info",
    time: "1w ago",
  },
  {
    id: 14,
    title: "Two-Factor Enabled",
    message: "Two-factor authentication has been enabled for your account.",
    details: "Method: Authenticator App • Backup Codes Generated: 10",
    read: true,
    type: "security",
    time: "2w ago",
  },
];


export default function NotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [selected, setSelected] = useState(null);

  const filtered = notifications.filter((n) => {
    if (filter === "read") return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const renderIcon = (type) => {
    switch (type) {
      case "transaction":
        return <CreditCard className="w-5 h-5 text-green-500 mt-1" />;
      case "subscription":
        return <RefreshCcw className="w-5 h-5 text-purple-500 mt-1" />;
      case "security":
        return <ShieldCheck className="w-5 h-5 text-yellow-500 mt-1" />;
      case "alert":
        return <AlertCircle className="w-5 h-5 text-red-500 mt-1" />;
      default:
        return <Mail className="w-5 h-5 text-blue-500 mt-1" />;
    }
  };

  return (
    <div className="max-w-full md:max-w-3xl mx-auto mt-6 p-4 bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header + Filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "all" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "unread" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "read" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div className="divide-y">
        {filtered.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-3 cursor-pointer transition ${
              !n.read
                ? "bg-blue-50 hover:bg-blue-100"
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => {
              markAsRead(n.id);
              setSelected(n);
            }}
          >
            {renderIcon(n.type)}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{n.title}</p>
              <p className="text-sm text-gray-600 line-clamp-1">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
            {!n.read && (
              <span className="w-2 h-2 rounded-full bg-red-500 mt-2"></span>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Details */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-3 mb-4">
              {renderIcon(selected.type)}
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {selected.title}
                </h2>
                <p className="text-sm text-gray-500">{selected.time}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{selected.message}</p>
            <p className="text-sm text-gray-600">{selected.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}
