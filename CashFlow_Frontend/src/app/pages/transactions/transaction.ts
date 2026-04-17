export interface Transaction {
  _id?: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  userId: string;
  currency: 'RON' | 'EUR';
}