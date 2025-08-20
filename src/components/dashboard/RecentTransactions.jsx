"use client";

import { useMemo, useState } from "react";
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
];

export default function RecentTransactions() {
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all"); // no TS types
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return recentTransactions.filter((t) => {
      const typeOk = typeFilter === "all" || t.type === typeFilter;
      const statusOk = statusFilter === "all" || t.status === statusFilter;
      return typeOk && statusOk;
    });
  }, [typeFilter, statusFilter]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 space-y-0 pb-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowFilters((s) => !s)}>
            Filter
          </Button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v)}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
              <SelectTrigger className="w-[160px] h-8">
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
                className="h-8"
                onClick={() => {
                  setTypeFilter("all");
                  setStatusFilter("all");
                }}
              >
                Clear
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <p className="text-xs text-muted-foreground">No transactions match your filters.</p>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between space-x-4"
              >
                {/* Left side (icon + info) */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8">
                    <img
                      src={transaction.icon}
                      alt={transaction.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date}
                    </p>
                  </div>
                </div>

                {/* Right side (amount + status + arrow) */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        transaction.amount < 0 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {transaction.amount < 0
                        ? `-$${Math.abs(transaction.amount)}`
                        : `+$${transaction.amount}`}
                    </p>
                    <div
                      className={`flex items-center text-xs ${
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
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
