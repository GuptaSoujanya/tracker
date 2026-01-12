"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";

interface Milestone {
  id: string;
  name: string;
  progress: number;
  target: string;
  status: "on-track" | "at-risk" | "completed";
}

const milestones: Milestone[] = [
  { id: "1", name: "Q1 Revenue Target", progress: 85, target: "$50,000", status: "on-track" },
  { id: "2", name: "Product Launch", progress: 60, target: "March 31", status: "at-risk" },
  { id: "3", name: "Team Expansion", progress: 100, target: "5 members", status: "completed" },
  { id: "4", name: "Cost Reduction", progress: 45, target: "20%", status: "on-track" },
];

export function MilestonesProgress() {
  const getStatusColor = (status: Milestone["status"]) => {
    switch (status) {
      case "on-track":
        return "bg-success-500/10 text-success-400 border-success-500/20";
      case "at-risk":
        return "bg-warning-500/10 text-warning-400 border-warning-500/20";
      case "completed":
        return "bg-info-500/10 text-info-400 border-info-500/20";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return "bg-success-500";
    if (progress >= 70) return "bg-info-500";
    if (progress >= 40) return "bg-warning-500";
    return "bg-danger-500";
  };

  return (
    <Card className="glass border-white/40 hover:border-target-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-neutral-50 flex items-center gap-2">
              <Target className="h-5 w-5 text-target-500" />
              Milestones Progress
            </CardTitle>
            <CardDescription className="text-neutral-600 mt-1">
              Track your goals and targets
            </CardDescription>
          </div>
          <Badge className="bg-target-500/10 text-target-400 border-target-500/20">
            {milestones.filter(m => m.status === "completed").length}/{milestones.length} Complete
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-neutral-50">{milestone.name}</p>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status === "on-track" ? "On Track" : 
                       milestone.status === "at-risk" ? "At Risk" : "Completed"}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-600">Target: {milestone.target}</p>
                </div>
                <span className="text-sm font-bold text-neutral-50 ml-4">{milestone.progress}%</span>
              </div>
              <div className="relative h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${getProgressColor(milestone.progress)}`}
                  style={{ width: `${milestone.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

