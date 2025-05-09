export type Expense = {
  id: string;
  name: string;
  amount: number;
};

export type Income = {
  id: string;
  name: string;
  amount: number;
};

export type ExpenseContextType = {
  expenses: Expense[];
  incomes: Income[];
  addExpense: (expense: Expense) => void;
  addIncome: (income: Income) => void;
};
