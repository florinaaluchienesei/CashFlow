import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../pages/transactions/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(userId: string) {
    return this.http.get<Transaction[]>(`${this.apiUrl}/${userId}`);
  }

  addTransaction(transaction: Transaction) {
    return this.http.post(this.apiUrl, transaction);
  }

  deleteTransaction(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getBalance(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/balance/${userId}`);
  }
}