import { v4 as uuid } from 'uuid';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    this.transactions.forEach(transaction => {
      income += transaction.type === 'income' ? transaction.value : 0;
      outcome += transaction.type === 'outcome' ? transaction.value : 0;
    });
    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = {
      id: uuid(),
      title,
      type,
      value,
    };
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
