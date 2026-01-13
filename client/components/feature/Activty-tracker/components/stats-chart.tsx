"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import { Activity, ActivityLog } from "../types";
import { calculateStats } from "../helper";

interface StatsChartProps {
  activities: Activity[];
  logs: ActivityLog[];
  month: number;
  year: number;
}

export const StatsChart = React.memo(function StatsChart({ activities, logs, month, year }: StatsChartProps) {
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  
  const chartData = useMemo(() => {
    return activities.map((activity) => {
      const stats = calculateStats(activity, logs, daysInMonth);
      return {
        name: activity.name.substring(0, 10),
        completed: stats.completedDays,
        total: stats.totalDays,
        rate: stats.completionRate,
        color: activity.color,
      };
    });
  }, [activities, logs, daysInMonth]);

  const chartConfig = useMemo(() => {
    return activities.reduce((acc, activity, index) => {
      acc[`activity${index}`] = {
        label: activity.name,
        color: activity.color,
      };
      return acc;
    }, {} as any);
  }, [activities]);

  return (
    <Card className="glass border-white/40 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-bold text-neutral-900">
          Activity Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          {/* Upper Half - Completion Overview */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Completion Overview</h3>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"  
                    stroke="#737373"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#737373"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="completed"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[150px] flex items-center justify-center glass-light rounded-xl">
                <p className="text-neutral-600 text-sm">No data to display</p>
              </div>
            )}
          </div>

          {/* Bottom Half - Completion Rate %} */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-700 mb-3">Completion Rate %</h3>
            {chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[240px] w-full">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    stroke="#737373"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#737373"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#4F7CFF"
                    strokeWidth={2}
                    dot={{ fill: "#4F7CFF", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ChartContainer>
            ) : (
              <div className="h-[150px] flex items-center justify-center glass-light rounded-xl">
                <p className="text-neutral-600 text-sm">No data to display</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

