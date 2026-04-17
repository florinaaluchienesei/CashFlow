import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from './transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss']
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];

  newTransaction: Transaction = {
    title: '',
    amount: 0,
    type: 'income',
    date: '',
    userId: '',
    currency: 'RON'
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
      },
      error: (err) => {
        console.log('Eroare load:', err);
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

    this.transactionService.addTransaction(transactionToAdd).subscribe({
      next: () => {
        this.loadTransactions();

        this.newTransaction = {
          title: '',
          amount: 0,
          type: 'income',
          date: '',
          userId: '',
          currency: 'RON'
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