"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import { Expense, Income, FiltroTiempo } from "@/types/expense";

// Importaciones para la gráfica
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ResumenPage() {
  const { expenses, incomes } = useContext(ExpenseContext);

  const totalExpenses: number = expenses.reduce(
    (sum: number, exp: Expense) => sum + exp.amount,
    0
  );
  const totalIncomes: number = incomes.reduce(
    (sum: number, inc: Income) => sum + inc.amount,
    0
  );
  const balance = totalIncomes - totalExpenses;

  const getByFrequency = (
    items: (Income | Expense)[],
    frequency: FiltroTiempo
  ): number =>
    items
      .filter((item) => item.frequency === frequency)
      .reduce((sum, item) => sum + item.amount, 0);

  // Frecuencias para la gráfica
  const frecuencias: FiltroTiempo[] = ["diario", "semanal", "mensual"];

  // Datos para la gráfica
  const data = frecuencias.map((freq) => ({
    frecuencia: freq.charAt(0).toUpperCase() + freq.slice(1),
    Ingresos: getByFrequency(incomes, freq),
    Egresos: getByFrequency(expenses, freq),
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-white mb-8">
        Resumen Financiero
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-4 bg-white dark:bg-transparent rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Ingresos
          </h2>
          <p className="text-2xl font-bold text-green-500">
            ${totalIncomes.toFixed(2)}
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-transparent  rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Total Egresos
          </h2>
          <p className="text-2xl font-bold text-red-500">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-transparent rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Balance
          </h2>
          <p
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Egresos por Frecuencia
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-900 dark:text-gray-300">
              Diarios: ${getByFrequency(expenses, "diario").toFixed(2)}
            </li>
            <li className="text-gray-900 dark:text-gray-300">
              Semanales: ${getByFrequency(expenses, "semanal").toFixed(2)}
            </li>
            <li className="text-gray-900 dark:text-gray-300">
              Mensuales: ${getByFrequency(expenses, "mensual").toFixed(2)}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Ingresos por Frecuencia
          </h3>
          <ul className="space-y-2">
            <li className="text-gray-600 dark:text-gray-300">
              Diarios: ${getByFrequency(incomes, "diario").toFixed(2)}
            </li>
            <li className="text-gray-600 dark:text-gray-300">
              Semanales: ${getByFrequency(incomes, "semanal").toFixed(2)}
            </li>
            <li className="text-gray-600 dark:text-gray-300">
              Mensuales: ${getByFrequency(incomes, "mensual").toFixed(2)}
            </li>
          </ul>
        </div>
      </div>

      {/* Gráfica de barras */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Ingresos y Egresos por Frecuencia
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="frecuencia" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Ingresos" fill="#34D399" />
            <Bar dataKey="Egresos" fill="#F87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
