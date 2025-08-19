"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react";

const recentTransactions = [
  {
    id: 1,
    name: "Mobile App Purchase",
    date: "Wed 10:29 AM",
    amount: 25.00,
    status: "Success",
    icon: "app-store"
  },
  {
    id: 2,
    name: "Software License",
    date: "Wed 10:29 AM",
    amount: 25.00,
    status: "Success",
    icon: "adobe"
  }
];

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Recent Transaction</CardTitle>
        <Button variant="ghost" size="sm">
          Filter
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8">
                  <img
                    src={`/${transaction.icon}.svg`} 
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
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">+${transaction.amount}</p>
                  <div className="flex items-center text-xs text-green-500">
                    <Check className="mr-1 h-3 w-3" />
                    {transaction.status}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}