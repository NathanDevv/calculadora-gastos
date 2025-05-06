"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseSummary() {
  const { expenses } = useContext(ExpenseContext);
  const total = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <div className="text-right font-semibold">Total: ${total.toFixed(2)}</div>
  );
}
