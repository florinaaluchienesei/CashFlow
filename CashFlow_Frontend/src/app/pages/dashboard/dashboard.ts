import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { SavingService } from '../../services/saving.service';
import { SavingGoalService } from '../../services/saving-goal.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  ronBalance = 0;
  eurBalance = 0;

  ronSavings = 0;
  eurSavings = 0;

  goalsCount = 0;

  recommendation = '';

  financialHealthScore = 0;
  financialHealthMessage = '';

  smartAlerts: string[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private transactionService: TransactionService,
    private savingService: SavingService,
    private savingGoalService: SavingGoalService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    const userId = user._id || user.id;

    this.transactionService.getBalance(userId).subscribe({
      next: (data) => {
        this.ronBalance = data.ronBalance;
        this.eurBalance = data.eurBalance;

        this.generateRecommendation();
        this.calculateFinancialHealth();
        this.generateSmartAlerts();
      },
      error: (err) => {
        console.log('Eroare dashboard balance:', err);
      }
    });

    this.savingService.getSavings(userId).subscribe({
      next: (data) => {
        this.ronSavings = data.ronSavings;
        this.eurSavings = data.eurSavings;

        this.generateRecommendation();
        this.calculateFinancialHealth();
        this.generateSmartAlerts();
      },
      error: (err) => {
        console.log('Eroare dashboard savings:', err);
      }
    });

    this.savingGoalService.getGoals(userId).subscribe({
      next: (goals) => {
        this.goalsCount = goals.length;

        this.calculateFinancialHealth();
        this.generateSmartAlerts();
      },
      error: (err) => {
        console.log('Eroare dashboard goals:', err);
      }
    });
  }

  generateRecommendation(): void {
    if (this.ronBalance > 0) {
      const suggested = Math.round(this.ronBalance * 0.1);
      this.recommendation = `You could move about ${suggested} RON to Savings.`;
    } else {
      this.recommendation = 'Add transactions to receive smart recommendations.';
    }
  }

  calculateFinancialHealth(): void {
    let score = 50;

    if (this.ronBalance > 0) {
      score += 15;
    }

    if (this.eurBalance > 0) {
      score += 10;
    }

    if (this.ronSavings > 0 || this.eurSavings > 0) {
      score += 15;
    }

    if (this.goalsCount > 0) {
      score += 10;
    }

    if (score > 100) {
      score = 100;
    }

    this.financialHealthScore = score;

    if (score >= 80) {
      this.financialHealthMessage = 'Excellent financial situation';
    } else if (score >= 60) {
      this.financialHealthMessage = 'Stable financial situation';
    } else {
      this.financialHealthMessage = 'Needs more attention';
    }
  }

  generateSmartAlerts(): void {
    this.smartAlerts = [];

    if (this.ronBalance < 0) {
      this.smartAlerts.push('RON balance is negative. Try reducing expenses.');
    }

    if (this.eurBalance < 0) {
      this.smartAlerts.push('EUR balance is negative. Check your EUR expenses.');
    }

    if (this.ronSavings > 0 || this.eurSavings > 0) {
      this.smartAlerts.push('Great job! You already have money saved.');
    }

    if (this.goalsCount > 0) {
      this.smartAlerts.push('You have active savings goals. Keep tracking your progress.');
    }

    if (
      this.ronBalance > 0 &&
      this.eurBalance >= 0 &&
      this.ronSavings === 0 &&
      this.eurSavings === 0
    ) {
      this.smartAlerts.push('You have a positive balance. Consider moving part of it to Savings.');
    }

    if (this.smartAlerts.length === 0) {
      this.smartAlerts.push('Add more financial data to receive smart alerts.');
    }
  }
}