import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userData).subscribe({
      next: (response) => {
        this.authService.saveUser(response.user);
        alert('Login reușit!');
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        this.error = err.error?.message || 'Eroare la autentificare';
      }
    });
  }
}