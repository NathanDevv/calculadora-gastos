"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function EgresosPage() {
  const { expenses, deleteExpense } = useContext(ExpenseContext);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#F44336] mb-4 dark:text-white">
        Lista de Egresos
      </h1>

      <p className="text-center text-xl font-semibold text-black dark:text-white mb-8">
        Total de egresos:{" "}
        <span className="text-[#F44336]">${totalExpense.toFixed(2)}</span>
      </p>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No hay egresos registrados.
        </p>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {expense.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Fecha: {new Date(expense.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Frecuencia: {expense.frequency}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-[#F44336]">
                  ${expense.amount}
                </p>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className="text-red-500 hover:text-red-700 font-bold text-lg transition cursor-pointer"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
