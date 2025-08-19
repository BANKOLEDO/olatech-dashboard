"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function EarningChart() {
  const [timeframe, setTimeframe] = useState("month");
  const [trendDown, setTrendDown] = useState(false);
  const [trendValue, setTrendValue] = useState("0%");

  // Earnings data per timeframe
  const earningsData = {
    month: { Salary: 4000, Freelance: 1500, Investments: 1000 },
    lastMonth: { Salary: 3800, Freelance: 1200, Investments: 900 },
    last6Months: { Salary: 24000, Freelance: 9000, Investments: 6000 },
    lastYear: { Salary: 48000, Freelance: 18000, Investments: 12000 },
  };

  const current = earningsData[timeframe];
  const totalEarnings = current.Salary + current.Freelance + current.Investments;

  // Update trend when timeframe changes
  useEffect(() => {
    let previous;
    switch (timeframe) {
      case "month":
        previous = earningsData.lastMonth;
        break;
      case "lastMonth":
        previous = earningsData.last6Months;
        break;
      case "last6Months":
        previous = earningsData.lastYear;
        break;
      default:
        previous = earningsData.last6Months;
    }
    const previousTotal =
      previous.Salary + previous.Freelance + previous.Investments;
    const diff = totalEarnings - previousTotal;
    setTrendDown(diff < 0);
    setTrendValue(`${Math.abs(((diff / previousTotal) * 100).toFixed(1))}%`);
  }, [timeframe, totalEarnings]);

  const COLORS = { Salary: "#f97316", Freelance: "#fdba74", Investments: "#ffedd5" };

  return (
    <Card className="w-full h-[19.5rem] sm:h-[18rem] p-1">
      <CardHeader className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <CardTitle className="text-[1.3rem] font-bold mt-1">Earnings Overview</CardTitle>
          <CardDescription className="text-xl mt-2 flex items-center gap-3 font-bold text-black">
            ${totalEarnings.toLocaleString()}
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
              <span>{source}</span>
            </div>
          ))}
        </div>

        {/* Amounts */}
        <div className="flex justify-between w-full text-sm font-semibold">
          <span>${current.Salary.toLocaleString()}</span>
          <span>${current.Freelance.toLocaleString()}</span>
          <span>${current.Investments.toLocaleString()}</span>
        </div>

        {/* Horizontal Earnings Breakdown */}
        <div className="w-full bg-gray-200 h-12 rounded-lg overflow-hidden flex">
          {Object.keys(current).map((source) => (
            <div
              key={source}
              className="h-full"
              style={{
                width: `${(current[source] / totalEarnings) * 100}%`,
                backgroundColor: COLORS[source],
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
