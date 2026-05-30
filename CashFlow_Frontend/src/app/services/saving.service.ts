import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Saving } from '../pages/savings/saving';

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private apiUrl = 'http://localhost:3000/api/savings';

  constructor(private http: HttpClient) {}

  getSavings(userId: string) {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  addSaving(saving: Saving) {
    return this.http.post(this.apiUrl, saving);
  }

  deleteSaving(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}