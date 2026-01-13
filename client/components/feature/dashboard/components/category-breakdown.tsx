"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";

const chartData = [
  { category: "Food", amount: 850, budget: 1000 },
  { category: "Transport", amount: 420, budget: 500 },
  { category: "Entertainment", amount: 320, budget: 400 },
  { category: "Shopping", amount: 680, budget: 600 },
  { category: "Bills", amount: 1200, budget: 1200 },
  { category: "Others", amount: 180, budget: 300 },
];

const chartConfig = {
  amount: {
    label: "Spent",
    color: "#EF4444", // danger color
  },
  budget: {
    label: "Budget",
    color: "#6366F1", // budget color
  },
};

export const CategoryBreakdown = React.memo(function CategoryBreakdown() {
  return (
    <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-budget-500" />
          Category Breakdown
        </CardTitle>
        <CardDescription className="text-neutral-600">
          Spending by category this month
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="category"
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
            <Bar dataKey="budget" fill="#6366F1" radius={[4, 4, 0, 0]} opacity={0.5} />
            <Bar dataKey="amount" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

