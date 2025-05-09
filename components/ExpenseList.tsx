"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseList() {
  const { expenses, incomes } = useContext(ExpenseContext);

  return (
    <div>
      {/* Lista de egresos */}
      <h3 className="font-semibold text-lg text-[#FF004D]">Egresos</h3>
      <ul className="space-y-2 mb-6">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex justify-between border p-2 rounded bg-red-100"
          >
            <span>{e.name}</span>
            <span className="text-red-600">${e.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Lista de ingresos */}
      <h3 className="font-semibold text-lg text-[#4CAF50]">Ingresos</h3>
      <ul className="space-y-2">
        {incomes.map((i) => (
          <li
            key={i.id}
            className="flex justify-between border p-2 rounded bg-green-100"
          >
            <span>{i.source}</span>
            <span className="text-green-600">${i.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
