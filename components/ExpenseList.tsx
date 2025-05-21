"use client";
import { useContext, useState } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import { filtrarPorTiempo, FiltroTiempo } from "@/utils/dateFilters";

type Transaccion = {
  id: string;
  name?: string;
  source?: string;
  amount: number;
  date: string;
  frequency: string;
};

interface Props {
  filtro: FiltroTiempo;
}

export default function ExpenseList({ filtro }: Props) {
  const {
    expenses,
    incomes,
    clearAll,
    clearFilteredExpenses,
    clearFilteredIncomes,
  } = useContext(ExpenseContext);

  const [showModal, setShowModal] = useState(false);
  const [showEgresosModal, setShowEgresosModal] = useState(false);
  const [showIngresosModal, setShowIngresosModal] = useState(false);

  const filtrarTransacciones = (fechaString: string, frecuencia: string) => {
    const fecha = new Date(fechaString);
    return filtrarPorTiempo(fecha, filtro, frecuencia as FiltroTiempo);
  };

  // Filtrar y ordenar
  const egresosFiltrados = expenses
    .filter((e: Transaccion) => filtrarTransacciones(e.date, e.frequency))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const ingresosFiltrados = incomes
    .filter((i: Transaccion) => filtrarTransacciones(i.date, i.frequency))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Botones para exportar

  // Limpieza
  const handleClearAll = () => {
    clearAll();
    setShowModal(false);
  };

  const handleClearFilteredEgresos = () => {
    clearFilteredExpenses(filtro);
    setShowEgresosModal(false);
  };

  const handleClearFilteredIngresos = () => {
    clearFilteredIncomes(filtro);
    setShowIngresosModal(false);
  };

  // Totales
  const totalIngresos = ingresosFiltrados.reduce((sum, i) => sum + i.amount, 0);
  const totalEgresos = egresosFiltrados.reduce((sum, e) => sum + e.amount, 0);
  const totalNeto = totalIngresos - totalEgresos;

  return (
    <div>
      {/* Modal borrar TODO */}
      {showModal && (
        <div
          role="dialog"
          aria-labelledby="modal-title-all"
          className="fixed inset-0 flex items-center justify-center bg-white/40 dark:bg-black/70 dark:backdrop-blur-sm z-50"
        >
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 id="modal-title-all" className="text-lg font-bold mb-4">
              ¿Estás seguro?
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Esta acción eliminará <strong>todos</strong> los ingresos y
              egresos.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Sí, borrar todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal borrar egresos */}
      {showEgresosModal && (
        <div
          role="dialog"
          aria-labelledby="modal-title-egresos"
          className="fixed inset-0 flex items-center justify-center bg-white/40 dark:bg-black/70 dark:backdrop-blur-sm z-50"
        >
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 id="modal-title-egresos" className="text-lg font-bold mb-4">
              ¿Eliminar egresos {filtro}?
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Esta acción eliminará todos los egresos filtrados.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEgresosModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearFilteredEgresos}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Sí, borrar egresos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal borrar ingresos */}
      {showIngresosModal && (
        <div
          role="dialog"
          aria-labelledby="modal-title-ingresos"
          className="fixed inset-0 flex items-center justify-center bg-white/40 dark:bg-black/70 dark:backdrop-blur-sm z-50"
        >
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 id="modal-title-ingresos" className="text-lg font-bold mb-4">
              ¿Eliminar ingresos {filtro}?
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Esta acción eliminará todos los ingresos filtrados.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowIngresosModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearFilteredIngresos}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Sí, borrar ingresos
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botones exportar */}
      <div className="flex gap-4 mb-4"></div>

      {/* Egresos */}
      <h3 className="font-semibold text-lg text-[#FF004D]">Egresos</h3>
      <ul className="space-y-2 mb-2">
        {egresosFiltrados.length === 0 && (
          <li className="text-sm text-gray-500">No hay egresos {filtro}.</li>
        )}
        {egresosFiltrados.map((e) => (
          <li
            key={e.id}
            className="flex justify-between items-center border p-2 rounded bg-red-100 text-black"
          >
            <span>{e.name}</span>
            <span className="text-red-600 font-semibold">
              ${e.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowEgresosModal(true)}
        className="px-3 py-1 mb-4 bg-red-600 text-white rounded hover:bg-red-700"
        disabled={egresosFiltrados.length === 0}
      >
        Borrar egresos {filtro}
      </button>

      {/* Ingresos */}
      <h3 className="font-semibold text-lg text-green-600">Ingresos</h3>
      <ul className="space-y-2 mb-2">
        {ingresosFiltrados.length === 0 && (
          <li className="text-sm text-gray-500">No hay ingresos {filtro}.</li>
        )}
        {ingresosFiltrados.map((i) => (
          <li
            key={i.id}
            className="flex justify-between items-center border p-2 rounded bg-green-100 text-black"
          >
            <span>{i.source}</span>
            <span className="text-green-600 font-semibold">
              ${i.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setShowIngresosModal(true)}
        className="px-3 py-1 mb-4 bg-green-600 text-white rounded hover:bg-green-700"
        disabled={ingresosFiltrados.length === 0}
      >
        Borrar ingresos {filtro}
      </button>

      {/* Totales */}
      <div className="border-t pt-4">
        <p className="text-lg font-semibold">
          Total Ingresos: ${totalIngresos.toFixed(2)}
        </p>
        <p className="text-lg font-semibold">
          Total Egresos: ${totalEgresos.toFixed(2)}
        </p>
        <p
          className={`text-xl font-bold ${
            totalNeto >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          Neto: ${totalNeto.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
