"use client";

import React, { useMemo } from "react";
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

export const StatsCard = React.memo(function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-primary-500",
  description,
  className,
}: StatsCardProps) {
  const changeColors = useMemo(() => ({
    positive: "text-success-400 bg-success-500/10",
    negative: "text-danger-400 bg-danger-500/10",
    neutral: "text-info-400 bg-info-500/10",
  }), []);

  return (
    <Card
      className={cn(
        "glass border-white/40 hover:border-primary-400 hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl group",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
        <CardTitle className="text-sm font-semibold text-neutral-700">
          {title}
        </CardTitle>
        <div className={cn("p-2.5 rounded-xl glass-light group-hover:scale-110 transition-all duration-300 shadow-sm", iconColor)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="text-3xl font-bold text-neutral-900 mb-2">{value}</div>
        {change && (
          <Badge
            className={cn(
              "text-xs font-semibold border shadow-sm",
              changeColors[changeType]
            )}
          >
            {change}
          </Badge>
        )}
        {description && (
          <p className="text-xs text-neutral-600 mt-2">{description}</p>
        )}
      </CardContent>
    </Card>
  );
});

