"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", budget: 4200, spent: 3800 },
  { month: "Feb", budget: 4500, spent: 4200 },
  { month: "Mar", budget: 4800, spent: 4100 },
  { month: "Apr", budget: 4500, spent: 4600 },
  { month: "May", budget: 5000, spent: 4400 },
  { month: "Jun", budget: 5200, spent: 4900 },
];

const chartConfig = {
  budget: {
    label: "Budget",
    color: "#6366F1", // budget color
  },
  spent: {
    label: "Spent",
    color: "#EF4444", // danger color
  },
};

export const BudgetOverview = React.memo(function BudgetOverview() {
  return (
    <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900">Budget Overview</CardTitle>
        <CardDescription className="text-neutral-600">
          Monthly budget vs spending comparison
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillBudget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillSpent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="month"
              stroke="#737373"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#737373"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `$${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="budget"
              stroke="#6366F1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillBudget)"
            />
            <Area
              type="monotone"
              dataKey="spent"
              stroke="#EF4444"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fillSpent)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

