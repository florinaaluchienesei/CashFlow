import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-virtual-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './virtual-card.html',
  styleUrls: ['./virtual-card.scss']
})
export class VirtualCard {

  @Input() balance = 0;

  cardStatus = true;

  cardNumber = '4582 7812 9945 1120';

  cardHolder = '';

  constructor(
    private authService: AuthService
  ) {

    const user = this.authService.getUser();

    if (user) {
      this.cardHolder = user.name;
    }

  }

  toggleCard(): void {
    this.cardStatus = !this.cardStatus;
  }
}