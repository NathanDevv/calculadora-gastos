"use client";

import ExpenseForm from "@/components/ExpenseForm";
import IncomeForm from "@/components/IncomeForm";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseList from "@/components/ExpenseList"; // Importamos la lista de gastos e ingresos

export default function Home() {
  return (
    <main className="text-gray-900 dark:text-white min-h-screen space-y-16">
      {/* Sección de bienvenida */}
      <section className="py-24 px-4 text-center bg-white dark:bg-transparent">
        <h1 className="text-4xl font-bold mb-4 text-[#FF004D]">
          Bienvenido a tu Calculadora de Gastos e Ingresos
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Esta aplicación te permite registrar tus ingresos y egresos,
          visualizar un resumen financiero y simular escenarios para mejorar tu
          control financiero personal o familiar.
        </p>
      </section>

      {/* Sección de ejemplo */}
      <section className="py-12 px-4 rounded-xl shadow-md max-w-3xl mx-auto bg-zinc-100 dark:bg-transparent">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF004D]">
          🔍 Ejemplo de uso
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Imagina que ganas $10,000 al mes. Ingresas tus ingresos, después
          agregas tus gastos como renta, comida, transporte, y la app te
          mostrará cuánto te queda, además de una gráfica con la proporción de
          cada categoría.
        </p>
        <p className="text-sm text-gray-400 italic">
          * Esta es una simulación, los datos reales se ingresan abajo.
        </p>
      </section>

      {/* Sección de formularios */}
      <section
        id="gastos-ingresos"
        className="py-24 px-4 space-y-8 flex flex-col lg:flex-row lg:space-x-4"
      >
        <div className="flex-1">
          <ExpenseForm />
        </div>
        <div className="flex-1">
          <IncomeForm />
        </div>
      </section>

      {/* Sección de resumen */}
      <section className="py-12 px-4 rounded-xl shadow-md max-w-3xl mx-auto bg-zinc-100 dark:bg-transparent">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF004D]">
          💰 Resumen Financiero
        </h2>
        <ExpenseSummary /> {/* Aquí se muestra el total */}
      </section>

      {/* Sección de lista de gastos e ingresos */}
      <section className="py-12 px-4 rounded-xl shadow-md max-w-3xl mx-auto bg-zinc-100 dark:bg-transparent">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF004D]">
          📝 Historial de Ingresos y Egresos
        </h2>
        <ExpenseList /> {/* Aquí se muestra la lista */}
      </section>
    </main>
  );
}
