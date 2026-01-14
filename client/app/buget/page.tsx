"use client";

import React from 'react';
import {
  BudgetFilters,
  BudgetSummary,
  SpendingTrends,
  CategoryBreakdown,
  TransactionsList,
} from '@/components/feature/buget-tracker/components';
import { useBudgetTracker } from '@/components/feature/buget-tracker/hooks';
import {
  calculateBudgetSummary,
  calculateCategorySpending,
  calculateSpendingTrends,
} from '@/components/feature/buget-tracker/helper';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { LazyLoad } from '@/components/shared';

export default function BudgetPage() {
  const {
    categories,
    budgets,
    transactions,
    filter,
    setFilter,
    customDateRange,
    setCustomDateRange,
    dateRange,
    isLoading,
    error,
    refreshData,
    deleteTransaction,
  } = useBudgetTracker();

  // Calculate summary data
  const summary = React.useMemo(() => {
    return calculateBudgetSummary(budgets, transactions, dateRange);
  }, [budgets, transactions, dateRange]);

  const categorySpending = React.useMemo(() => {
    return calculateCategorySpending(budgets, transactions, categories, dateRange);
  }, [budgets, transactions, categories, dateRange]);

  const spendingTrends = React.useMemo(() => {
    return calculateSpendingTrends(transactions, budgets, dateRange);
  }, [transactions, budgets, dateRange]);

  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteTransaction(transactionId);
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Budget Tracker</h1>
        <p className="text-neutral-600 text-lg">
          Track and analyze your spending for the selected time period
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 glass border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-semibold">{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <div className="mb-6">
        <BudgetFilters
          filter={filter}
          onFilterChange={setFilter}
          customDateRange={customDateRange}
          onCustomDateRangeChange={setCustomDateRange}
          dateRange={dateRange}
        />
      </div>

      {/* Refresh Button */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={refreshData}
          disabled={isLoading}
          variant="outline"
          className="glass-light border-neutral-300 hover:bg-primary-50 gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="skeleton h-64 w-full rounded-xl"></div>
          <div className="skeleton h-96 w-full rounded-xl"></div>
          <div className="skeleton h-64 w-full rounded-xl"></div>
        </div>
      ) : (
        <>
          {/* Budget Summary */}
          <LazyLoad>
            <div className="mb-6">
              <BudgetSummary summary={summary} />
            </div>
          </LazyLoad>

          {/* Spending Trends */}
          <LazyLoad>
            <div className="mb-6">
              <SpendingTrends trends={spendingTrends} dateRange={dateRange} />
            </div>
          </LazyLoad>

          {/* Category Breakdown */}
          <LazyLoad>
            <div className="mb-6">
              <CategoryBreakdown categorySpending={categorySpending} />
            </div>
          </LazyLoad>

          {/* Transactions List */}
          <LazyLoad>
            <div className="mb-6">
              <TransactionsList
                transactions={transactions}
                categories={categories}
                onDelete={handleDeleteTransaction}
              />
            </div>
          </LazyLoad>
        </>
      )}
    </div>
  );
}
