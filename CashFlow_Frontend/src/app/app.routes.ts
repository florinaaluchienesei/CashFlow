import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Transactions } from './pages/transactions/transactions';
import { Balance } from './pages/balance/balance';

export const routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'transactions', component: Transactions },
  { path: 'balance', component: Balance }
];