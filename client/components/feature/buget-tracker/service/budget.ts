const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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

class BudgetAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/budgets`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories');
  }

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    return this.request<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string): Promise<void> {
    return this.request<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Budget methods
  async getBudgets(params?: BudgetQueryParams): Promise<Budget[]> {
    const queryParams = new URLSearchParams();
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.category_id) queryParams.append('category_id', params.category_id);
    if (params?.period_type) queryParams.append('period_type', params.period_type);

    const query = queryParams.toString();
    return this.request<Budget[]>(`/budgets${query ? `?${query}` : ''}`);
  }

  async createBudget(data: CreateBudgetDto): Promise<Budget> {
    return this.request<Budget>('/budgets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBudget(id: string, data: UpdateBudgetDto): Promise<Budget> {
    return this.request<Budget>(`/budgets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBudget(id: string): Promise<void> {
    return this.request<void>(`/budgets/${id}`, {
      method: 'DELETE',
    });
  }

  // Transaction methods
  async getTransactions(params?: TransactionQueryParams): Promise<Transaction[]> {
    const queryParams = new URLSearchParams();
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.category_id) queryParams.append('category_id', params.category_id);

    const query = queryParams.toString();
    return this.request<Transaction[]>(`/transactions${query ? `?${query}` : ''}`);
  }

  async createTransaction(data: CreateTransactionDto): Promise<Transaction> {
    return this.request<Transaction>('/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTransaction(id: string, data: UpdateTransactionDto): Promise<Transaction> {
    return this.request<Transaction>(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTransaction(id: string): Promise<void> {
    return this.request<void>(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }
}

export const budgetAPI = new BudgetAPI();

