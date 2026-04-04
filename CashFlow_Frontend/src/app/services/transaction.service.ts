import { Injectable } from '@angular/core';
import { Transaction } from '../pages/transactions/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: Transaction[] = [];

  constructor() {}

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
  }

  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }
}