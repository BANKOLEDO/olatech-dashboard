"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const upcomingBills = [
  {
    id: 1,
    name: "Netflix Subscription",
    date: "June 28, 2025",
    amount: 15.99,
    icon: "netflix",
    status: "Scheduled"
  },
  {
    id: 2,
    name: "Spotify Premium",
    date: "June 30, 2025", 
    amount: 9.99,
    icon: "spotify",
    status: "Scheduled"
  },
  {
    id: 3,
    name: "Adobe Creative Cloud",
    date: "July 4, 2025",
    amount: 52.99,
    icon: "adobe",
    status: "Scheduled"
  }
];

export default function UpcomingBills() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Upcoming Bill & Payment
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          +
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingBills.map(bill => (
            <div
              key={bill.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8">
                  <img 
                    src={`/${bill.icon}.svg`}
                    alt={bill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">{bill.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">${bill.amount}</p>
                  <p className="text-xs text-muted-foreground">{bill.status}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full">View All</Button>
        </div>
      </CardContent>
    </Card>
  );
}