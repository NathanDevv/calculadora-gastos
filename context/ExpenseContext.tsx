"use client";
import { createContext, useState, useEffect } from "react";
import { Expense } from "@/types/expense"; // Si utilizas el mismo tipo para los ingresos, lo puedes dejar así
import { loadExpenses, saveExpenses } from "@/utils/localStorage";

type Income = {
  source: string;
  amount: number;
  id: string;
};

type ExpenseContextType = {
  expenses: Expense[];
  incomes: Income[];
  addExpense: (e: Omit<Expense, "id">) => void;
  addIncome: (e: Omit<Income, "id">) => void;
  addMultipleExpenses: (data: Expense[]) => void;
  clearExpenses: () => void;
  clearIncomes: () => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  incomes: [],
  addExpense: () => {},
  addIncome: () => {},
  addMultipleExpenses: () => {},
  clearExpenses: () => {},
  clearIncomes: () => {},
});

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    const loadedExpenses = loadExpenses(); // cargar los gastos del localStorage
    if (loadedExpenses) {
      setExpenses(loadedExpenses);
    }
    // Puedes cargar ingresos desde localStorage si lo prefieres
    const loadedIncomes = localStorage.getItem("incomes");
    if (loadedIncomes) {
      setIncomes(JSON.parse(loadedIncomes));
    }
  }, []);

  useEffect(() => {
    saveExpenses(expenses); // guardar los gastos cuando cambian
    localStorage.setItem("incomes", JSON.stringify(incomes)); // guardar los ingresos en localStorage
  }, [expenses, incomes]);

  const addExpense = (e: Omit<Expense, "id">) => {
    const newExpense = { ...e, id: crypto.randomUUID() };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const addIncome = (e: Omit<Income, "id">) => {
    const newIncome = { ...e, id: crypto.randomUUID() };
    setIncomes((prev) => [...prev, newIncome]);
  };

  const addMultipleExpenses = (data: Expense[]) => {
    setExpenses((prev) => [...prev, ...data]);
  };

  const clearExpenses = () => {
    setExpenses([]); // Limpiar los gastos
    saveExpenses([]); // Limpiar el localStorage
  };

  const clearIncomes = () => {
    setIncomes([]); // Limpiar los ingresos
    localStorage.setItem("incomes", JSON.stringify([])); // Limpiar los ingresos en localStorage
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        incomes,
        addExpense,
        addIncome,
        addMultipleExpenses,
        clearExpenses,
        clearIncomes,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
