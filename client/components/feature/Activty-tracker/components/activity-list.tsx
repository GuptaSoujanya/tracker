"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, TrendingUp, Flame, Award } from "lucide-react";
import { Activity, ActivityLog } from "../types";
import { calculateStats } from "../helper";
import { Badge } from "@/components/ui/badge";
import { AddActivityModal } from "./add-activity-modal";

interface ActivityListProps {
  activities: Activity[];
  logs: ActivityLog[];
  month: number;
  year: number;
  onAdd: (name: string, description: string, color: string) => Promise<void>;
  onDelete: (activityId: string) => Promise<void>;
}

export const ActivityList = React.memo(function ActivityList({
  activities,
  logs,
  month,
  year,
  onAdd,
  onDelete,
}: ActivityListProps) {
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  
  const activitiesWithStats = useMemo(() => {
    return activities.map((activity) => ({
      activity,
      stats: calculateStats(activity, logs, daysInMonth),
    }));
  }, [activities, logs, daysInMonth]);

  return (
    <Card className="glass border-white/40 hover:shadow-2xl transition-all duration-300 h-[700px] flex flex-col">
      <CardHeader className="p-6 flex flex-row items-center justify-between flex-shrink-0">
        <CardTitle className="text-lg font-bold text-neutral-900">
          My Activities
        </CardTitle>
        <AddActivityModal
          activityCount={activities.length}
          activities={activities}
          onAdd={onAdd}
        />
      </CardHeader>
      <CardContent className="p-6 pt-0 flex-1 overflow-hidden">
        <div className="space-y-3 h-full overflow-y-auto pr-2 custom-scrollbar">
          {activities.length === 0 ? (
            <div className="text-center py-8 glass-light rounded-xl h-full flex items-center justify-center">
              <p className="text-neutral-600">No activities yet. Add your first one!</p>
            </div>
          ) : (
            activitiesWithStats.map(({ activity, stats }) => (
              <div
                key={activity.id}
                className="p-4 glass-light rounded-xl hover:shadow-md transition-all duration-300 border-l-4"
                style={{ borderLeftColor: activity.color }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: activity.color }}
                      />
                      <h3 className="font-bold text-neutral-900">{activity.name}</h3>
                    </div>
                    {activity.description && (
                      <p className="text-xs text-neutral-600 ml-5">{activity.description}</p>
                    )}
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await onDelete(activity.id);
                      } catch (error) {
                        // Error handled by hook
                      }
                    }}
                    className="p-1 hover:bg-danger-100 rounded-lg transition-colors duration-300 group"
                  >
                    <Trash2 className="h-4 w-4 text-neutral-500 group-hover:text-danger-600" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge className="bg-success-100 text-success-700 border-success-200 shadow-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stats.completionRate}% Complete
                  </Badge>
                  <Badge className="bg-warning-100 text-warning-700 border-warning-200 shadow-sm">
                    <Flame className="h-3 w-3 mr-1" />
                    {stats.streak} Day Streak
                  </Badge>
                  <Badge className="bg-info-100 text-info-700 border-info-200 shadow-sm">
                    <Award className="h-3 w-3 mr-1" />
                    Best: {stats.longestStreak} Days
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
});

