"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateDaysArray } from "../helper";
import { DayStatus } from "../types";

interface ActivityGridProps {
  activities: Array<{ id: string; name: string; color: string }>;
  month: number;
  year: number;
  isActivityCompleted: (activityId: string, date: string) => boolean;
  onToggle: (activityId: string, date: string) => Promise<void>;
}

export const ActivityGrid = React.memo(function ActivityGrid({
  activities,
  month,
  year,
  isActivityCompleted,
  onToggle,
}: ActivityGridProps) {
  const days = useMemo(() => generateDaysArray(year, month), [year, month]);
  const monthName = useMemo(() => new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), [year, month]);

  return (
    <Card className="glass border-white/40 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900">
          {monthName} - Activity Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="grid gap-2 mb-2" style={{ gridTemplateColumns: `200px repeat(${days.length}, minmax(36px, 1fr))` }}>
            <div className="font-bold text-sm text-neutral-700 p-2 glass-light rounded-lg">
              Activity
            </div>
            {days.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "text-center p-2 rounded-lg text-xs font-semibold transition-all duration-300",
                  day.isToday
                    ? "glass bg-primary-100 border border-primary-300 text-primary-900"
                    : "glass-light text-neutral-700"
                )}
              >
                <div>{day.dayName}</div>
                <div className="text-xs">{day.dayNumber}</div>
              </div>
            ))}
          </div>

          {/* Activity Rows */}
          {activities.length === 0 ? (
            <div className="text-center py-12 glass-light rounded-xl">
              <p className="text-neutral-600">No activities yet. Add your first activity!</p>
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="grid gap-2 mb-2"
                style={{ gridTemplateColumns: `200px repeat(${days.length}, minmax(36px, 1fr))` }}
              >
                <div
                  className="p-3 rounded-lg glass-light font-semibold text-sm text-neutral-900 flex items-center gap-2 hover:shadow-md transition-all duration-300"
                  style={{ borderLeft: `4px solid ${activity.color}` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                  <span className="truncate">{activity.name}</span>
                </div>
                {days.map((day) => {
                  const completed = isActivityCompleted(activity.id, day.date);
                  return (
                    <button
                      key={day.date}
                      onClick={async () => {
                        try {
                          await onToggle(activity.id, day.date);
                        } catch (error) {
                          // Error handled by hook
                        }
                      }}
                      disabled={day.isFuture}
                      className={cn(
                        "h-10 rounded-lg border-2 transition-all duration-300 flex items-center justify-center hover:scale-110",
                        completed
                          ? "border-success-500 shadow-md hover:shadow-lg"
                          : day.isFuture
                          ? "bg-neutral-100 border-neutral-200 cursor-not-allowed opacity-50"
                          : "bg-white/80 border-neutral-300 hover:border-primary-400 hover:shadow-md cursor-pointer"
                      )}
                      style={{
                        backgroundColor: completed ? activity.color : undefined,
                      }}
                    >
                      {completed && <Check className="h-4 w-4 text-primary-500" />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
});

