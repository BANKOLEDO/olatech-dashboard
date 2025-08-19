"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const earnings = [
  { source: "Salary", amount: 4000 },
  { source: "Freelance", amount: 1500 },
  { source: "Investments", amount: 1000 },
];

const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

export default function EarningCharts() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Earning Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={earnings}
                dataKey="amount"
                nameKey="source"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {earnings.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
