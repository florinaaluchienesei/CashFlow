import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Transactions } from './pages/transactions/transactions';
import { Balance } from './pages/balance/balance';
import { Savings } from './pages/savings/savings';
import { Chatbot } from './pages/chatbot/chatbot';
import { Dashboard } from './pages/dashboard/dashboard';
import { VirtualCard } from './components/virtual-card/virtual-card';
import { Accounts } from './pages/accounts/accounts';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'transactions', component: Transactions },
  { path: 'balance', component: Balance },
  { path: 'savings', component: Savings },
  {path:'chatbot',component:Chatbot},
  {path:'dashboard',component: Dashboard},
  { path: 'virtual-card', component: VirtualCard },
  {path: 'accounts', component: Accounts},
];