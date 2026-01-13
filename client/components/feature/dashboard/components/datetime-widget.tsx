"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

export const DateTimeWidget = React.memo(function DateTimeWidget() {
  const { dayName, date, initialTime } = useMemo(() => {
    const today = new Date();
    return {
      dayName: today.toLocaleDateString('en-US', { weekday: 'long' }),
      date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      initialTime: today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  }, []);

  const [currentTime, setCurrentTime] = React.useState(initialTime);

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="glass border-white/40 hover:border-primary-400 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-xl glass-light">
            <div className="p-2 rounded-lg bg-primary-100">
              <Calendar className="h-4 w-4 text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-neutral-600">Today</p>
              <p className="text-sm font-bold text-neutral-900">{dayName}</p>
              <p className="text-xs text-neutral-600">{date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-xl glass-light">
            <div className="p-2 rounded-lg bg-secondary-100">
              <Clock className="h-4 w-4 text-secondary-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-neutral-600">Time</p>
              <p className="text-2xl font-bold text-neutral-900 tabular-nums">{currentTime}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

