import type { Transaction } from './Transaction';

export type Shop = {
  amount: number;
  shop_name: string;
  transactions: Transaction[];
};