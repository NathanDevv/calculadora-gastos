"use client";

import { useContext, useState } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext);

  const [frequency, setFrequency] = useState<"diario" | "semanal" | "mensual">(
    "diario"
  );
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    const today = new Date().toISOString().split("T")[0]; // fecha actual en formato ISO simple

    addExpense({
      name,
      amount: parseFloat(amount),
      frequency,
      date: today,
    });

    setName("");
    setAmount("");
    setFrequency("diario");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-transparent space-y-4"
    >
      <h2 className="text-2xl font-semibold text-[#FF004D] dark:text-white text-center">
        Añadir nuevo egreso
      </h2>

      <input
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF004D] transition"
        placeholder="Nombre del egreso"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF004D] transition"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={frequency}
        onChange={(e) =>
          setFrequency(e.target.value as "diario" | "semanal" | "mensual")
        }
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-transparent text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FF004D] transition"
      >
        <option value="diario">Diario</option>
        <option value="semanal">Semanal</option>
        <option value="mensual">Mensual</option>
      </select>

      <button
        type="submit"
        className="w-full bg-[#FF004D] text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.02]"
      >
        Agregar Egreso
      </button>
    </form>
  );
}
