import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { SavingService } from '../../services/saving.service';
import { SavingGoalService } from '../../services/saving-goal.service';

import { Saving } from './saving';
import { SavingGoal } from './saving-goal';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './savings.html',
  styleUrls: ['./savings.scss']
})
export class Savings implements OnInit {
  savings: Saving[] = [];
  goals: SavingGoal[] = [];

  ronSavings = 0;
  eurSavings = 0;

  newSaving: Saving = {
    amount: 0,
    currency: 'RON',
    date: '',
    userId: ''
  };

  newGoal: SavingGoal = {
    name: '',
    targetAmount: 0,
    currency: 'RON',
    userId: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router,
    private savingService: SavingService,
    private savingGoalService: SavingGoalService
  ) {}

  ngOnInit(): void {
    const user = this.auth.getUser();

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loadSavings();
    this.loadGoals();
  }

  loadSavings(): void {
    const user = this.auth.getUser();

    if (!user) return;

    this.savingService.getSavings(user._id || user.id).subscribe({
      next: (data) => {
        this.savings = data.savings;
        this.ronSavings = data.ronSavings;
        this.eurSavings = data.eurSavings;
      },
      error: (err) => {
        console.log('Eroare savings:', err);
      }
    });
  }

  loadGoals(): void {
    const user = this.auth.getUser();

    if (!user) return;

    this.savingGoalService.getGoals(user._id || user.id).subscribe({
      next: (data) => {
        this.goals = data;
      },
      error: (err) => {
        console.log('Eroare goals:', err);
      }
    });
  }

  addSaving(): void {
    const user = this.auth.getUser();

    if (!user) return;

    if (this.newSaving.amount <= 0 || this.newSaving.date === '') {
      alert('Completează suma și data!');
      return;
    }

    const savingToAdd: Saving = {
      ...this.newSaving,
      userId: user._id || user.id
    };

    this.savingService.addSaving(savingToAdd).subscribe({
      next: () => {
        this.loadSavings();

        this.newSaving = {
          amount: 0,
          currency: 'RON',
          date: '',
          userId: ''
        };
      },
      error: (err) => {
        console.log('Eroare add saving:', err);
      }
    });
  }

  addGoal(): void {
    const user = this.auth.getUser();

    if (!user) return;

    if (
      this.newGoal.name.trim() === '' ||
      this.newGoal.targetAmount <= 0
    ) {
      alert('Completează numele obiectivului și suma țintă!');
      return;
    }

    const goalToAdd: SavingGoal = {
      ...this.newGoal,
      userId: user._id || user.id
    };

    this.savingGoalService.addGoal(goalToAdd).subscribe({
      next: () => {
        this.loadGoals();

        this.newGoal = {
          name: '',
          targetAmount: 0,
          currency: 'RON',
          userId: ''
        };
      },
      error: (err) => {
        console.log('Eroare add goal:', err);
      }
    });
  }

  deleteSaving(id: string): void {
    this.savingService.deleteSaving(id).subscribe({
      next: () => {
        this.loadSavings();
      },
      error: (err) => {
        console.log('Eroare delete saving:', err);
      }
    });
  }

  deleteGoal(id: string): void {
    this.savingGoalService.deleteGoal(id).subscribe({
      next: () => {
        this.loadGoals();
      },
      error: (err) => {
        console.log('Eroare delete goal:', err);
      }
    });
  }

  getSavedForGoal(goal: SavingGoal): number {
    return goal.currency === 'RON' ? this.ronSavings : this.eurSavings;
  }

  getGoalProgress(goal: SavingGoal): number {
    const saved = this.getSavedForGoal(goal);

    if (goal.targetAmount <= 0) return 0;

    const progress = Math.round((saved / goal.targetAmount) * 100);

    return progress > 100 ? 100 : progress;
  }
  getSavedAmountForGoal(goal: SavingGoal): number {
    if (goal.currency === 'RON') {
      return this.ronSavings;
    }

    return this.eurSavings;
  }

  getRemainingAmount(goal: SavingGoal): number {
    const saved = this.getSavedAmountForGoal(goal);
    const remaining = goal.targetAmount - saved;

    return remaining > 0 ? remaining : 0;
  }

  getProgress(goal: SavingGoal): number {
    const saved = this.getSavedAmountForGoal(goal);

    if (goal.targetAmount <= 0) {
      return 0;
    }

    const progress = (saved / goal.targetAmount) * 100;

    return progress > 100 ? 100 : Math.round(progress);
  }

  getMonthlyRecommendation(goal: SavingGoal): number {
    const remaining = this.getRemainingAmount(goal);

    if (remaining <= 0) {
      return 0;
    }

    return Math.ceil(remaining / 6);
  }
}