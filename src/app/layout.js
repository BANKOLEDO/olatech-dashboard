import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🟢 Metadata per route
const metaMap = {
  "/": {
    title: "Dashboard | Olatech",
    description: "Your personal finance dashboard",
  },
  "/wallets": {
    title: "Wallets | Olatech",
    description: "Manage your wallets with ease",
  },
  "/transactions": {
    title: "Transactions | Olatech",
    description: "Track all your financial transactions",
  },
  "/invoices": {
    title: "Invoices | Olatech",
    description: "Create and manage invoices quickly",
  },
  "/recurring-payments": {
    title: "Recurring Payments | Olatech",
    description: "Automate and track recurring bills",
  },
  "/subscriptions": {
    title: "Subscriptions | Olatech",
    description: "Stay on top of your active subscriptions",
  },
  "/login": {
    title: "Login | Olatech",
    description: "Access your dashboard securely",
  },
};

export async function generateMetadata({ params }) {
  // Can't access pathname directly here, but you can fallback
  // Next.js matches based on segment name
  return metaMap[`/${params?.slug || ""}`] || {
    title: "Olatech Dashboard",
    description: "Personal Finance Dashboard",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
