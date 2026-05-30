export interface Transaction {
  _id?: string;

  title: string;

  amount: number;

  type: 'income' | 'expense';

  currency: 'RON' | 'EUR';

  category:
    | 'Food'
    | 'Transport'
    | 'Bills'
    | 'Shopping'
    | 'Salary'
    | 'Other';

  date: string;

  userId: string;
}