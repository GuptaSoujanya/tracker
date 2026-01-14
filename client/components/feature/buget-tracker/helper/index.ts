import { Budget, Transaction, Category, DateRange, TimeRangeFilter, BudgetSummary, CategorySpending, SpendingTrend } from '../types';

export const getDateRangeForFilter = (filter: TimeRangeFilter, customRange?: DateRange): DateRange => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  switch (filter) {
    case 'day': {
      return {
        start: new Date(today),
        end: new Date(today),
      };
    }
    case 'week': {
      const dayOfWeek = today.getDay();
      const start = new Date(today);
      start.setDate(today.getDate() - dayOfWeek);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return { start, end };
    }
    case 'month': {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { start, end };
    }
    case 'year': {
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      return { start, end };
    }
    case 'custom': {
      if (customRange) {
        return {
          start: new Date(customRange.start),
          end: new Date(customRange.end),
        };
      }
      return {
        start: new Date(today),
        end: new Date(today),
      };
    }
    default:
      return {
        start: new Date(today),
        end: new Date(today),
      };
  }
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculateBudgetSummary = (
  budgets: Budget[],
  transactions: Transaction[],
  dateRange: DateRange
): BudgetSummary => {
  const startDateStr = formatDate(dateRange.start);
  const endDateStr = formatDate(dateRange.end);

  // Calculate total budget for the period
  let totalBudget = 0;
  budgets.forEach(budget => {
    const budgetStart = new Date(budget.start_date);
    const budgetEnd = budget.end_date ? new Date(budget.end_date) : new Date(dateRange.end);
    
    // Check if budget overlaps with date range
    if (budgetStart <= dateRange.end && budgetEnd >= dateRange.start) {
      // Calculate the overlap period
      const overlapStart = budgetStart > dateRange.start ? budgetStart : dateRange.start;
      const overlapEnd = budgetEnd < dateRange.end ? budgetEnd : dateRange.end;
      
      // Calculate days in overlap
      const daysInOverlap = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      // Calculate budget amount based on period type
      let periodBudget = 0;
      switch (budget.period_type) {
        case 'daily':
          periodBudget = budget.amount * daysInOverlap;
          break;
        case 'weekly':
          periodBudget = budget.amount * (daysInOverlap / 7);
          break;
        case 'monthly':
          periodBudget = budget.amount * (daysInOverlap / 30);
          break;
        case 'yearly':
          periodBudget = budget.amount * (daysInOverlap / 365);
          break;
      }
      totalBudget += periodBudget;
    }
  });

  // Calculate total spent
  const totalSpent = transactions
    .filter(t => {
      const txDate = new Date(t.transaction_date);
      return txDate >= dateRange.start && txDate <= dateRange.end;
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = totalBudget - totalSpent;
  const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return {
    totalBudget,
    totalSpent,
    remaining,
    percentageUsed: Math.min(100, Math.max(0, percentageUsed)),
  };
};

export const calculateCategorySpending = (
  budgets: Budget[],
  transactions: Transaction[],
  categories: Category[],
  dateRange: DateRange
): CategorySpending[] => {
  const categoryMap = new Map<string, CategorySpending>();

  // Initialize category map
  categories.forEach(cat => {
    categoryMap.set(cat.id, {
      categoryId: cat.id,
      categoryName: cat.name,
      categoryColor: cat.color,
      budget: 0,
      spent: 0,
      remaining: 0,
    });
  });

  // Calculate budgets per category
  budgets.forEach(budget => {
    const budgetStart = new Date(budget.start_date);
    const budgetEnd = budget.end_date ? new Date(budget.end_date) : new Date(dateRange.end);
    
    if (budgetStart <= dateRange.end && budgetEnd >= dateRange.start) {
      const overlapStart = budgetStart > dateRange.start ? budgetStart : dateRange.start;
      const overlapEnd = budgetEnd < dateRange.end ? budgetEnd : dateRange.end;
      const daysInOverlap = Math.ceil((overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      
      let periodBudget = 0;
      switch (budget.period_type) {
        case 'daily':
          periodBudget = budget.amount * daysInOverlap;
          break;
        case 'weekly':
          periodBudget = budget.amount * (daysInOverlap / 7);
          break;
        case 'monthly':
          periodBudget = budget.amount * (daysInOverlap / 30);
          break;
        case 'yearly':
          periodBudget = budget.amount * (daysInOverlap / 365);
          break;
      }

      const existing = categoryMap.get(budget.category_id);
      if (existing) {
        existing.budget += periodBudget;
      }
    }
  });

  // Calculate spent per category
  transactions
    .filter(t => {
      const txDate = new Date(t.transaction_date);
      return txDate >= dateRange.start && txDate <= dateRange.end;
    })
    .forEach(transaction => {
      const existing = categoryMap.get(transaction.category_id);
      if (existing) {
        existing.spent += transaction.amount;
      }
    });

  // Calculate remaining
  categoryMap.forEach(cat => {
    cat.remaining = cat.budget - cat.spent;
  });

  return Array.from(categoryMap.values()).filter(cat => cat.budget > 0 || cat.spent > 0);
};

export const calculateSpendingTrends = (
  transactions: Transaction[],
  budgets: Budget[],
  dateRange: DateRange
): SpendingTrend[] => {
  const trends: SpendingTrend[] = [];
  const daysDiff = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
  
  // Group by day for small ranges, by week for medium, by month for large
  const groupBy = daysDiff <= 31 ? 'day' : daysDiff <= 365 ? 'week' : 'month';
  
  const spendingByPeriod = new Map<string, number>();
  
  transactions
    .filter(t => {
      const txDate = new Date(t.transaction_date);
      return txDate >= dateRange.start && txDate <= dateRange.end;
    })
    .forEach(transaction => {
      const txDate = new Date(transaction.transaction_date);
      let key = '';
      
      if (groupBy === 'day') {
        key = formatDate(txDate);
      } else if (groupBy === 'week') {
        const weekStart = new Date(txDate);
        weekStart.setDate(txDate.getDate() - txDate.getDay());
        key = formatDate(weekStart);
      } else {
        key = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`;
      }
      
      const existing = spendingByPeriod.get(key) || 0;
      spendingByPeriod.set(key, existing + transaction.amount);
    });

  // Convert to array and sort
  spendingByPeriod.forEach((spent, date) => {
    trends.push({ date, spent });
  });

  return trends.sort((a, b) => a.date.localeCompare(b.date));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

