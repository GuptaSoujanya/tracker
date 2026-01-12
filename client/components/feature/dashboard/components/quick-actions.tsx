"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, FileText, Target, DollarSign, Users } from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
}

const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "Add Expense",
    description: "Record new expense",
    icon: DollarSign,
    color: "from-danger-600 to-danger-500",
    href: "/buget",
  },
  {
    id: "2",
    title: "New Task",
    description: "Create todo item",
    icon: FileText,
    color: "from-success-600 to-success-500",
    href: "/Todo",
  },
  {
    id: "3",
    title: "Set Milestone",
    description: "Add new goal",
    icon: Target,
    color: "from-target-600 to-target-500",
    href: "/Milestones",
  },
  {
    id: "4",
    title: "Schedule Event",
    description: "Plan activity",
    icon: Calendar,
    color: "from-info-600 to-info-500",
    href: "/activity",
  },
];

export function QuickActions() {
  return (
    <Card className="glass border-neutral-800/50 hover:border-primary-500/30 transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary-500" />
          Quick Actions
        </CardTitle>
        <CardDescription className="text-neutral-400">
          Frequently used actions
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => window.location.href = action.href}
                className="relative group p-4 rounded-xl bg-neutral-900/50 hover:bg-neutral-800/50 border border-neutral-800/50 hover:border-neutral-700/50 transition-all duration-300 text-left overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-r ${action.color} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{action.title}</p>
                    <p className="text-xs text-neutral-500">{action.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

