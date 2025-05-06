"use client";
import { useContext, useState } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseForm() {
  const { addExpense } = useContext(ExpenseContext);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;
    addExpense({ name, amount: parseFloat(amount) });
    setName("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="input"
        placeholder="Nombre del gasto"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        type="number"
        placeholder="Monto"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Agregar Gasto
      </button>
    </form>
  );
}
