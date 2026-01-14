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
  isActivityCompleted?: (activityId: string, date: string) => boolean;
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

  // Get the day of week for the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  // Calculate completion for each day based on actual log data
  const dayCompletions = useMemo(() => {
    // Create a map of date -> completed activity IDs for fast lookup
    const dateToCompletedActivities = new Map<string, Set<string>>();
    
    logs.forEach(log => {
      if (log.completed) {
        if (!dateToCompletedActivities.has(log.date)) {
          dateToCompletedActivities.set(log.date, new Set());
        }
        dateToCompletedActivities.get(log.date)!.add(log.activityId);
      }
    });

    return days.map((day) => {
      const completedActivities = dateToCompletedActivities.get(day.date) || new Set();
      const completedCount = completedActivities.size;
      const totalCount = activities.length;
      const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
      
      return {
        ...day,
        completionRate,
        completedCount,
        totalCount,
      };
    });
  }, [days, activities, logs]);

  const getIntensityColor = (rate: number, completedCount: number, totalCount: number) => {
    if (totalCount === 0) return 'bg-neutral-100 border-neutral-200';
    if (completedCount === 0) return 'bg-neutral-100 border-neutral-200';
    if (rate < 25) return 'bg-success-200 border-success-300';
    if (rate < 50) return 'bg-success-400 border-success-500';
    if (rate < 75) return 'bg-success-600 border-success-700';
    return 'bg-success-700 border-success-800';
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
            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}
            
            {/* Actual days of the month */}
            {dayCompletions.map((day) => {
              const intensityColor = getIntensityColor(
                day.completionRate,
                day.completedCount,
                day.totalCount
              );
              const tooltipText = day.totalCount > 0
                ? `${day.dayName} ${day.dayNumber}: ${day.completedCount}/${day.totalCount} activities (${Math.round(day.completionRate)}%)`
                : `${day.dayName} ${day.dayNumber}: No activities`;
              
              return (
                <div
                  key={day.date}
                  className={cn(
                    "aspect-square rounded-lg border-2 transition-all duration-300 hover:scale-110 hover:shadow-md cursor-pointer",
                    intensityColor,
                    day.isToday && "ring-2 ring-primary-500 ring-offset-2",
                    day.isFuture && "opacity-50 cursor-not-allowed"
                  )}
                  title={tooltipText}
                >
                  <div className="h-full flex flex-col items-center justify-center p-1">
                    <span className="text-xs font-bold text-neutral-700">
                      {day.dayNumber}
                    </span>
                    {day.totalCount > 0 && (
                      <span className="text-[10px] text-neutral-600 mt-0.5">
                        {day.completedCount}/{day.totalCount}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
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

