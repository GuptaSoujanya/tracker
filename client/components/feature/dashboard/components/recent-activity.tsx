"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  time: string;
  category: string;
}

const activities: Activity[] = [
  { id: "1", title: "Review Q1 Financial Report", status: "completed", time: "2 hours ago", category: "Budget" },
  { id: "2", title: "Update Project Milestone", status: "in-progress", time: "30 minutes ago", category: "Milestones" },
  { id: "3", title: "Complete Todo Items", status: "in-progress", time: "1 hour ago", category: "Todo" },
  { id: "4", title: "Plan Monthly Budget", status: "pending", time: "5 hours ago", category: "Budget" },
  { id: "5", title: "Team Meeting Notes", status: "completed", time: "Yesterday", category: "Activity" },
];

export const RecentActivity = React.memo(function RecentActivity() {
  const getStatusIcon = (status: Activity["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-success-400" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-warning-400" />;
      case "pending":
        return <Circle className="h-4 w-4 text-neutral-600" />;
    }
  };

  const getStatusBadge = (status: Activity["status"]) => {
    const variants = {
      completed: "bg-success-500/10 text-success-400 border-success-500/20",
      "in-progress": "bg-warning-500/10 text-warning-400 border-warning-500/20",
      pending: "bg-neutral-500/10 text-neutral-600 border-neutral-500/20",
    };

    return (
      <Badge className={variants[status]}>
        {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <Card className="glass border-white/40 hover:border-info-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900">Recent Activity</CardTitle>
        <CardDescription className="text-neutral-600">
          Your latest activities and tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-xl glass-light shadow-sm hover:glass-light transition-all duration-300 border border-neutral-200 hover:border-neutral-300"
            >
              <div className="mt-1">{getStatusIcon(activity.status)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-neutral-900">{activity.title}</p>
                  {getStatusBadge(activity.status)}
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <span>{activity.category}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

