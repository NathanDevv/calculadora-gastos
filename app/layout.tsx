// app/layout.tsx
import "./globals.css";
import { ExpenseProvider } from "@/context/ExpenseContext";
import { metadata } from "@/app/metadata"; // Importamos metadata desde su archivo

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* El metadata se incluye aquí */}
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>

      <html lang="es">
        <body>
          <ExpenseProvider>
            <div className="min-h-screen">{children}</div>
          </ExpenseProvider>
        </body>
      </html>
    </>
  );
}
