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

export interface UpdateBudgetDto {
  amount?: number;
  period_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  start_date?: string;
  end_date?: string;
}

export interface UpdateTransactionDto {
  category_id?: string;
  amount?: number;
  description?: string;
  transaction_date?: string;
}

export interface BudgetQueryParams {
  start_date?: string;
  end_date?: string;
  category_id?: string;
  period_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface TransactionQueryParams {
  start_date?: string;
  end_date?: string;
  category_id?: string;
}

