"use client";

import { useContext, useState } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;
    addExpense({ name, amount: parseFloat(amount) });
    setName("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-zinc-900 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-[#FF004D] dark:text-white text-center">
        Añadir nuevo gasto
      </h2>

      <input
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF004D] transition"
        placeholder="Nombre del gasto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gra-50 dark:bg-zinc-800 text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF004D] transition"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-[#FF004D] text-white py-2 px-4 rounded-lg font-semibold  transition-all duration-300 shadow-md hover:shadow-lg 
             cursor-pointer transform hover:scale-[1.02]"
      >
        Agregar Gasto
      </button>
    </form>
  );
}
