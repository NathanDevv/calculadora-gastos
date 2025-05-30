"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function IngresosPage() {
  const { incomes, deleteIncome } = useContext(ExpenseContext);

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-[#4CAF50] mb-4 dark:text-white">
        Lista de Ingresos
      </h1>

      <p className="text-center text-xl font-semibold text-black dark:text-white mb-8">
        Total de ingresos:{" "}
        <span className="text-[#4CAF50]">${totalIncome.toFixed(2)}</span>
      </p>

      {incomes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No hay ingresos registrados.
        </p>
      ) : (
        <div className="space-y-4">
          {incomes.map((income) => (
            <div
              key={income.id}
              className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800 flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-black dark:text-white">
                  {income.source}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Fecha: {new Date(income.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Frecuencia: {income.frequency}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold text-[#4CAF50]">
                  ${income.amount}
                </p>
                <button
                  onClick={() => deleteIncome(income.id)}
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
