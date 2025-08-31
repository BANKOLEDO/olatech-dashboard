"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const recentTransactions = [
  {
    id: 1,
    name: "Mobile App Purchase",
    date: "Mon 08:30 AM",
    amount: -15.99,
    status: "Success",
    type: "debit",
    icon: "/icons/icons8-app-store.svg",
  },
  {
    id: 2,
    name: "Software License Renewal",
    date: "Mon 12:45 PM",
    amount: -25.99,
    status: "Success",
    type: "debit",
    icon: "/icons/icons8-adobe.svg",
  },
  {
    id: 3,
    name: "App Store Cashback",
    date: "Tue 09:15 AM",
    amount: +5.0,
    status: "Success",
    type: "credit",
    icon: "/icons/icons8-app-store.svg",
  },
  {
    id: 4,
    name: "Cloud Storage Subscription",
    date: "Wed 10:15 AM",
    amount: -5.0,
    status: "Failed",
    type: "debit",
    icon: "/icons/icons8-apple-inc.svg",
  },
  {
    id: 5,
    name: "Tiktok Premium",
    date: "Thu 07:50 PM",
    amount: -12.0,
    status: "Success",
    type: "debit",
    icon: "/icons/icons8-tiktok-50.png",
  },
  {
    id: 6,
    name: "Refund - Video Editing App",
    date: "Fri 11:40 AM",
    amount: +29.99,
    status: "Failed",
    type: "credit",
    icon: "/icons/icons8-video-48.png",
  },
  {
    id: 7,
    name: "Uber Ride",
    date: "Mon 12:15 PM",
    amount: -25,
    status: "Success",
    type: "debit",
    icon: "/icons/lineicons--uber.svg"
  },
  {
    id: 8,
    name: "Gym Membership",
    date: "Wed 10:20 AM",
    amount: -50,
    status: "Success",
    type: "debit",
    icon: "/icons/iconoir--gym.svg"
  },
  {
    id: 9,
    name: "Movie Night",
    date: "Thu 11:15 AM",
    amount: -30,
    status: "Failed",
    type: "debit",
    icon: "/icons/mingcute--movie-line.svg"
  },
  {
    id: 10,
    description: "Book Purchase - Amazon",
    date: "Tue 12:15 PM",
    amount: +40,
    status: "Success",
    type: "credit",
    icon: "/icons/lineicons--amazon.svg"
  },
];

export default function TransactionsPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return recentTransactions.filter((t) => {
      const typeOk = typeFilter === "all" || t.type === typeFilter;
      const statusOk = statusFilter === "all" || t.status === statusFilter;
      return typeOk && statusOk;
    });
  }, [typeFilter, statusFilter]);

  return (
    <Card className="w-full shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col gap-3 space-y-0 pb-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-[1.3rem] font-bold mt-1">
            Transactions
          </CardTitle>

          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v)}>
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v)}
            >
              <SelectTrigger className="w-[120px] h-8 text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {(typeFilter !== "all" || statusFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => {
                  setTypeFilter("all");
                  setStatusFilter("all");
                }}
              >
                Clear
              </Button>
            )}
          </motion.div>
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence>
          {filteredTransactions.length === 0 ? (
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No transactions match your filters.
            </motion.p>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between space-x-4 rounded-lg p-2 hover:bg-muted/40 cursor-pointer"
                >
                  {/* Left side */}
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9">
                      <img
                        src={transaction.icon}
                        alt={transaction.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                  </div>

                  {/* Right side */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          transaction.amount < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.amount < 0
                          ? `-$${Math.abs(transaction.amount)}`
                          : `+$${transaction.amount}`}
                      </p>
                      <div
                        className={`flex items-center justify-end text-xs ${
                          transaction.status === "Success"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.status === "Success" ? (
                          <Check className="mr-1 h-3 w-3" />
                        ) : (
                          <X className="mr-1 h-3 w-3" />
                        )}
                        {transaction.status}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
