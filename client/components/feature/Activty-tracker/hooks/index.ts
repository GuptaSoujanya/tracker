"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Activity, ActivityLog } from '../types';
import { activityAPI, Activity as APIActivity, ActivityLog as APIActivityLog } from '../service';

const mapAPIActivityToClient = (api: APIActivity): Activity => ({
  id: api.id,
  name: api.name,
  description: api.description,
  color: api.color,
  icon: api.icon,
  createdAt: new Date(api.created_at),
});

const mapAPILogToClient = (api: APIActivityLog): ActivityLog => ({
  id: api.id,
  activityId: api.activity_id,
  date: api.date,
  completed: api.completed,
  notes: api.notes,
});

export const useActivityTracker = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [activitiesData, logsData] = await Promise.all([
        activityAPI.getActivities(),
        activityAPI.getActivityLogs({
          month: currentMonth,
          year: currentYear,
        }),
      ]);

      setActivities(activitiesData.map(mapAPIActivityToClient));
      setLogs(logsData.map(mapAPILogToClient));
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [currentMonth, currentYear]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Memoize month logs calculation
  const monthLogs = useMemo(() => {
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);
    
    return logs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
  }, [logs, currentMonth, currentYear]);

  // Memoize activity completion map for O(1) lookups
  const activityCompletionMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    monthLogs.forEach(log => {
      if (log.completed) {
        if (!map.has(log.activityId)) {
          map.set(log.activityId, new Set());
        }
        map.get(log.activityId)!.add(log.date);
      }
    });
    return map;
  }, [monthLogs]);

  const addActivity = useCallback(async (name: string, description: string, color: string) => {
    try {
      setError(null);
      const newActivity = await activityAPI.createActivity({
        name,
        description,
        color,
      });
      setActivities(prev => [...prev, mapAPIActivityToClient(newActivity)]);
    } catch (err: any) {
      setError(err.message || 'Failed to create activity');
      throw err;
    }
  }, []);

  const deleteActivity = useCallback(async (activityId: string) => {
    try {
      setError(null);
      await activityAPI.deleteActivity(activityId);
      setActivities(prev => prev.filter(a => a.id !== activityId));
      setLogs(prev => prev.filter(l => l.activityId !== activityId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete activity');
      throw err;
    }
  }, []);

  const toggleActivityLog = useCallback(async (activityId: string, date: string) => {
    try {
      setError(null);
      const updatedLog = await activityAPI.toggleActivityLog(activityId, date);
      setLogs(prev => {
        const existingIndex = prev.findIndex(
          l => l.activityId === activityId && l.date === date
        );

        if (existingIndex >= 0) {
          return prev.map((l, idx) =>
            idx === existingIndex ? mapAPILogToClient(updatedLog) : l
          );
        } else {
          return [...prev, mapAPILogToClient(updatedLog)];
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update activity log');
      throw err;
    }
  }, []);

  const isActivityCompleted = useCallback((activityId: string, date: string): boolean => {
    return activityCompletionMap.get(activityId)?.has(date) || false;
  }, [activityCompletionMap]);

  return {
    activities,
    logs: monthLogs,
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
    addActivity,
    deleteActivity,
    toggleActivityLog,
    isActivityCompleted,
    isLoading,
    error,
    refreshData: fetchData,
  };
};

