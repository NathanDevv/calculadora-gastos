"use client";

import { ExpenseProvider } from "@/context/ExpenseContext";
import Layout from "@/app/layout";
import Header from "@/components/Header";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseSummary from "@/components/ExpenseSummary";
import SimulationControls from "@/components/SimulationControls";

export default function Home() {
  return (
    <ExpenseProvider>
      {" "}
      {/* Aquí estamos envolviendo todos los componentes con ExpenseProvider */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <Layout>
          <Header />
          <ExpenseForm />
          <SimulationControls />
          <ExpenseList />
          <ExpenseSummary />
        </Layout>
      </main>
    </ExpenseProvider>
  );
}
