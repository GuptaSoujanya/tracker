"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  category: string;
  isOverdue: boolean;
}

const upcomingTasks: Task[] = [
  { id: "1", title: "Submit monthly report", dueDate: "Today, 5:00 PM", priority: "high", category: "Work", isOverdue: false },
  { id: "2", title: "Review budget allocations", dueDate: "Tomorrow, 2:00 PM", priority: "high", category: "Finance", isOverdue: false },
  { id: "3", title: "Team meeting preparation", dueDate: "Jan 15, 10:00 AM", priority: "medium", category: "Meeting", isOverdue: false },
  { id: "4", title: "Update project milestones", dueDate: "Jan 16, 3:00 PM", priority: "medium", category: "Project", isOverdue: false },
  { id: "5", title: "Review expense reports", dueDate: "Jan 18, 11:00 AM", priority: "low", category: "Finance", isOverdue: false },
];

export function UpcomingDeadlines() {
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-danger-500/10 text-danger-400 border-danger-500/20";
      case "medium":
        return "bg-warning-500/10 text-warning-400 border-warning-500/20";
      case "low":
        return "bg-info-500/10 text-info-400 border-info-500/20";
    }
  };

  return (
    <Card className="glass border-neutral-800/50 hover:border-warning-500/30 transition-all duration-300">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning-500" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription className="text-neutral-400 mt-1">
              Tasks and events requiring attention
            </CardDescription>
          </div>
          <Badge className="bg-warning-500/10 text-warning-400 border-warning-500/20">
            {upcomingTasks.length} pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800/50 transition-all duration-300 border border-neutral-800/50 hover:border-neutral-700/50 group cursor-pointer"
            >
              <div className={cn(
                "p-2 rounded-lg mt-0.5",
                task.isOverdue ? "bg-danger-500/10" : "bg-neutral-800/50"
              )}>
                {task.isOverdue ? (
                  <AlertCircle className="h-4 w-4 text-danger-400" />
                ) : (
                  <Calendar className="h-4 w-4 text-neutral-400 group-hover:text-neutral-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors duration-300 line-clamp-1">
                    {task.title}
                  </p>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span>{task.dueDate}</span>
                  <span>•</span>
                  <span>{task.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

