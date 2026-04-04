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
    id: 0,
    title: '',
    amount: 0,
    type: 'income',
    date: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.getTransactions();
  }

  addTransaction(): void {
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
      id: Date.now()
    };

    this.transactionService.addTransaction(transactionToAdd);
    this.loadTransactions();

    this.newTransaction = {
      id: 0,
      title: '',
      amount: 0,
      type: 'income',
      date: ''
    };
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id);
    this.loadTransactions();
  }
}