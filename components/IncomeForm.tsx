"use client";

import { useContext, useState } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function IncomeForm() {
  const { addIncome } = useContext(ExpenseContext);
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"diario" | "semanal" | "mensual">(
    "diario"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!source || !amount) return;

    addIncome({
      source,
      amount: parseFloat(amount),
      frequency,
      date: new Date().toISOString(), // Fecha actual en formato ISO
    });

    setSource("");
    setAmount("");
    setFrequency("diario");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-transparent space-y-4"
    >
      <h2 className="text-2xl font-semibold text-[#4CAF50] dark:text-white text-center">
        Añadir nuevo ingreso
      </h2>

      <input
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition"
        placeholder="Fuente de ingreso"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        type="number"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={frequency}
        onChange={(e) =>
          setFrequency(e.target.value as "diario" | "semanal" | "mensual")
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4CAF50] transition"
      >
        <option value="diario">Diario</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </select>

      <button
        type="submit"
        className="w-full bg-[#4CAF50] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.02]"
      >
        Agregar Ingreso
      </button>
    </form>
  );
}
