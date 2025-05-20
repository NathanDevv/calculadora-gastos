export type FiltroTiempo = "diario" | "semanal" | "mensual" | string;

export type Expense = {
  name: string;
  amount: number;
  date: string;
  frequency: FiltroTiempo; // Ahora sí existe el tipo
  id: string;
};

export type Income = {
  id: string;
  source: string;
  amount: number;
  date: string;
  frequency: FiltroTiempo;
};

export type ExpenseContextType = {
  expenses: Expense[];
  incomes: Income[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  addIncome: (income: Omit<Income, "id">) => void;
  addMultipleExpenses: (data: Omit<Expense, "id">[]) => void;
  clearExpenses: () => void;
  clearIncomes: () => void;
  clearAll: () => void;
  deleteExpense: (id: string) => void;
  clearFilteredExpenses: (filtro: FiltroTiempo) => void;
};
