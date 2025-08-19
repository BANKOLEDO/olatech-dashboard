"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// Sample cashflow data (income and expense only; savings will be computed)
const cashflowData = {
  "2024": [
    { month: "Jan", income: 15000, expense: 7000 },
    { month: "Feb", income: 14500, expense: 7800 },
    { month: "Mar", income: 16000, expense: 6000 },
    { month: "Apr", income: 15500, expense: 8500 },
    { month: "May", income: 16200, expense: 6200 },
    { month: "Jun", income: 15800, expense: 9700 },
  ],
  "2023": [
    { month: "Jan", income: 14800, expense: 9100 },
    { month: "Feb", income: 14600, expense: 5900 },
    { month: "Mar", income: 15900, expense: 9900 },
    { month: "Apr", income: 15300, expense: 5600 },
    { month: "May", income: 16000, expense: 7100 },
    { month: "Jun", income: 15700, expense: 5800 },
  ],
};


const COLORS = {
  income: "#166534",
  savings: "#16a34a",
  expense: "#4ade80",
};

export default function CashflowBarChart() {
  const [year, setYear] = useState("2024");
  const [category, setCategory] = useState("all"); // "all", "income", "savings", "expense"

  // Compute savings automatically and filter by category
  const data = useMemo(() => {
    const yearlyData = cashflowData[year] || [];
    return yearlyData.map((item) => {
      const savings = item.income - item.expense;
      if (category === "all") return { ...item, savings };
      return { month: item.month, [category]: category === "savings" ? savings : item[category] };
    });
  }, [year, category]);

  // Compute total for footer
  const total = useMemo(() => {
    return data.reduce((acc, item) => {
      if (category === "all") return acc + item.income + item.savings - item.expense;
      return acc + item[category];
    }, 0);
  }, [data, category]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>Cashflow Overview</CardTitle>
          <CardDescription className="mt-1 font-bold text-lg">
            Total: ${total.toLocaleString()}
          </CardDescription>
        </div>

        <div className="flex gap-2">
          {/* Year selector */}
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(cashflowData).map((yr) => (
                <SelectItem key={yr} value={yr}>{yr}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category selector */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="savings">Savings</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            {(category === "all" || category === "income") && (
              <Bar dataKey="income" fill={COLORS.income} radius={4} />
            )}
            {(category === "all" || category === "savings") && (
              <Bar dataKey="savings" fill={COLORS.savings} radius={4} />
            )}
            {(category === "all" || category === "expense") && (
              <Bar dataKey="expense" fill={COLORS.expense} radius={4} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        Showing cashflow for {year}, {category === "all" ? "all categories" : category}.
      </CardFooter>
    </Card>
  );
}
