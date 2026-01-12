"use client";

import React from 'react';

export default function NutritionPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-success-600 via-warning-600 to-target-600 bg-clip-text mb-2">
            Nutrition Calculator
          </h1>
          <p className="text-neutral-600 text-sm sm:text-base">
            Track your calories, protein, and nutritional goals
          </p>
        </div>

        {/* Content will be added here */}
        <div className="glass border-white/40 rounded-2xl p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-2xl glass-light">
              <svg
                className="w-16 h-16 text-success-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Coming Soon</h2>
            <p className="text-neutral-600 max-w-md">
              Calculate your daily calories, protein intake, and manage your nutritional goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

