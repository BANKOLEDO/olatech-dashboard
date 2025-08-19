"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function SpendingChart() {
  const [timeframe, setTimeframe] = useState("month");
  const [trendDown, setTrendDown] = useState(false);
  const [trendValue, setTrendValue] = useState("0%");

  // Spending data per timeframe
  const spendingData = {
    month: { rent: 2000, food: 1500, misc: 800 },
    lastMonth: { rent: 1900, food: 1300, misc: 700 },
    last6Months: { rent: 12000, food: 9000, misc: 4000 },
    lastYear: { rent: 24000, food: 18000, misc: 8000 },
  };

  const current = spendingData[timeframe];
  const totalSpending = current.rent + current.food + current.misc;

  // Update trend when timeframe changes
  useEffect(() => {
    // For demo purposes, trend = difference from previous period
    let previous;
    switch (timeframe) {
      case "month":
        previous = spendingData.lastMonth;
        break;
      case "lastMonth":
        previous = spendingData.last6Months;
        break;
      case "last6Months":
        previous = spendingData.lastYear;
        break;
      default:
        previous = spendingData.last6Months;
    }
    const previousTotal = previous.rent + previous.food + previous.misc;
    const diff = totalSpending - previousTotal;
    setTrendDown(diff < 0);
    setTrendValue(`${Math.abs(((diff / previousTotal) * 100).toFixed(1))}%`);
  }, [timeframe, totalSpending]);

  return (
    <Card className="w-full p-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold">Spending Overview</CardTitle>
          <CardDescription className="text-2xl font-semibold">
            ${totalSpending.toLocaleString()}
            <span
              className={`ml-2 w-10 text-sm flex items-center ${
                trendDown ? "text-red-500" : "text-green-500"
              }`}
            >
              {trendDown ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
              {trendValue}
            </span>
          </CardDescription>
        </div>

        <Select value={timeframe} onValueChange={(value) => setTimeframe(value)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="lastMonth">Last Month</SelectItem>
            <SelectItem value="last6Months">Last 6 Months</SelectItem>
            <SelectItem value="lastYear">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4">
        {/* Labels with colored boxes */}
        <div className="flex justify-between w-full text-sm font-medium">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#f97316] rounded-sm"></div>
            <span>Rent</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#22c55e] rounded-sm"></div>
            <span>Food</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#6366f1] rounded-sm"></div>
            <span>Misc</span>
          </div>
        </div>

        {/* Amounts */}
        <div className="flex justify-between w-full text-sm font-semibold">
          <span>${current.rent.toLocaleString()}</span>
          <span>${current.food.toLocaleString()}</span>
          <span>${current.misc.toLocaleString()}</span>
        </div>

        {/* Horizontal Spending Breakdown */}
        <div className="w-full bg-gray-200 h-12 rounded-lg overflow-hidden flex">
          {/* Rent */}
          <div
            className="h-full"
            style={{
              width: `${(current.rent / totalSpending) * 100}%`,
              backgroundColor: "#f97316",
            }}
          />
          {/* Food */}
          <div
            className="h-full"
            style={{
              width: `${(current.food / totalSpending) * 100}%`,
              backgroundColor: "#22c55e",
            }}
          />
          {/* Misc */}
          <div
            className="h-full"
            style={{
              width: `${(current.misc / totalSpending) * 100}%`,
              backgroundColor: "#6366f1",
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
