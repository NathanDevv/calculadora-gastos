"use client";

import { useState, useContext } from "react";
import ExpenseList from "@/components/ExpenseList";
import { ExpenseContext } from "@/context/ExpenseContext";
import { exportToExcel, exportToPDF } from "@/helpers/exportHelpers";

export default function Gastos() {
  const [filtro, setFiltro] = useState<"diario" | "semanal" | "mensual">(
    "diario"
  );

  const { expenses, incomes } = useContext(ExpenseContext);

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

      {/* Botones de exportación */}

      {/* Lista de gastos filtrada */}
      <ExpenseList filtro={filtro} />
      <div className="flex gap-2 mb-4 mt-5">
        <button
          onClick={() => exportToExcel(expenses, incomes)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Exportar a Excel
        </button>
        <button
          onClick={() => exportToPDF(expenses, incomes)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
}
