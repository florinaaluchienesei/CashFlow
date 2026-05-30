import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-card.html',
  styleUrls: ['./virtual-card.scss']
})
export class VirtualCard {

  cardStatus = true;

  cardNumber =
    '4582 7812 9945 1120';

  cardHolder =
    'CashFlow User';

  balance =
    5200;

  toggleCard(): void {
    this.cardStatus =
      !this.cardStatus;
  }
}