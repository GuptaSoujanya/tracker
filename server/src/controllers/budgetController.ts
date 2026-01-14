import { Request, Response } from 'express';
import { getSupabaseClient } from '../config/database';
import {
  CreateCategoryDto,
  CreateBudgetDto,
  CreateTransactionDto,
  UpdateBudgetDto,
  UpdateTransactionDto,
  BudgetQueryParams,
  TransactionQueryParams,
} from '../types/budget';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const categoryData: CreateCategoryDto = req.body;

    const { data, error } = await supabase
      .from('categories')
      .insert([categoryData])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const queryParams: BudgetQueryParams = req.query as any;
    
    let query = supabase
      .from('budgets')
      .select('*')
      .order('created_at', { ascending: false });

    if (queryParams.start_date) {
      query = query.gte('start_date', queryParams.start_date);
    }
    if (queryParams.end_date) {
      query = query.lte('end_date', queryParams.end_date);
    }
    if (queryParams.category_id) {
      query = query.eq('category_id', queryParams.category_id);
    }
    if (queryParams.period_type) {
      query = query.eq('period_type', queryParams.period_type);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBudget = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const budgetData: CreateBudgetDto = req.body;

    const { data, error } = await supabase
      .from('budgets')
      .insert([budgetData])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBudget = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;
    const updateData: UpdateBudgetDto = req.body;

    const { data, error } = await supabase
      .from('budgets')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Budget deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const queryParams: TransactionQueryParams = req.query as any;
    
    let query = supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false });

    if (queryParams.start_date) {
      query = query.gte('transaction_date', queryParams.start_date);
    }
    if (queryParams.end_date) {
      query = query.lte('transaction_date', queryParams.end_date);
    }
    if (queryParams.category_id) {
      query = query.eq('category_id', queryParams.category_id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data || []);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const transactionData: CreateTransactionDto = req.body;

    const { data, error } = await supabase
      .from('transactions')
      .insert([transactionData])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;
    const updateData: UpdateTransactionDto = req.body;

    const { data, error } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const supabase = getSupabaseClient();
    const { id } = req.params;

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

