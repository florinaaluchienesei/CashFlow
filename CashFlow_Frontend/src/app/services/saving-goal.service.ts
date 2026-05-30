import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SavingGoal } from '../pages/savings/saving-goal';

@Injectable({
  providedIn: 'root'
})
export class SavingGoalService {
  private apiUrl = 'http://localhost:3000/api/saving-goals';

  constructor(private http: HttpClient) {}

  getGoals(userId: string) {
    return this.http.get<SavingGoal[]>(`${this.apiUrl}/${userId}`);
  }

  addGoal(goal: SavingGoal) {
    return this.http.post(this.apiUrl, goal);
  }

  deleteGoal(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}