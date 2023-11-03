export const edades: string[] = [
  "hasta 20",
  "21 a 24",
  "25 a 29",
  "30 a 34",
  "35 a 39",
  "40 a 44",
  "45 a 49",
  "50 a 54",
  "55 a 59",
  "60 a 64",
  "65 o más",
];
export const lesionesCalificadas = ["Una", "Dos", "Más de dos"];
export const gradoLesion = [
  "Grado mínimo: Leve",
  "Grado medio",
  "Grado máximo: Grave",
];

export const juntasTribunales = ["si", "No"];

const arregloPorcentaje: string[] = [];

for (let i = 0; i <= 100; i++) {
  arregloPorcentaje.push(i + "%");
}

export { arregloPorcentaje };
