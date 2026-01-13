export interface Activity {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  activityId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  notes?: string;
}

export interface MonthlyStats {
  activityId: string;
  activityName: string;
  totalDays: number;
  completedDays: number;
  completionRate: number;
  streak: number;
  longestStreak: number;
}

export interface DayStatus {
  date: string;
  dayNumber: number;
  dayName: string;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

