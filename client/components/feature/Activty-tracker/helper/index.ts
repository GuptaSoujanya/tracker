import { Activity, ActivityLog, MonthlyStats, DayStatus } from '../types';

export const generateDaysArray = (year: number, month: number): DayStatus[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const dateStr = date.toISOString().split('T')[0];
    
    return {
      date: dateStr,
      dayNumber: i + 1,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: dateStr === todayStr,
      isPast: date < today,
      isFuture: date > today,
    };
  });
};

export const calculateStats = (
  activity: Activity,
  logs: ActivityLog[],
  daysInMonth: number
): MonthlyStats => {
  const activityLogs = logs.filter(log => log.activityId === activity.id);
  const completedDays = activityLogs.filter(log => log.completed).length;
  const completionRate = (completedDays / daysInMonth) * 100;
  
  // Calculate current streak
  let streak = 0;
  const sortedLogs = [...activityLogs]
    .filter(log => log.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (sortedLogs.length > 0) {
    const today = new Date();
    let currentDate = new Date(sortedLogs[0].date);
    
    for (const log of sortedLogs) {
      const logDate = new Date(log.date);
      if (Math.abs(currentDate.getTime() - logDate.getTime()) <= 86400000) {
        streak++;
        currentDate = logDate;
      } else {
        break;
      }
    }
  }
  
  // Calculate longest streak
  let longestStreak = 0;
  let currentStreak = 0;
  const allSortedLogs = [...activityLogs]
    .filter(log => log.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  for (let i = 0; i < allSortedLogs.length; i++) {
    if (i === 0) {
      currentStreak = 1;
    } else {
      const prevDate = new Date(allSortedLogs[i - 1].date);
      const currDate = new Date(allSortedLogs[i].date);
      const daysDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / 86400000);
      
      if (daysDiff === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);
  
  return {
    activityId: activity.id,
    activityName: activity.name,
    totalDays: daysInMonth,
    completedDays,
    completionRate: Math.round(completionRate),
    streak,
    longestStreak,
  };
};

export const getActivityColor = (index: number): string => {
  const colors = [
    '#4F7CFF', // primary
    '#06B6D4', // secondary
    '#10B981', // success
    '#F59E0B', // warning
    '#F87171', // danger
    '#A78BFA', // info
    '#FB923C', // target
    '#EC4899', // pink
  ];
  return colors[index % colors.length];
};

