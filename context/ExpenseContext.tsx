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
    const loadedExpenses = loadExpenses(); // cargar los gastos del localStorage
    if (loadedExpenses) {
      setExpenses(loadedExpenses);
    }
  }, []);

  useEffect(() => {
    saveExpenses(expenses); // guardar los gastos cuando cambian
  }, [expenses]);

  const addExpense = (e: Omit<Expense, "id">) => {
    const newExpense = { ...e, id: crypto.randomUUID() };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const addMultipleExpenses = (data: Expense[]) => {
    setExpenses((prev) => [...prev, ...data]);
  };

  const clearExpenses = () => {
    setExpenses([]); // Limpiar el estado y el localStorage
    saveExpenses([]); // Asegúrate de limpiar el localStorage
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, addMultipleExpenses, clearExpenses }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
