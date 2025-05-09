"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link"; // Importar Link de Next.js

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);

    // Cambia entre los temas de forma segura
    if (typeof window !== "undefined") {
      document.body.classList.toggle("light", !next); // Aplica o elimina la clase "light"
      localStorage.setItem("theme", next ? "dark" : "light"); // Guarda el estado en localStorage
    }
  };

  // Cargar el tema guardado en localStorage cuando la página se carga
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const useDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setDarkMode(useDark);
    document.body.classList.toggle("light", !useDark); // Aplica el tema guardado al cargar
  }, []);

  const navItems = [
    { name: "Inicio", href: "/" }, // Página de inicio
    { name: "Gastos", href: "/gastos" },
    { name: "Ingreso", href: "/ingreso" },
    { name: "Egreso", href: "/egreso" },
    { name: "Resumen", href: "/resumen" },
    { name: "Simulación", href: "/simulacion" }, // Asegúrate de tener estas páginas en `pages/`
  ];

  return (
    <header className="sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center gap-x-6 w-full">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-[#FF004D] transition font-medium"
            >
              {item.name}
            </Link>
          ))}
          <button
            className="bg-[#FF004D] p-2 rounded-full text-gray-300 hover:text-yellow-400 transition"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden space-x-4 items-center">
          <button onClick={toggleTheme} className="text-gray-300">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={toggleMenu} className="text-gray-300">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-black px-4 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-gray-300 hover:text-[#FF004D]"
              onClick={toggleMenu}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}

      {/* Hero Section */}
      <section
        id="inicio"
        className="py-16 text-center border-t border-[#FF004D]"
      >
        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
          Calculadora de Gastos
        </h1>
        <p className="text-gray-400 text-lg">
          Controla tus finanzas y simula escenarios con estilo
        </p>
      </section>
    </header>
  );
}
