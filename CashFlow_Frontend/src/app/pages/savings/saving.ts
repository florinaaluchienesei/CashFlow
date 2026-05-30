export interface Saving {
  _id?: string;
  amount: number;
  currency: 'RON' | 'EUR';
  date: string;
  userId: string;
}