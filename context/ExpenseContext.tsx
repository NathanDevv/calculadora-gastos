"use client";
import { createContext, useState, useEffect } from "react";
import { Expense } from "@/types/expense";
import { loadExpenses, saveExpenses } from "@/utils/localStorage";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (e: Omit<Expense, "id">) => void;
  addMultipleExpenses: (data: Expense[]) => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  addExpense: () => {},
  addMultipleExpenses: () => {},
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

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, addMultipleExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
