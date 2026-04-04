import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type User = { email: string; password: string; name: string };
export type PublicUser = { email: string; name: string };

const USERS_KEY = 'cashflow_users';
const CURRENT_USER_KEY = 'cashflow_current_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private currentUserSubject = new BehaviorSubject<PublicUser | null>(
    this.isBrowser ? this.getCurrentUser() : null
  );
  currentUser$ = this.currentUserSubject.asObservable();

  // ===== helpers =====
  private readUsers(): User[] {
    if (!this.isBrowser) return [];
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  }

  private writeUsers(users: User[]) {
    if (!this.isBrowser) return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // ===== public API =====
  getCurrentUser(): PublicUser | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as PublicUser) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  register(name: string, email: string, password: string) {
    if (!this.isBrowser) return { ok: false as const, message: 'Not in browser' };

    email = email.trim().toLowerCase();
    const users = this.readUsers();

    if (users.some(u => u.email === email)) {
      return { ok: false as const, message: 'An account with this email already exists.' };
    }

    users.push({ name: name.trim(), email, password });
    this.writeUsers(users);
    return { ok: true as const };
  }

  login(email: string, password: string) {
    if (!this.isBrowser) return { ok: false as const, message: 'Not in browser' };

    email = email.trim().toLowerCase();
    const users = this.readUsers();

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { ok: false as const, message: 'Invalid email or password.' };

    const publicUser = { name: user.name, email: user.email };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
    this.currentUserSubject.next(publicUser);

    return { ok: true as const };
  }

  logout() {
    if (!this.isBrowser) return;
    localStorage.removeItem(CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }
}