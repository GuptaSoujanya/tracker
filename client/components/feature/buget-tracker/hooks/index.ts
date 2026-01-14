"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { budgetAPI, Category, Budget, Transaction } from '../service';
import { TimeRangeFilter, DateRange } from '../types';
import { getDateRangeForFilter, formatDate } from '../helper';

export const useBudgetTracker = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<TimeRangeFilter>('month');
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dateRange = useMemo(() => {
    return getDateRangeForFilter(filter, customDateRange);
  }, [filter, customDateRange]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const startDate = formatDate(dateRange.start);
      const endDate = formatDate(dateRange.end);

      const [categoriesData, budgetsData, transactionsData] = await Promise.all([
        budgetAPI.getCategories(),
        budgetAPI.getBudgets({
          start_date: startDate,
          end_date: endDate,
        }),
        budgetAPI.getTransactions({
          start_date: startDate,
          end_date: endDate,
        }),
      ]);

      setCategories(categoriesData);
      setBudgets(budgetsData);
      setTransactions(transactionsData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const addCategory = useCallback(async (name: string, color: string, icon?: string) => {
    try {
      setError(null);
      const newCategory = await budgetAPI.createCategory({ name, color, icon });
      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
      throw err;
    }
  }, []);

  const deleteCategory = useCallback(async (categoryId: string) => {
    try {
      setError(null);
      await budgetAPI.deleteCategory(categoryId);
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      setBudgets(prev => prev.filter(b => b.category_id !== categoryId));
      setTransactions(prev => prev.filter(t => t.category_id !== categoryId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
      throw err;
    }
  }, []);

  const addBudget = useCallback(async (
    categoryId: string,
    amount: number,
    periodType: 'daily' | 'weekly' | 'monthly' | 'yearly',
    startDate: string,
    endDate?: string
  ) => {
    try {
      setError(null);
      const newBudget = await budgetAPI.createBudget({
        category_id: categoryId,
        amount,
        period_type: periodType,
        start_date: startDate,
        end_date: endDate,
      });
      setBudgets(prev => [...prev, newBudget]);
      return newBudget;
    } catch (err: any) {
      setError(err.message || 'Failed to create budget');
      throw err;
    }
  }, []);

  const updateBudget = useCallback(async (budgetId: string, updates: {
    amount?: number;
    period_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    start_date?: string;
    end_date?: string;
  }) => {
    try {
      setError(null);
      const updated = await budgetAPI.updateBudget(budgetId, updates);
      setBudgets(prev => prev.map(b => b.id === budgetId ? updated : b));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update budget');
      throw err;
    }
  }, []);

  const deleteBudget = useCallback(async (budgetId: string) => {
    try {
      setError(null);
      await budgetAPI.deleteBudget(budgetId);
      setBudgets(prev => prev.filter(b => b.id !== budgetId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete budget');
      throw err;
    }
  }, []);

  const addTransaction = useCallback(async (
    categoryId: string,
    amount: number,
    transactionDate: string,
    description?: string
  ) => {
    try {
      setError(null);
      const newTransaction = await budgetAPI.createTransaction({
        category_id: categoryId,
        amount,
        transaction_date: transactionDate,
        description,
      });
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } catch (err: any) {
      setError(err.message || 'Failed to create transaction');
      throw err;
    }
  }, []);

  const updateTransaction = useCallback(async (transactionId: string, updates: {
    category_id?: string;
    amount?: number;
    description?: string;
    transaction_date?: string;
  }) => {
    try {
      setError(null);
      const updated = await budgetAPI.updateTransaction(transactionId, updates);
      setTransactions(prev => prev.map(t => t.id === transactionId ? updated : t));
      return updated;
    } catch (err: any) {
      setError(err.message || 'Failed to update transaction');
      throw err;
    }
  }, []);

  const deleteTransaction = useCallback(async (transactionId: string) => {
    try {
      setError(null);
      await budgetAPI.deleteTransaction(transactionId);
      setTransactions(prev => prev.filter(t => t.id !== transactionId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete transaction');
      throw err;
    }
  }, []);

  return {
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
    addCategory,
    deleteCategory,
    addBudget,
    updateBudget,
    deleteBudget,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

