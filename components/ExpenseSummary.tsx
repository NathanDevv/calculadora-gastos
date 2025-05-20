"use client";
import { useContext } from "react";
import { ExpenseContext } from "@/context/ExpenseContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Chart from "chart.js/auto";

export default function ExpenseSummary() {
  const { expenses, incomes } = useContext(ExpenseContext);

  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const totalIncomes = incomes.reduce((acc, i) => acc + i.amount, 0);
  const total = totalIncomes - totalExpenses;

  const exportToExcel = () => {
    const expenseData = expenses.map((e) => ({
      Tipo: "Gasto",
      Nombre: e.name,
      Monto: -e.amount,
    }));

    const incomeData = incomes.map((i) => ({
      Tipo: "Ingreso",
      Nombre: i.source,
      Monto: i.amount,
    }));

    const allData = [
      ...incomeData,
      ...expenseData,
      { Tipo: "Total", Nombre: "", Monto: total },
    ];

    const resumenSheet = XLSX.utils.json_to_sheet(allData);
    const graficaSheet = XLSX.utils.aoa_to_sheet([
      ["Categoría", "Monto"],
      ["Ingresos", totalIncomes],
      ["Gastos", totalExpenses],
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, resumenSheet, "Resumen");
    XLSX.utils.book_append_sheet(workbook, graficaSheet, "Gráfica");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(fileData, "ResumenFinanciero.xlsx");
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Resumen Financiero", 14, 20);

    const allData = [
      ...incomes.map((i) => ["Ingreso", i.source, `$${i.amount.toFixed(2)}`]),
      ...expenses.map((e) => ["Gasto", e.name, `-$${e.amount.toFixed(2)}`]),
      ["Total", "", `$${total.toFixed(2)}`],
    ];

    autoTable(doc, {
      head: [["Tipo", "Nombre", "Monto"]],
      body: allData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [0, 123, 255] },
    });

    // 🟡 Crear un canvas dinámico para la gráfica
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    document.body.appendChild(canvas); // Necesario para que pinte bien

    // Usamos una promesa para esperar que el gráfico se renderice correctamente
    await new Promise<void>((resolve) => {
      new Chart(canvas, {
        type: "pie",
        data: {
          labels: ["Ingresos", "Egresos"],
          datasets: [
            {
              data: [totalIncomes, totalExpenses],
              backgroundColor: ["#22c55e", "#ef4444"],
            },
          ],
        },
        options: {
          animation: {
            onComplete: () => resolve(), // Resolvemos la promesa solo cuando la animación termina
          },
          responsive: false,
        },
      });
    });

    // 🔁 Convertir canvas a imagen
    const chartImage = canvas.toDataURL("image/png");

    // 🧹 Limpiar el DOM
    document.body.removeChild(canvas);

    doc.addPage();
    doc.setFontSize(14);
    doc.text("Gráfica: Ingresos vs Egresos", 14, 20);
    doc.addImage(chartImage, "PNG", 40, 30, 130, 130);

    doc.save("ResumenFinanciero.pdf");
  };

  return (
    <div className="text-right font-semibold text-black dark:text-white space-y-4">
      <div>Total: ${total.toFixed(2)}</div>

      <div className="flex justify-end gap-2">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Exportar a Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Exportar a PDF
        </button>
      </div>
    </div>
  );
}
