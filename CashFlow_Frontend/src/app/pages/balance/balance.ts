import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  templateUrl: './balance.html',
  styleUrls: ['./balance.scss'],
})
export class Balance {
  constructor(private auth: AuthService, private router: Router) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }
}