"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseSummary() {
  const { expenses, incomes } = useContext(ExpenseContext);

  // Calcular el total de los egresos
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);

  // Calcular el total de los ingresos
  const totalIncomes = incomes.reduce((acc, i) => acc + i.amount, 0);

  // Calcular el total combinado
  const total = totalIncomes - totalExpenses;

  return (
    <div className="text-right font-semibold text-black dark:text-white">
      Total: ${total.toFixed(2)}
    </div>
  );
}
