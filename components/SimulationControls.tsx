"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext"; // Importa el contexto
import { generateRandomExpenses } from "@/utils/generators"; // Asumiendo que tienes una función para generar gastos aleatorios
import * as XLSX from "xlsx";

export default function SimulationControls() {
  const { expenses, addMultipleExpenses, clearExpenses } =
    useContext(ExpenseContext); // Usamos solo las funciones necesarias

  const handleSimulate = () => {
    const fakeData = generateRandomExpenses(5);
    addMultipleExpenses(fakeData); // Añadimos los gastos generados al estado
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(expenses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos");
    XLSX.writeFile(workbook, "gastos.xlsx");
  };

  const handleClearExpenses = () => {
    clearExpenses(); // Limpiar los gastos
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 space-y-3 ">
      <button
        className="w-full bg-[#FF004D] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#5a3241] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        onClick={handleSimulate}
      >
        Simular Gastos Aleatorios
      </button>

      <button
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        onClick={handleExportExcel}
      >
        Exportar a Excel
      </button>

      <button
        className="w-full bg-zinc-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        onClick={handleClearExpenses}
      >
        Eliminar todos los gastos
      </button>
    </div>
  );
}
