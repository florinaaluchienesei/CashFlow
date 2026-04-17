import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  goToStart(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/transactions');
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}