export type FiltroTiempo = "diario" | "semanal" | "mensual" | string;

/**
 * Limpia las horas de una fecha (deja solo año, mes, día a las 00:00:00.000)
 * @param fecha - Fecha a limpiar
 * @returns Fecha sin hora
 */
const limpiarHoras = (fecha: Date): Date => {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setHours(0, 0, 0, 0);
  return nuevaFecha;
};

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
  const today = new Date();

  if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
    console.warn("Fecha inválida recibida:", fecha);
    return false;
  }

  const filtrosValidos = ["diario", "semanal", "mensual"];
  if (!filtrosValidos.includes(filtro)) {
    console.warn(`Filtro no válido: ${filtro}. Mostrando todo por defecto.`);
    return true;
  }

  // ✅ FILTRO DIARIO
  if (filtro === "diario") {
    if (frecuencia !== "diario") return false;
    return limpiarHoras(fecha).getTime() === limpiarHoras(today).getTime();
  }

  // ✅ FILTRO SEMANAL
  if (filtro === "semanal") {
    if (frecuencia !== "semanal") return false;

    const inicioSemana = limpiarHoras(new Date(today));
    inicioSemana.setDate(today.getDate() - today.getDay());

    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    finSemana.setHours(23, 59, 59, 999);

    return fecha >= inicioSemana && fecha <= finSemana;
  }

  // ✅ FILTRO MENSUAL
  if (filtro === "mensual") {
    return (
      frecuencia === "mensual" &&
      fecha.getMonth() === today.getMonth() &&
      fecha.getFullYear() === today.getFullYear()
    );
  }

  // ✅ Si no se selecciona ningún filtro válido, se muestran todos
  return true;
};
