"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ActivityLog } from "../types";
import { generateDaysArray } from "../helper";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  activities: Activity[];
  logs: ActivityLog[];
  month: number;
  year: number;
  isActivityCompleted: (activityId: string, date: string) => boolean;
}

export const ActivityHeatmap = React.memo(function ActivityHeatmap({
  activities,
  logs,
  month,
  year,
  isActivityCompleted,
}: ActivityHeatmapProps) {
  const days = useMemo(() => generateDaysArray(year, month), [year, month]);
  const todayStr = useMemo(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  // Calculate completion for each day
  const dayCompletions = useMemo(() => {
    return days.map((day) => {
      const completedCount = activities.filter((activity) =>
        isActivityCompleted(activity.id, day.date)
      ).length;
      const totalCount = activities.length;
      return {
        ...day,
        completionRate: totalCount > 0 ? (completedCount / totalCount) * 100 : 0,
      };
    });
  }, [days, activities, isActivityCompleted]);

  const getIntensityColor = (rate: number) => {
    if (rate === 0) return 'bg-neutral-100';
    if (rate < 25) return 'bg-success-200';
    if (rate < 50) return 'bg-success-400';
    if (rate < 75) return 'bg-success-600';
    return 'bg-success-700';
  };

  return (
    <Card className="glass border-white/40 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-bold text-neutral-900">
          Activity Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded bg-neutral-100" />
              <div className="w-3 h-3 rounded bg-success-200" />
              <div className="w-3 h-3 rounded bg-success-400" />
              <div className="w-3 h-3 rounded bg-success-600" />
              <div className="w-3 h-3 rounded bg-success-700" />
            </div>
            <span>More</span>
          </div>

          {/* Heatmap Grid */}
          <div className="grid grid-cols-7 gap-2">
            {dayCompletions.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "aspect-square rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer",
                  getIntensityColor(day.completionRate),
                  day.isToday && "ring-2 ring-primary-500 ring-offset-2"
                )}
                title={`${day.dayName} ${day.dayNumber}: ${Math.round(day.completionRate)}% complete`}
              >
                <div className="h-full flex items-center justify-center">
                  <span className="text-xs font-bold text-neutral-700">
                    {day.dayNumber}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Week Labels */}
          <div className="grid grid-cols-7 gap-2 text-xs text-neutral-600 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="font-semibold">
                {day}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

