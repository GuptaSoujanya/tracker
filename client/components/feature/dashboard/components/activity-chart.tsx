"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Activity } from "lucide-react";

const chartData = [
  { day: "Mon", tasks: 12, hours: 6.5 },
  { day: "Tue", tasks: 15, hours: 7.2 },
  { day: "Wed", tasks: 10, hours: 5.8 },
  { day: "Thu", tasks: 18, hours: 8.1 },
  { day: "Fri", tasks: 14, hours: 6.9 },
  { day: "Sat", tasks: 8, hours: 4.2 },
  { day: "Sun", tasks: 6, hours: 3.5 },
];

const chartConfig = {
  tasks: {
    label: "Tasks Completed",
    color: "#10B981", // success color
  },
  hours: {
    label: "Hours Worked",
    color: "#8B5CF6", // info color
  },
};

export const ActivityChart = React.memo(function ActivityChart() {
  return (
    <Card className="glass border-white/40 hover:border-success-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <Activity className="h-5 w-5 text-success-500" />
          Weekly Activity
        </CardTitle>
        <CardDescription className="text-neutral-600">
          Your productivity this week
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={chartData}>
            <defs>
              <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis
              dataKey="day"
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
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", r: 4 }}
              activeDot={{ r: 6 }}
              fill="url(#colorTasks)"
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={{ fill: "#8B5CF6", r: 4 }}
              activeDot={{ r: 6 }}
              fill="url(#colorHours)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
});

