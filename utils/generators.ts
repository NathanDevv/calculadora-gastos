import { Expense } from "@/types/expense"

const names = ["Comida", "Gasolina", "Renta", "Suscripción", "Compra", "Regalo"]

export const generateRandomExpenses = (count = 3): Expense[] => {
  return Array.from({ length: count }, () => ({
    id: crypto.randomUUID(),
    name: names[Math.floor(Math.random() * names.length)],
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
  }))
}
