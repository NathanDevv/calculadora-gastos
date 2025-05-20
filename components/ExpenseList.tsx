"use client";
import { useContext, useState } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseList() {
  const { expenses, incomes, clearAll } = useContext(ExpenseContext);
  const [showModal, setShowModal] = useState(false);

  const handleClearAll = () => {
    clearAll();
    setShowModal(false);
  };

  return (
    <div>
      {/* Modal */}
      {showModal && (
        <div
          className="
            fixed inset-0 flex items-center justify-center 
            bg-white/40 dark:bg-black/70 dark:backdrop-blur-sm 
            z-50
          "
        >
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">¿Estás seguro?</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Esta acción eliminará todos los ingresos y egresos. ¿Deseas
              continuar?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="
                  px-4 py-2 rounded 
                  bg-gray-200 dark:bg-gray-700 
                  text-black dark:text-white 
                  hover:bg-gray-300 dark:hover:bg-gray-600 
                  transition
                "
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                className="
                  px-4 py-2 rounded 
                  bg-red-600 text-white 
                  hover:bg-red-700 
                  dark:bg-red-400 dark:text-black dark:hover:bg-red-500 
                  transition
                "
              >
                Sí, borrar todo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de egresos */}
      <h3 className="font-semibold text-lg text-[#FF004D]">Egresos</h3>
      <ul className="space-y-2 mb-6">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex justify-between border p-2 rounded bg-red-100"
          >
            <span>{e.name}</span>
            <span className="text-red-600">${e.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Lista de ingresos */}
      <h3 className="font-semibold text-lg text-[#4CAF50]">Ingresos</h3>
      <ul className="space-y-2 mb-4">
        {incomes.map((i) => (
          <li
            key={i.id}
            className="flex justify-between border p-2 rounded bg-green-100"
          >
            <span>{i.source}</span>
            <span className="text-green-600">${i.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>

      {/* Botón fuera de la lista */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Borrar todos los ingresos y egresos
      </button>
    </div>
  );
}
