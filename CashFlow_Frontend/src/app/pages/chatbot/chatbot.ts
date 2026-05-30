import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatbot.html',
  styleUrls: ['./chatbot.scss']
})
export class Chatbot {
  isOpen = false;
  answer = '';

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  askBot(type: string): void {
    if (type === 'money') {
      this.answer = 'Your finances look stable. Try moving 10% into Savings.';
    }

    if (type === 'saving') {
      this.answer = 'Recommended saving: 10% of your positive balance.';
    }

    if (type === 'expense') {
      this.answer = 'Try reducing unnecessary expenses and track your spending weekly.';
    }

    if (type === 'goal') {
      this.answer = 'Create a savings target and add money every month.';
    }
  }
}