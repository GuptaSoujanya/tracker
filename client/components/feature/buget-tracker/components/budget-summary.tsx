"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet, TrendingDown, TrendingUp, AlertCircle } from "lucide-react";
import { BudgetSummary as BudgetSummaryType } from "../types";
import { formatCurrency } from "../helper";

interface BudgetSummaryProps {
  summary: BudgetSummaryType;
}

export function BudgetSummary({ summary }: BudgetSummaryProps) {
  const isOverBudget = summary.remaining < 0;
  const isNearBudget = summary.percentageUsed >= 80 && summary.percentageUsed < 100;

  return (
    <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <Wallet className="h-5 w-5 text-budget-500" />
          Budget Summary
        </CardTitle>
        <CardDescription className="text-neutral-600">
          Overview of your financial status
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-neutral-700">Budget Usage</span>
            <span className={`text-sm font-bold ${
              isOverBudget ? 'text-red-600' : isNearBudget ? 'text-yellow-600' : 'text-green-600'
            }`}>
              {summary.percentageUsed.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={summary.percentageUsed} 
            className={`h-3 ${
              isOverBudget ? 'bg-red-100' : isNearBudget ? 'bg-yellow-100' : 'bg-green-100'
            }`}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Budget */}
          <div className="glass-light p-4 rounded-xl border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-semibold text-neutral-600 uppercase">Total Budget</span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{formatCurrency(summary.totalBudget)}</p>
          </div>

          {/* Total Spent */}
          <div className="glass-light p-4 rounded-xl border border-neutral-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-xs font-semibold text-neutral-600 uppercase">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalSpent)}</p>
          </div>

          {/* Remaining */}
          <div className={`glass-light p-4 rounded-xl border ${
            isOverBudget ? 'border-red-200' : 'border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isOverBudget ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <TrendingUp className="h-4 w-4 text-green-600" />
              )}
              <span className="text-xs font-semibold text-neutral-600 uppercase">Remaining</span>
            </div>
            <p className={`text-2xl font-bold ${
              isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
              {formatCurrency(summary.remaining)}
            </p>
          </div>
        </div>

        {/* Warning Message */}
        {isOverBudget && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Over Budget</p>
              <p className="text-xs text-red-700 mt-1">
                You have exceeded your budget by {formatCurrency(Math.abs(summary.remaining))}
              </p>
            </div>
          </div>
        )}

        {isNearBudget && !isOverBudget && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900">Approaching Budget Limit</p>
              <p className="text-xs text-yellow-700 mt-1">
                You have used {summary.percentageUsed.toFixed(1)}% of your budget. Only {formatCurrency(summary.remaining)} remaining.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

