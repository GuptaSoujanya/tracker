"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Transaction, Category } from "../types";
import { formatCurrency } from "../helper";

interface TransactionsListProps {
  transactions: Transaction[];
  categories: Category[];
  onDelete?: (transactionId: string) => Promise<void>;
  onEdit?: (transaction: Transaction) => void;
}

export function TransactionsList({ 
  transactions, 
  categories,
  onDelete,
  onEdit,
}: TransactionsListProps) {
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  const getCategoryColor = (categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || '#6366F1';
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime();
  });

  if (transactions.length === 0) {
    return (
      <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-6">
          <CardTitle className="text-xl font-bold text-neutral-900">Transactions</CardTitle>
          <CardDescription className="text-neutral-600">
            List of all transactions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="flex items-center justify-center h-[200px] text-neutral-500">
            <p className="text-sm">No transactions found for the selected period</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass border-white/40 hover:border-budget-400 hover:shadow-2xl transition-all duration-300">
      <CardHeader className="p-6">
        <CardTitle className="text-xl font-bold text-neutral-900">Transactions</CardTitle>
        <CardDescription className="text-neutral-600">
          {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="rounded-lg border border-neutral-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50/50">
                <TableHead className="font-semibold text-neutral-900">Date</TableHead>
                <TableHead className="font-semibold text-neutral-900">Category</TableHead>
                <TableHead className="font-semibold text-neutral-900">Description</TableHead>
                <TableHead className="font-semibold text-neutral-900 text-right">Amount</TableHead>
                {(onDelete || onEdit) && (
                  <TableHead className="font-semibold text-neutral-900 text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-neutral-50/30">
                  <TableCell className="text-neutral-700 font-medium">
                    {new Date(transaction.transaction_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: getCategoryColor(transaction.category_id),
                        color: 'white',
                      }}
                      className="font-semibold"
                    >
                      {getCategoryName(transaction.category_id)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-600">
                    {transaction.description || '-'}
                  </TableCell>
                  <TableCell className="text-right font-bold text-red-600">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  {(onDelete || onEdit) && (
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(transaction)}
                            className="h-8 w-8 p-0 hover:bg-primary-50"
                          >
                            <Edit2 className="h-4 w-4 text-primary-600" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(transaction.id)}
                            className="h-8 w-8 p-0 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

