"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const cashflow = [
  { month: "Jan", inflow: 5000, outflow: 3000 },
  { month: "Feb", inflow: 4500, outflow: 2800 },
  { month: "Mar", inflow: 6000, outflow: 4000 },
  { month: "Apr", inflow: 5500, outflow: 3500 },
];

export default function CashflowChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashflow}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
