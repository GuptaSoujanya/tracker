"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { SpendingTrend } from "../types";
import { formatCurrency } from "../helper";

interface SpendingTrendsProps {
  trends: SpendingTrend[];
  dateRange: { start: Date; end: Date };
}

export function SpendingTrends({ trends, dateRange }: SpendingTrendsProps) {
  const chartData = trends.map(trend => ({
    date: new Date(trend.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      ...(trends.length > 31 && { month: 'short', year: '2-digit' })
    }),
    spent: trend.spent,
    budget: trend.budget || 0,
  }));

  const chartConfig = {
    spent: {
      label: "Spent",
      color: "#EF4444",
    },
    budget: {
      label: "Budget",
      color: "#6366F1",
    },
  };

  if (trends.length === 0) {
    return (
      <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-budget-500" />
            Spending Trends
          </CardTitle>
          <CardDescription className="text-neutral-600">
            Track your spending over time
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex items-center justify-center h-[300px] text-neutral-500">
            <p className="text-sm">No spending data available for the selected period</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-budget-500" />
          Spending Trends
        </CardTitle>
        <CardDescription className="text-neutral-600">
          Track your spending over time
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillSpent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="date"
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
            <ChartTooltip 
              content={<ChartTooltipContent />}
              formatter={(value: number | undefined) => formatCurrency(value ?? 0)}
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
}

