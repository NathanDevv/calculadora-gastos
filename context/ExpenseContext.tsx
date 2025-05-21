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
  frequency: FiltroTiempo;
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
  clearFilteredIncomes: (filtro: FiltroTiempo) => void;
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
  clearFilteredIncomes: () => {},
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
    const updatedExpenses = expenses.filter((e) => e.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const clearFilteredExpenses = (filtro: FiltroTiempo) => {
    const updated = expenses.filter((e) => {
      const date = new Date(e.date);
      return !filtrarPorTiempo(date, filtro, e.frequency);
    });
    setExpenses(updated);
    saveExpenses(updated);
  };

  const clearFilteredIncomes = (filtro: FiltroTiempo) => {
    const updated = incomes.filter((i) => {
      const date = new Date(i.date);
      return !filtrarPorTiempo(date, filtro, i.frequency);
    });
    setIncomes(updated);
    localStorage.setItem("incomes", JSON.stringify(updated));
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
        clearFilteredIncomes,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
