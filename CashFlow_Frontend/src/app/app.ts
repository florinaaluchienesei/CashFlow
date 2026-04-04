import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService, PublicUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  user: PublicUser | null = null;

  constructor(private auth: AuthService) {
    this.auth.currentUser$.subscribe(u => (this.user = u));
  }

  logout() {
    this.auth.logout();
  }
}