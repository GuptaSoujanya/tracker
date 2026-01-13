"use client";

import React from 'react';
import { 
  ActivityGrid, 
  ActivityList, 
  StatsChart, 
  MonthSelector,
  TopActivities,
  ActivityHeatmap
} from '@/components/feature/Activty-tracker/components';
import { StatsCard } from '@/components/feature/dashboard/components/stats-card';
import { useActivityTracker } from '@/components/feature/Activty-tracker/hooks';
import { TrendingUp, Flame, Target, Calendar, RefreshCw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { calculateStats } from '@/components/feature/Activty-tracker/helper';
import { LazyLoad } from '@/components/shared';

export default function ActivityPage() {
  const {
    activities,
    logs,
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
    refreshData,
  } = useActivityTracker();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  const currentDay = today.getDate();
  const daysPassed = Math.min(currentDay, daysInMonth);

  // Calculate overall stats
  const totalStats = activities.reduce(
    (acc, activity) => {
      const stats = calculateStats(activity, logs, daysInMonth);
      acc.totalCompleted += stats.completedDays;
      acc.totalPossible += daysPassed;
      acc.totalStreak = Math.max(acc.totalStreak, stats.streak);
      return acc;
    },
    { totalCompleted: 0, totalPossible: 0, totalStreak: 0 }
  );

  const overallCompletion = totalStats.totalPossible > 0
    ? Math.round((totalStats.totalCompleted / totalStats.totalPossible) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1800px] mx-auto">
          {/* Header Skeleton */}
          <div className="mb-6 animate-fade-in-up">
            <div className="h-10 skeleton rounded-lg w-64 mb-2" />
            <div className="h-5 skeleton rounded-lg w-96" />
          </div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="glass border-white/40 p-6 rounded-xl animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-4 skeleton rounded w-24 mb-4" />
                <div className="h-8 skeleton rounded w-16 mb-2" />
                <div className="h-3 skeleton rounded w-32" />
              </div>
            ))}
          </div>
          
          {/* Month Selector Skeleton */}
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass border-white/40 p-4 rounded-xl">
              <div className="h-10 skeleton rounded w-48" />
            </div>
          </div>
          
          {/* Activity Grid Skeleton */}
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="glass border-white/40 p-6 rounded-xl">
              <div className="h-6 skeleton rounded w-48 mb-4" />
              <div className="h-64 skeleton rounded" />
            </div>
          </div>
          
          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="glass border-white/40 p-6 rounded-xl">
                <div className="h-6 skeleton rounded w-40 mb-4" />
                <div className="h-64 skeleton rounded" />
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="glass border-white/40 p-6 rounded-xl">
                <div className="h-6 skeleton rounded w-40 mb-4" />
                <div className="h-64 skeleton rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-700 mb-2">
                Activity Tracker
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base">
                Track your daily activities and build consistent habits
              </p>
            </div>
            <Button
              onClick={refreshData}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* KPI Cards - Consistent with Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 animate-fade-in">
          <StatsCard
            title="Overall Progress"
            value={`${overallCompletion}%`}
            change={`${totalStats.totalCompleted}/${totalStats.totalPossible} completed`}
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-success-500"
          />
          <StatsCard
            title="Active Streak"
            value={`${totalStats.totalStreak} days`}
            change="Longest current streak"
            changeType="positive"
            icon={Flame}
            iconColor="text-warning-500"
          />
          <StatsCard
            title="Total Activities"
            value={activities.length.toString()}
            change="Activities tracked"
            changeType="neutral"
            icon={Target}
            iconColor="text-primary-500"
          />
          <StatsCard
            title="Days Tracked"
            value={`${daysPassed}/${daysInMonth}`}
            change="This month"
            changeType="neutral"
            icon={Calendar}
            iconColor="text-info-500"
          />
        </div>

        {/* Month Selector */}
        <div className="mb-6 animate-fade-in">
          <MonthSelector
            month={currentMonth}
            year={currentYear}
            onMonthChange={setCurrentMonth}
            onYearChange={setCurrentYear}
          />
        </div>

        {/* Activity Grid - Full Width - Lazy Load */}
        <LazyLoad className="mb-6" minHeight="400px">
          <ActivityGrid
            activities={activities}
            month={currentMonth}
            year={currentYear}
            isActivityCompleted={isActivityCompleted}
            onToggle={toggleActivityLog}
          />
        </LazyLoad>

        {/* Heatmap and Charts - Side by Side - Lazy Load */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Heatmap */}
          <LazyLoad minHeight="400px">
            <ActivityHeatmap
              activities={activities}
              logs={logs}
              month={currentMonth}
              year={currentYear}
              isActivityCompleted={isActivityCompleted}
            />
          </LazyLoad>

          {/* Charts */}
          <LazyLoad minHeight="400px">
            <StatsChart
              activities={activities}
              logs={logs}
              month={currentMonth}
              year={currentYear}
            />
          </LazyLoad>
        </div>

        {/* Bottom Section - Activity List and Top Activities - Lazy Load */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Activity List - Fixed Height & Scrollable */}
          <LazyLoad minHeight="700px">
            <ActivityList
              activities={activities}
              logs={logs}
              month={currentMonth}
              year={currentYear}
              onAdd={addActivity}
              onDelete={deleteActivity}
            />
          </LazyLoad>

          {/* Top Activities */}
          <LazyLoad minHeight="700px">
            <TopActivities
              activities={activities}
              logs={logs}
              month={currentMonth}
              year={currentYear}
            />
          </LazyLoad>
        </div>
      </div>
    </div>
  );
}
