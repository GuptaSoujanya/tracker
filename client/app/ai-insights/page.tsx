"use client";

import React from 'react';

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 via-info-600 to-secondary-600 mb-2">
            AI Insights & Forecasts
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            Smart predictions and insights powered by AI
          </p>
        </div>

        {/* Content will be added here */}
        <div className="glass border-white/40 rounded-2xl p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-2xl glass-light">
              <svg
                className="w-16 h-16 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Coming Soon</h2>
            <p className="text-neutral-600 max-w-md">
              AI-powered insights, budget forecasts, and smart recommendations will be available here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

