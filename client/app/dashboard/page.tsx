"use client";

import React from 'react'
import { 
  StatsCard, 
  BudgetOverview, 
  RecentActivity, 
  MilestonesProgress,
  QuickActions,
  CategoryBreakdown,
  UpcomingDeadlines,
  ActivityChart,

  DateTimeWidget
} from '@/components/feature/dashboard'
import { Wallet, Activity, Target, CheckSquare, TrendingUp, DollarSign } from 'lucide-react'
import { LazyLoad } from '@/components/shared'

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-info-600 bg-clip-text mb-2">
            Dashboard Overview
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">Welcome back! Here's what's happening with your projects.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 animate-fade-in">
          <StatsCard
            title="Total Budget"
            value="$52,450"
            change="+12.5% from last month"
            changeType="positive"
            icon={Wallet}
            iconColor="text-budget-500"
          />
          <StatsCard
            title="Active Tasks"
            value="24"
            change="8 completed today"
            changeType="positive"
            icon={CheckSquare}
            iconColor="text-success-500"
          />
          <StatsCard
            title="Milestones"
            value="12/15"
            change="3 remaining"
            changeType="neutral"
            icon={Target}
            iconColor="text-target-500"
          />
          <StatsCard
            title="Monthly Spending"
            value="$4,890"
            change="-5.2% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-secondary-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Charts Row - Lazy Load */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <LazyLoad minHeight="350px">
                <BudgetOverview />
              </LazyLoad>
              <LazyLoad minHeight="350px">
                <CategoryBreakdown />
              </LazyLoad>
            </div>

            {/* Activity Chart - Lazy Load */}
            <LazyLoad minHeight="300px">
              <ActivityChart />
            </LazyLoad>

            {/* Recent Activity - Lazy Load */}
            <LazyLoad minHeight="400px">
              <RecentActivity />
            </LazyLoad>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions - Lazy Load */}
            <LazyLoad minHeight="300px">
              <QuickActions />
            </LazyLoad>

            {/* Date Time Widget - Lazy Load */}
            <LazyLoad minHeight="200px">
              <DateTimeWidget />
            </LazyLoad>

            {/* Milestones Progress - Lazy Load */}
            <LazyLoad minHeight="400px">
              <MilestonesProgress />
            </LazyLoad>

            {/* Upcoming Deadlines - Lazy Load */}
            <LazyLoad minHeight="400px">
              <UpcomingDeadlines />
            </LazyLoad>
          </div>
        </div>
      </div>
    </div>
  );
}