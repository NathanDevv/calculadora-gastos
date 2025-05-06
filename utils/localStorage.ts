import { Expense } from "@/types/expense"

const KEY = "expenses"

export const saveExpenses = (data: Expense[]) => {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export const loadExpenses = (): Expense[] => {
  const stored = localStorage.getItem(KEY)
  return stored ? JSON.parse(stored) : []
}
