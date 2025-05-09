// app/layout.tsx
import "./globals.css";
import { ExpenseProvider } from "@/context/ExpenseContext";
import Header from "@/components/Header";

export const metadata = {
  title: "Calculadora de Gastos",
  description: "Proyecto escolar con React, Tailwind y aleatoriedad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white">
        <ExpenseProvider>
          <Header />
          <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {children}
          </main>
        </ExpenseProvider>
      </body>
    </html>
  );
}
