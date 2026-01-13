"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ActivityLog } from "../types";
import { calculateStats } from "../helper";
import { Progress } from "@/components/ui/progress";
import { Award, TrendingUp } from "lucide-react";

interface TopActivitiesProps {
  activities: Activity[];
  logs: ActivityLog[];
  month: number;
  year: number;
}

export const TopActivities = React.memo(function TopActivities({ activities, logs, month, year }: TopActivitiesProps) {
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);

  const activitiesWithStats = useMemo(() => {
    return activities
      .map((activity) => ({
        ...activity,
        stats: calculateStats(activity, logs, daysInMonth),
      }))
      .sort((a, b) => b.stats.completionRate - a.stats.completionRate)
      .slice(0, 5);
  }, [activities, logs, daysInMonth]);

  return (
    <Card className="glass border-white/40 hover:shadow-2xl transition-all duration-300 h-[700px] flex flex-col">
      <CardHeader className="p-6 flex-shrink-0">
        <CardTitle className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Award className="h-5 w-5 text-warning-600" />
          Top Performing Activities
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-1 overflow-hidden">
        <div className="space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar">
          {activitiesWithStats.length === 0 ? (
            <div className="text-center py-8 glass-light rounded-xl h-full flex items-center justify-center">
              <p className="text-neutral-600">No activities yet. Track some activities to see top performers!</p>
            </div>
          ) : (
            activitiesWithStats.map((activity, index) => (
            <div key={activity.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg glass-light font-bold text-sm text-neutral-700">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: activity.color }}
                    />
                    <span className="font-semibold text-neutral-900">{activity.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success-600" />
                  <span className="font-bold text-success-700">{activity.stats.completionRate}%</span>
                </div>
              </div>
              <div className="relative">
                <Progress
                  value={activity.stats.completionRate}
                  className="h-2"
                  style={{
                    backgroundColor: `${activity.color}20`,
                  }}
                />
                <div
                  className="absolute top-0 left-0 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${activity.stats.completionRate}%`,
                    backgroundColor: activity.color,
                  }}
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-neutral-600">
                <span>{activity.stats.completedDays} days completed</span>
                <span>•</span>
                <span>{activity.stats.streak} day streak</span>
              </div>
            </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
});

