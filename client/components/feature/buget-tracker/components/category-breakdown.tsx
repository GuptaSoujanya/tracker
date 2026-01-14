"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { CategorySpending } from "../types";
import { formatCurrency } from "../helper";

interface CategoryBreakdownProps {
  categorySpending: CategorySpending[];
}

export function CategoryBreakdown({ categorySpending }: CategoryBreakdownProps) {
  const chartData = categorySpending.map(cat => ({
    category: cat.categoryName,
    spent: cat.spent,
    budget: cat.budget,
    remaining: cat.remaining,
  }));

  const pieData = categorySpending.map(cat => ({
    name: cat.categoryName,
    value: cat.spent,
    color: cat.categoryColor,
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

  if (categorySpending.length === 0) {
    return (
      <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-budget-500" />
            Category Breakdown
          </CardTitle>
          <CardDescription className="text-neutral-600">
            Spending by category
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex items-center justify-center h-[300px] text-neutral-500">
            <p className="text-sm">No category data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-budget-500" />
            Category Breakdown
          </CardTitle>
          <CardDescription className="text-neutral-600">
            Spending vs Budget by category
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
                angle={-45}
                textAnchor="end"
                height={80}
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
              <Bar dataKey="budget" fill="#6366F1" radius={[4, 4, 0, 0]} opacity={0.5} />
              <Bar dataKey="spent" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-budget-500" />
            Spending Distribution
          </CardTitle>
          <CardDescription className="text-neutral-600">
            Percentage of total spending by category
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip 
                formatter={(value: number | undefined) => formatCurrency(value ?? 0)}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

