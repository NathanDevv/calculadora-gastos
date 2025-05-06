"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";

export default function ExpenseList() {
  const { expenses } = useContext(ExpenseContext);

  return (
    <ul className="space-y-1">
      {expenses.map((e) => (
        <li
          key={e.id}
          className="flex justify-between border p-2 rounded bg-white"
        >
          <span>{e.name}</span>
          <span>${e.amount}</span>
        </li>
      ))}
    </ul>
  );
}
