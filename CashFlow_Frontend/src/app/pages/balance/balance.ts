import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';

import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.html',
  styleUrls: ['./balance.scss']
})
export class Balance implements OnInit {
  selectedCurrency: 'RON' | 'EUR' = 'RON';

  ronIncome = 0;
  ronExpense = 0;
  ronBalance = 0;

  eurIncome = 0;
  eurExpense = 0;
  eurBalance = 0;

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

    this.transactionService.getBalance(user._id || user.id).subscribe({
      next: (data) => {
        this.ronIncome = data.ronIncome;
        this.ronExpense = data.ronExpense;
        this.ronBalance = data.ronBalance;

        this.eurIncome = data.eurIncome;
        this.eurExpense = data.eurExpense;
        this.eurBalance = data.eurBalance;

        this.createChart();
      },
      error: (err) => {
        console.log('Eroare balance:', err);
      }
    });
  }

  selectCurrency(currency: 'RON' | 'EUR'): void {
    this.selectedCurrency = currency;
    this.createChart();
  }

  createChart(): void {
    const existingChart = Chart.getChart('balanceChart');
    if (existingChart) {
      existingChart.destroy();
    }

    const isRon = this.selectedCurrency === 'RON';

    new Chart('balanceChart', {
      type: 'doughnut',
      data: {
        labels: isRon
          ? ['🇷🇴 Income', '🇷🇴 Expense']
          : ['🇪🇺 Income', '🇪🇺 Expense'],
        datasets: [
          {
            data: isRon
              ? [this.ronIncome, this.ronExpense]
              : [this.eurIncome, this.eurExpense],
            backgroundColor: ['#10b981', '#ef4444'],
            borderColor: ['#34d399', '#f87171'],
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
}