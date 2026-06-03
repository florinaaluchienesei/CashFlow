import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from './transaction';

import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss']
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  selectedFilter: 'all' | 'income' | 'expense' | 'RON' | 'EUR' = 'all' ;

  fromDate = '';
  toDate = '';

  newTransaction: Transaction = {
    title: '',
    amount: 0,
    type: 'income',
    date: '',
    userId: '',
    currency: 'RON',
    category: 'Other'
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loadTransactions();
  }

  loadTransactions(): void {
    const user = this.auth.getUser();

    if (!user) return;

    this.transactionService.getTransactions(user._id || user.id).subscribe({
      next: (data) => {
        this.transactions = data;

        setTimeout(() => {
          this.createCategoryChart();
        }, 0);
      },
      error: (err) => {
        console.log('Eroare load:', err);
      }
    });
  }

  getFilteredTransactions(): Transaction[] {
    if (this.selectedFilter === 'all') {
      return this.transactions;
    }

    if (this.selectedFilter === 'income' || this.selectedFilter === 'expense') {
      return this.transactions.filter(t => t.type === this.selectedFilter);
    }

    return this.transactions.filter(t => t.currency === this.selectedFilter);
  }

  getTransactionsForPdf(): Transaction[] {
    let filtered = this.getFilteredTransactions();

    if (this.fromDate) {
      filtered = filtered.filter(t => t.date >= this.fromDate);
    }

    if (this.toDate) {
      filtered = filtered.filter(t => t.date <= this.toDate);
    }

    return filtered;
  }

  downloadStatement(): void {
    const doc = new jsPDF();

    const pdfTransactions = this.getTransactionsForPdf();

    doc.setFontSize(20);
    doc.text('CashFlow - Account Statement', 20, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

    if (this.fromDate || this.toDate) {
      doc.text(
        `Period: ${this.fromDate || 'Start'} - ${this.toDate || 'Today'}`,
        20,
        38
      );
    }

    let y = 50;

    doc.text('Transactions:', 20, y);
    y += 10;

    if (pdfTransactions.length === 0) {
      doc.text('No transactions found for selected filters.', 20, y);
    }

    pdfTransactions.forEach((transaction, index) => {
      const sign = transaction.type === 'income' ? '+' : '-';

      doc.text(
        `${index + 1}. ${transaction.title} | ${sign}${transaction.amount} ${transaction.currency} | ${transaction.category} | ${transaction.date}`,
        20,
        y
      );

      y += 8;

      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save('cashflow-statement.pdf');
  }

  createCategoryChart(): void {
    const existingChart = Chart.getChart('categoryChart');

    if (existingChart) {
      existingChart.destroy();
    }

    const expenses = this.transactions.filter(t => t.type === 'expense');

    const food = expenses
      .filter(t => t.category === 'Food')
      .reduce((sum, t) => sum + t.amount, 0);

    const transport = expenses
      .filter(t => t.category === 'Transport')
      .reduce((sum, t) => sum + t.amount, 0);

    const bills = expenses
      .filter(t => t.category === 'Bills')
      .reduce((sum, t) => sum + t.amount, 0);

    const shopping = expenses
      .filter(t => t.category === 'Shopping')
      .reduce((sum, t) => sum + t.amount, 0);

    const other = expenses
      .filter(t => t.category === 'Other')
      .reduce((sum, t) => sum + t.amount, 0);

    new Chart('categoryChart', {
      type: 'doughnut',
      data: {
        labels: ['🍔 Food', '🚗 Transport', '🧾 Bills', '🛍️ Shopping', '📌 Other'],
        datasets: [
          {
            data: [food, transport, bills, shopping, other],
            backgroundColor: [
              '#10b981',
              '#3b82f6',
              '#f59e0b',
              '#ec4899',
              '#64748b'
            ],
            borderColor: [
              '#34d399',
              '#60a5fa',
              '#fbbf24',
              '#f472b6',
              '#94a3b8'
            ],
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  }

  addTransaction(): void {
    const user = this.auth.getUser();

    if (!user) return;

    if (
      this.newTransaction.title.trim() === '' ||
      this.newTransaction.amount <= 0 ||
      this.newTransaction.date === ''
    ) {
      alert('Completează toate câmpurile!');
      return;
    }

    const transactionToAdd: Transaction = {
      ...this.newTransaction,
      userId: user._id || user.id
    };

    console.log(transactionToAdd);
    this.transactionService.addTransaction(transactionToAdd).subscribe({
      next: () => {
        this.loadTransactions();

        this.newTransaction = {
          title: '',
          amount: 0,
          type: 'income',
          date: '',
          userId: '',
          currency: 'RON',
          category: 'Other'
        };
      },
      error: (err) => {
        console.log('EROARE ADD:', err);
      }
    });
  }

  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.loadTransactions();
      },
      error: (err) => {
        console.log('EROARE DELETE:', err);
      }
    });
  }
}