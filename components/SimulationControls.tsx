"use client";
import { useContext, useMemo } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import { generateRandomExpenses } from "@/utils/generators";
import * as XLSX from "xlsx";

export default function SimulationControls({
  filtro,
}: {
  filtro: "diario" | "semanal" | "mensual";
}) {
  const { expenses, addMultipleExpenses, clearFilteredExpenses } =
    useContext(ExpenseContext);

  // Memoizar la fecha de hoy para que no se recalcule cada vez
  const today = useMemo(() => new Date(), []);

  const filtrarPorTiempo = (fechaString: string) => {
    const fecha = new Date(fechaString);

    if (filtro === "diario") {
      return (
        fecha.getDate() === today.getDate() &&
        fecha.getMonth() === today.getMonth() &&
        fecha.getFullYear() === today.getFullYear()
      );
    }

    if (filtro === "semanal") {
      const primerDiaSemana = new Date(today);
      primerDiaSemana.setDate(today.getDate() - today.getDay());
      const ultimoDiaSemana = new Date(primerDiaSemana);
      ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);

      return fecha >= primerDiaSemana && fecha <= ultimoDiaSemana;
    }

    if (filtro === "mensual") {
      return (
        fecha.getMonth() === today.getMonth() &&
        fecha.getFullYear() === today.getFullYear()
      );
    }

    return true;
  };

  const gastosFiltrados = expenses.filter((gasto) =>
    filtrarPorTiempo(gasto.date)
  );

  // Opcional: formatear fecha para Excel
  const gastosParaExcel = gastosFiltrados.map((gasto) => ({
    ...gasto,
    date: new Date(gasto.date).toLocaleDateString(), // o formato que prefieras
  }));

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(gastosParaExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gastos Filtrados");
    XLSX.writeFile(workbook, `gastos_${filtro}.xlsx`);
  };

  const handleClearFilteredExpenses = () => {
    clearFilteredExpenses(filtro);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 space-y-3 ">
      <button
        className="w-full bg-[#FF004D] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#5a3241] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        onClick={() => addMultipleExpenses(generateRandomExpenses(5))}
      >
        Simular Gastos Aleatorios
      </button>

      <button
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        onClick={handleExportExcel}
      >
        Exportar gastos {filtro} a Excel
      </button>

      <button
        className="w-full bg-zinc-700 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
        onClick={handleClearFilteredExpenses}
      >
        Eliminar gastos {filtro}
      </button>
    </div>
  );
}
