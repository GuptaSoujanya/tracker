"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, ActivityLog } from "../types";
import { calculateStats } from "../helper";
import { TrendingUp, Flame, Target, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivitySummaryProps {
  activities: Activity[];
  logs: ActivityLog[];
  month: number;
  year: number;
}

export function ActivitySummary({ activities, logs, month, year }: ActivitySummaryProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const currentDay = today.getDate();
  const daysPassed = Math.min(currentDay, daysInMonth);

  const totalStats = activities.reduce(
    (acc, activity) => {
      const stats = calculateStats(activity, logs, daysInMonth);
      acc.totalCompleted += stats.completedDays;
      acc.totalPossible += daysPassed;
      acc.totalStreak = Math.max(acc.totalStreak, stats.streak);
      acc.totalActivities += 1;
      return acc;
    },
    { totalCompleted: 0, totalPossible: 0, totalStreak: 0, totalActivities: 0 }
  );

  const overallCompletion = totalStats.totalPossible > 0
    ? Math.round((totalStats.totalCompleted / totalStats.totalPossible) * 100)
    : 0;

  const stats = [
    {
      label: "Overall Progress",
      value: `${overallCompletion}%`,
      icon: TrendingUp,
      color: "from-success-500 to-success-600",
      bgColor: "bg-success-100",
      textColor: "text-success-700",
    },
    {
      label: "Active Streak",
      value: `${totalStats.totalStreak} days`,
      icon: Flame,
      color: "from-warning-500 to-warning-600",
      bgColor: "bg-warning-100",
      textColor: "text-warning-700",
    },
    {
      label: "Total Activities",
      value: totalStats.totalActivities.toString(),
      icon: Target,
      color: "from-primary-500 to-primary-600",
      bgColor: "bg-primary-100",
      textColor: "text-primary-700",
    },
    {
      label: "Days Tracked",
      value: `${daysPassed}/${daysInMonth}`,
      icon: Calendar,
      color: "from-info-500 to-info-600",
      bgColor: "bg-info-100",
      textColor: "text-info-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className={cn(
              "glass border-white/40 hover:shadow-xl transition-all duration-300 hover:scale-105",
              stat.bgColor
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("p-2.5 rounded-xl glass-light", stat.bgColor)}>
                  <Icon className={cn("h-5 w-5", stat.textColor)} />
                </div>
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold shadow-md",
                  `bg-gradient-to-br ${stat.color} text-primary-500`
                )}>
                  {stat.value}
                </div>
              </div>
              <h3 className={cn("text-sm font-bold", stat.textColor)}>
                {stat.label}
              </h3>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

