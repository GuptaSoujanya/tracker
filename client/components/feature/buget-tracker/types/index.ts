export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  created_at: string;
}

export interface Budget {
  id: string;
  category_id: string;
  amount: number;
  period_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  category_id: string;
  amount: number;
  description?: string;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDto {
  name: string;
  color: string;
  icon?: string;
}

export interface CreateBudgetDto {
  category_id: string;
  amount: number;
  period_type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date: string;
  end_date?: string;
}

export interface CreateTransactionDto {
  category_id: string;
  amount: number;
  description?: string;
  transaction_date: string;
}

export type TimeRangeFilter = 'day' | 'week' | 'month' | 'year' | 'custom';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  percentageUsed: number;
}

export interface CategorySpending {
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  budget: number;
  spent: number;
  remaining: number;
}

export interface SpendingTrend {
  date: string;
  spent: number;
  budget?: number;
}

