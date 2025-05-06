"use client";
import { createContext, useState, useEffect } from "react";
import { Expense } from "@/types/expense";
import { loadExpenses, saveExpenses } from "@/utils/localStorage";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (e: Omit<Expense, "id">) => void;
  addMultipleExpenses: (data: Expense[]) => void;
  clearExpenses: () => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  addMultipleExpenses: () => {},
  clearExpenses: () => {},
});

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(loadExpenses());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = (e: Omit<Expense, "id">) => {
    setExpenses((prev) => [...prev, { ...e, id: crypto.randomUUID() }]);
  };

  const addMultipleExpenses = (data: Expense[]) => {
    setExpenses((prev) => [...prev, ...data]);
  };

  const clearExpenses = () => {
    setExpenses([]);
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, addMultipleExpenses, clearExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
