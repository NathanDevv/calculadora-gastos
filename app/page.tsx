"use client";

import ExpenseForm from "@/components/ExpenseForm";
import IncomeForm from "@/components/IncomeForm";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseList from "@/components/ExpenseList";
import RandomEntryGenerator from "@/components/RandomEntryGenerator";

export default function Home() {
  return (
    <main className="text-gray-900 dark:text-white min-h-screen space-y-16">
      {/* ... sección bienvenida ... */}

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

      {/* Aquí está el botón abajo, fuera del contenedor */}
      <div className="max-w-3xl mx-auto px-4 py-6 justify-center flex space-x-4">
        <RandomEntryGenerator />
      </div>

      {/* ... resto de secciones (formularios, listas, resumen) ... */}
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

      <section className="py-12 px-4 rounded-xl shadow-md max-w-3xl mx-auto bg-zinc-100 dark:bg-transparent">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF004D]">
          📝 Historial de Ingresos y Egresos
        </h2>
        <ExpenseList />
      </section>

      <section className="py-12 px-4 rounded-xl shadow-md max-w-3xl mx-auto bg-zinc-100 dark:bg-transparent">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF004D]">
          💰 Resumen Financiero
        </h2>
        <ExpenseSummary />
      </section>
    </main>
  );
}
