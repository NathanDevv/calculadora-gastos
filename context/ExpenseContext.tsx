"use client";
import { createContext, useState, useEffect } from "react";
import { Expense } from "@/types/expense";
import { loadExpenses, saveExpenses } from "@/utils/localStorage";
import { filtrarPorTiempo, FiltroTiempo } from "@/utils/dateFilters";

type Income = {
  source: string;
  amount: number;
  id: string;
  date: string;
  frequency: FiltroTiempo; // Reutilizo el tipo
};

type ExpenseContextType = {
  expenses: Expense[];
  incomes: Income[];
  addExpense: (e: Omit<Expense, "id">) => void;
  addIncome: (e: Omit<Income, "id">) => void;
  addMultipleExpenses: (data: Omit<Expense, "id">[]) => void;
  clearExpenses: () => void;
  clearIncomes: () => void;
  clearAll: () => void;
  deleteExpense: (id: string) => void;
  clearFilteredExpenses: (filtro: FiltroTiempo) => void;
};

export const ExpenseContext = createContext<ExpenseContextType>({
  expenses: [],
  incomes: [],
  addExpense: () => {},
  addIncome: () => {},
  addMultipleExpenses: () => {},
  clearExpenses: () => {},
  clearIncomes: () => {},
  clearAll: () => {},
  deleteExpense: () => {},
  clearFilteredExpenses: () => {},
});

export const ExpenseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    const loadedExpenses = loadExpenses();
    if (loadedExpenses) setExpenses(loadedExpenses);
    const loadedIncomes = localStorage.getItem("incomes");
    if (loadedIncomes) setIncomes(JSON.parse(loadedIncomes));
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
    localStorage.setItem("incomes", JSON.stringify(incomes));
  }, [expenses, incomes]);

  const addExpense = (e: Omit<Expense, "id">) => {
    const newExpense = { ...e, id: crypto.randomUUID() };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const addIncome = (e: Omit<Income, "id">) => {
    const newIncome = { ...e, id: crypto.randomUUID() };
    setIncomes((prev) => [...prev, newIncome]);
  };

  const addMultipleExpenses = (data: Omit<Expense, "id">[]) => {
    const expensesWithId = data.map((expense) => ({
      ...expense,
      id: crypto.randomUUID(),
    }));
    setExpenses((prev) => [...prev, ...expensesWithId]);
  };

  const clearExpenses = () => {
    setExpenses([]);
    saveExpenses([]);
  };

  const clearIncomes = () => {
    setIncomes([]);
    localStorage.setItem("incomes", JSON.stringify([]));
  };

  const clearAll = () => {
    clearExpenses();
    clearIncomes();
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const clearFilteredExpenses = (filtro: FiltroTiempo) => {
    setExpenses((prev) =>
      prev.filter(
        (e) => !filtrarPorTiempo(new Date(e.date), filtro, e.frequency)
      )
    );
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
        clearAll,
        deleteExpense,
        clearFilteredExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
