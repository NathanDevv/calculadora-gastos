"use client";
import { useContext } from "react";
import { generateRandomExpenses } from "@/utils/generators";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function SimulationControls() {
  const { addMultipleExpenses } = useContext(ExpenseContext);

  const handleSimulate = () => {
    const fakeData = generateRandomExpenses(5); // puedes variar el número
    addMultipleExpenses(fakeData);
  };

  return (
    <button className="btn-secondary" onClick={handleSimulate}>
      Simular Gastos Aleatorios
    </button>
  );
}
