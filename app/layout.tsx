import { ExpenseProvider } from "@/context/ExpenseContext";
import "./globals.css";

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
      <body className="bg-black text-white min-h-screen font-sans">
        <ExpenseProvider>{children}</ExpenseProvider>
      </body>
    </html>
  );
}
