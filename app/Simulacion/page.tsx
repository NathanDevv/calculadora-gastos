"use client";
import { useState } from "react";
import { simulateDailyCashFlow } from "@/utils/mathModels";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
} from "recharts";

export default function SimulacionFinanciera() {
  const [baseIncome, setBaseIncome] = useState(1000);
  const [baseExpense, setBaseExpense] = useState(700);
  const [variability, setVariability] = useState(0.2);
  const [days, setDays] = useState(30);
  const [data, setData] = useState<
    {
      day: number;
      income: number;
      expense: number;
      balance: number;
      cumulativeBalance: number;
    }[]
  >([]);

  const handleSimulate = () => {
    const incomes = simulateDailyCashFlow(baseIncome, variability, days);
    const expenses = simulateDailyCashFlow(baseExpense, variability, days);

    let cumulative = 0;
    const dataSim = incomes.map((inc, i) => {
      const exp = expenses[i];
      const balance = inc - exp;
      cumulative += balance;
      return {
        day: i + 1,
        income: inc,
        expense: exp,
        balance,
        cumulativeBalance: cumulative,
      };
    });

    setData(dataSim);
  };

  // Datos resumidos para mostrar
  const totalIncome = data.reduce((acc, d) => acc + d.income, 0);
  const totalExpense = data.reduce((acc, d) => acc + d.expense, 0);
  const finalBalance =
    data.length > 0 ? data[data.length - 1].cumulativeBalance : 0;
  const avgBalance = data.length > 0 ? finalBalance / data.length : 0;

  return (
    <div className="max-w-5xl mx-auto p-6  shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700">
        Simulación Financiera - Flujo Diario
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Ingreso base diario",
            value: baseIncome,
            setter: setBaseIncome,
            min: 0,
          },
          {
            label: "Egreso base diario",
            value: baseExpense,
            setter: setBaseExpense,
            min: 0,
          },
          {
            label: "Variabilidad (%)",
            value: variability * 100,
            setter: (v: number) => setVariability(v / 100),
            min: 0,
            max: 100,
            step: 0.1,
          },
          {
            label: "Días a simular",
            value: days,
            setter: setDays,
            min: 1,
            max: 365,
          },
        ].map(({ label, value, setter, min, max, step }, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">{label}</label>
            <input
              type="number"
              min={min}
              max={max}
              step={step ?? 1}
              value={value}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (min !== undefined) val = Math.max(val, min);
                if (max !== undefined) val = Math.min(val, max);
                setter(val);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSimulate}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md transition"
      >
        Ejecutar Simulación
      </button>

      {data.length > 0 && (
        <>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-transparent rounded-md shadow-lg">
              <p className="text-lg font-medium text-green-700">
                Ingresos Totales
              </p>
              <p className="text-2xl font-bold">${totalIncome.toFixed(2)}</p>
            </div>
            <div className="p-4 bg-transparent rounded-md shadow-lg">
              <p className="text-lg font-medium text-red-700">
                Egresos Totales
              </p>
              <p className="text-2xl font-bold">${totalExpense.toFixed(2)}</p>
            </div>
            <div
              className={`p-4 rounded-md shadow-inner ${
                finalBalance >= 0
                  ? "p-4 bg-transparent rounded-md shadow-lg"
                  : "p-4 bg-transparent rounded-md shadow-lg"
              }`}
            >
              <p className="text-lg font-medium ">Balance Final</p>
              <p className="text-2xl font-bold">${finalBalance.toFixed(2)}</p>
              <p className="text-sm italic">
                Promedio diario: ${avgBalance.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="mt-10 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                <XAxis
                  dataKey="day"
                  label={{
                    value: "Día",
                    position: "insideBottomRight",
                    offset: -5,
                    fill: "#555",
                  }}
                  tick={{ fill: "#555" }}
                />
                <YAxis
                  label={{
                    value: "Monto ($)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#555",
                  }}
                  tick={{ fill: "#555" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: 8,
                    borderColor: "#ccc",
                  }}
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                />
                <Legend verticalAlign="top" height={36} />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#22c55e"
                  fill="#dcfce7"
                  name="Ingresos"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  fill="#fee2e2"
                  name="Egresos"
                  fillOpacity={0.3}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Balance Diario"
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeBalance"
                  stroke="#1e40af"
                  strokeDasharray="5 5"
                  name="Balance Acumulado"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
