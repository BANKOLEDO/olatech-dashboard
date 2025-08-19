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

  // New blue palette
  const COLORS = {
    rent: "#2563eb",       // first blue
    food: "#60a5fa",       // second blue
    misc: "#bfdbfe",       // third blue
  };

  return (
    <Card className="w-full h-[19.5rem] sm:h-[18rem] p-1">
      <CardHeader className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <CardTitle className="text-[1.3rem] font-bold mt-1">Spending Overview</CardTitle>
          <CardDescription className="text-xl mt-2 flex items-center gap-3 font-bold text-black">
            ${totalSpending.toLocaleString()}
            <span
              className={`m-2 w-16 p-1 text-sm flex items-center border rounded-sm ${
                trendDown ? "text-red-600 bg-red-300" : "text-green-600 bg-green-300"
              }`}
            >
              {trendValue}
              {trendDown ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
            </span>
          </CardDescription>
        </div>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[150px] h-[1.5rem]">
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
          {Object.keys(COLORS).map((source) => (
            <div key={source} className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: COLORS[source] }} />
              <span>{source.charAt(0).toUpperCase() + source.slice(1)}</span>
            </div>
          ))}
        </div>

        {/* Amounts */}
        <div className="flex justify-between w-full text-sm font-semibold">
          <span>${current.rent.toLocaleString()}</span>
          <span>${current.food.toLocaleString()}</span>
          <span>${current.misc.toLocaleString()}</span>
        </div>

        {/* Horizontal Spending Breakdown */}
        <div className="w-full bg-gray-200 h-12 rounded-lg overflow-hidden flex">
          {Object.keys(current).map((source) => (
            <div
              key={source}
              className="h-full"
              style={{
                width: `${(current[source] / totalSpending) * 100}%`,
                backgroundColor: COLORS[source],
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
