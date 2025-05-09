// utils/localStorage.ts
import { Expense } from "@/types/expense";

const KEY = "expenses";

export const saveExpenses = (data: Expense[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(data));
  }
};

export const loadExpenses = (): Expense[] => {
  if (typeof window === "undefined") return []; // Evita errores en SSR
  const stored = localStorage.getItem(KEY);
  return stored ? JSON.parse(stored) : [];
};
