"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary-500",
  description,
  className,
}: StatsCardProps) {
  const changeColors = {
    positive: "text-success-400 bg-success-500/10",
    negative: "text-danger-400 bg-danger-500/10",
    neutral: "text-info-400 bg-info-500/10",
  };

  return (
    <Card
      className={cn(
        "glass border-neutral-800/50 hover:border-primary-500/30 transition-all duration-300 hover:scale-105 group",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
        <CardTitle className="text-sm font-medium text-neutral-400">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg bg-neutral-800/50 group-hover:scale-110 transition-transform duration-300", iconColor)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        {change && (
          <Badge
            className={cn(
              "text-xs font-medium border-0",
              changeColors[changeType]
            )}
          >
            {change}
          </Badge>
        )}
        {description && (
          <p className="text-xs text-neutral-500 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

