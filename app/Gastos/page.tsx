"use client";

import { useState } from "react";
import ExpenseList from "@/components/ExpenseList";

export default function Gastos() {
  const [filtro, setFiltro] = useState<"diario" | "semanal" | "mensual">(
    "diario"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Gastos</h1>

      {/* Botones de filtro */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFiltro("diario")}
          className={`px-4 py-2 rounded-md transition ${
            filtro === "diario"
              ? "bg-pink-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Diarios
        </button>
        <button
          onClick={() => setFiltro("semanal")}
          className={`px-4 py-2 rounded-md transition ${
            filtro === "semanal"
              ? "bg-pink-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Semanales
        </button>
        <button
          onClick={() => setFiltro("mensual")}
          className={`px-4 py-2 rounded-md transition ${
            filtro === "mensual"
              ? "bg-pink-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
        >
          Mensuales
        </button>
      </div>

      {/* Lista de gastos filtrada */}
      <ExpenseList filtro={filtro} />
    </div>
  );
}
