import { Expense } from "@/types/expense";

const names = [
  "Comida",
  "Gasolina",
  "Renta",
  "Suscripción",
  "Compra",
  "Regalo",
];

export const generateRandomExpenses = (count = 3): Expense[] => {
  const frequencies = ["diario", "semanal", "mensual", "anual"];
  return Array.from({ length: count }, () => ({
    id: crypto.randomUUID(),
    name: names[Math.floor(Math.random() * names.length)],
    amount: parseFloat((Math.random() * 1000).toFixed(2)),
    date: new Date().toISOString(),
    frequency: frequencies[
      Math.floor(Math.random() * frequencies.length)
    ] as Expense["frequency"],
  }));
};
