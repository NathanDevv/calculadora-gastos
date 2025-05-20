"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

const randomNames = [
  "Comida",
  "Transporte",
  "Renta",
  "Servicios",
  "Entretenimiento",
  "Salario",
  "Venta",
  "Bonificación",
  "Inversión",
  "Freelance",
];

function getRandomAmount(min: number, max: number) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomName() {
  return randomNames[Math.floor(Math.random() * randomNames.length)];
}

export default function RandomEntryGenerator() {
  const { addExpense, addIncome } = useContext(ExpenseContext);

  const generateRandomExpense = () => {
    const expense = {
      name: getRandomName(),
      amount: getRandomAmount(10, 500),
    };
    addExpense(expense);
  };

  const generateRandomIncome = () => {
    const income = {
      source: getRandomName(),
      amount: getRandomAmount(50, 1000),
    };
    addIncome(income);
  };

  return (
    <div className="mb-6 space-x-4">
      <button
        onClick={generateRandomExpense}
        className="px-4 py-2 bg-[#FF004D] text-white rounded hover:bg-red-700 font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.02]"
      >
        Generar egreso aleatorio
      </button>
      <button
        onClick={generateRandomIncome}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700  font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer transform hover:scale-[1.02]"
      >
        Generar ingreso aleatorio
      </button>
    </div>
  );
}
