export type FiltroTiempo = "diario" | "semanal" | "mensual" | string;

/**
 * Esta función filtra una fecha según el tipo de filtro de tiempo y la frecuencia del evento.
 * @param fecha - La fecha del evento o actividad.
 * @param filtro - El filtro que el usuario eligió (diario, semanal, mensual).
 * @param frecuencia - La frecuencia asignada al evento (para que coincida con el filtro).
 * @returns booleano indicando si el evento pasa el filtro.
 */
export const filtrarPorTiempo = (
  fecha: Date,
  filtro: FiltroTiempo,
  frecuencia: FiltroTiempo
): boolean => {
  const today = new Date(); // Fecha actual

  // ✅ FILTRO DIARIO
  if (filtro === "diario") {
    if (frecuencia !== "diario") return false; // Si no coincide la frecuencia, no lo mostramos

    // Comparamos solo el día, mes y año
    const fechaStr = fecha.toISOString().split("T")[0];
    const todayStr = today.toISOString().split("T")[0];
    return fechaStr === todayStr;
  }

  // ✅ FILTRO SEMANAL
  if (filtro === "semanal") {
    if (frecuencia !== "semanal") return false;

    // Calculamos el primer día de esta semana (domingo)
    const primerDiaSemana = new Date(today);
    primerDiaSemana.setDate(today.getDate() - today.getDay());
    primerDiaSemana.setHours(0, 0, 0, 0);

    // Calculamos el último día de esta semana (sábado)
    const ultimoDiaSemana = new Date(primerDiaSemana);
    ultimoDiaSemana.setDate(primerDiaSemana.getDate() + 6);
    ultimoDiaSemana.setHours(23, 59, 59, 999);

    // Comprobamos si la fecha cae dentro de esta semana
    return fecha >= primerDiaSemana && fecha <= ultimoDiaSemana;
  }

  // ✅ FILTRO MENSUAL
  if (filtro === "mensual") {
    // Solo si también es un evento de frecuencia mensual
    return (
      frecuencia === "mensual" &&
      fecha.getMonth() === today.getMonth() &&
      fecha.getFullYear() === today.getFullYear()
    );
  }

  // ✅ Si no se selecciona ningún filtro válido, se muestran todos
  return true;
};
