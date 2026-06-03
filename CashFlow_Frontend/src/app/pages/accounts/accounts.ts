import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss'
})
export class Accounts {

  accounts = [
    {
      name: 'Personal Account',
      type: 'personal',
      balanceRON: 5200
    }
  ];

  showCreateForm = false;

  newAccount = {
    name: '',
    type: 'personal',
    balanceRON: 0
  };

  createAccount() {

    if (!this.newAccount.name.trim()) return;

    this.accounts.push({
      ...this.newAccount
    });

    this.newAccount = {
      name: '',
      type: 'personal',
      balanceRON: 0
    };

    this.showCreateForm = false;
  }

}