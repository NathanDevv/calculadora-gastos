export type FiltroTiempo = "diario" | "semanal" | "mensual" | string;

export const filtrarPorTiempo = (
  fecha: Date,
  filtro: FiltroTiempo,
  frecuencia: FiltroTiempo
): boolean => {
  const today = new Date();

  if (filtro === "diario") {
    const fechaStr = fecha.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];
    return fechaStr === todayStr;
  }

  if (filtro === "semanal") {
    if (frecuencia !== "semanal") return false;

    const primerDiaSemana = new Date(today);
    primerDiaSemana.setDate(today.getDate() - today.getDay());
    primerDiaSemana.setHours(0, 0, 0, 0);

    const ultimoDiaSemana = new Date(primerDiaSemana);
    ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);
    ultimoDiaSemana.setHours(23, 59, 59, 999);

    return fecha >= primerDiaSemana && fecha <= ultimoDiaSemana;
  }

  if (filtro === "mensual") {
    return (
      frecuencia === "mensual" &&
      fecha.getMonth() === today.getMonth() &&
      fecha.getFullYear() === today.getFullYear()
    );
  }

  return true; // Default muestra todo
};
