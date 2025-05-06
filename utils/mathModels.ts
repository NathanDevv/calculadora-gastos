// Ejemplo: mapa logístico (modelo caótico simple)
export const logisticMap = (r: number, x0: number, iterations: number): number[] => {
    const results = [x0]
    for (let i = 1; i < iterations; i++) {
      results.push(r * results[i - 1] * (1 - results[i - 1]))
    }
    return results
  }
  