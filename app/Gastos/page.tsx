"use client";

import ExpenseList from "@/components/ExpenseList";

export default function Gastos() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Gastos</h1>
      <ExpenseList />
    </div>
  );
}
