export interface SavingGoal {
  _id?: string;
  name: string;
  targetAmount: number;
  currency: 'RON' | 'EUR';
  userId: string;
}