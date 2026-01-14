import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../controllers/budgetController';

const router = Router();

// Category routes
router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.delete('/categories/:id', deleteCategory);

// Budget routes
router.get('/budgets', getBudgets);
router.post('/budgets', createBudget);
router.put('/budgets/:id', updateBudget);
router.delete('/budgets/:id', deleteBudget);

// Transaction routes
router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;

