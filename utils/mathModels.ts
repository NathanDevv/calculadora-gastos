// mathModels.ts

// Simulación de ingresos o egresos diarios con variabilidad
export const simulateDailyCashFlow = (
  baseAmount: number,
  variability: number, // Ejemplo: 0.2 para +-20%
  days: number
): number[] => {
  const results = [];
  for (let i = 0; i < days; i++) {
    // Genera un factor aleatorio entre [1 - variability, 1 + variability]
    const randomFactor = 1 + (Math.random() * 2 - 1) * variability;
    results.push(baseAmount * randomFactor);
  }
  return results;
};

// Ya tienes tu logisticMap también
export const logisticMap = (
  r: number,
  x0: number,
  iterations: number
): number[] => {
  const results = [x0];
  for (let i = 1; i < iterations; i++) {
    results.push(r * results[i - 1] * (1 - results[i - 1]));
  }
  return results;
};
