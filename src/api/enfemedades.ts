const entidad = new Map();

const abecedario = "abcdefghijklmnopqrstuvwxyz".split("");

const descripcion = [
  "Pérdida de 1-3 centímetros no deformante",
  "Pérdida de 1-3 centímetros deformante",
  "Pérdida de 3 a 10 centímetros deformante",
  "Pérdida de 3 a 10 centímetros deformante",
  "Pérdida de más de 10 centímetros no deformante",
  "Pérdida de más de 10 centímetros deformante",
];

const indices = [
  [1, 2],
  [1, 2],
  [2, 4],
  [5, 8],
  [6, 9],
  [10, 16],
];

for (let i = 0; i < descripcion.length; i++) {
  entidad.set("1-100" + abecedario[i], {
    descripcion: descripcion[i],
    indice: "1-100" + abecedario[i],
    indiceLesion: indices[i],
  });
}

export { entidad };

const entidad2 = new Map();

const codigos = [
  "1-011",
  "1-012",
  "1-013",
  "1-014",
  "1-015",
  "1-016",
  "1-017",
  "1-018",
  "1-019",
  "1-020",
  "1-021",
];

const descripcion2 = [
  "Lesiones de los huesos propios con estenosis nasal unilateral",
  "Lesiones de los huesos propios con estenosis nasal",
  "Pérdida parcial de un maxilar superior según su extensión y repercusión funcional",
  "Perdida total de un maxilar superior",
  "Pérdida parcial de los maxilares superiores según extensión y repercusión funcional",
  "Pérdida total de los maxilares superiores",
  "Fracturas múltiples con consolidación Viciosa de los maxilares superiores malar arco zigomático, huesos de la nariz bóveda palatina, órbita sin mayor repercusión funcional estética.",
  "Pérdida de los maxilares superiores, malararco zigomático, huesos de la nariz bóvedapalatina , órbita y partes blandas",
  "pérdida parcial de la bóveda palatina según su extensión y el compromiso de la arcada dentaría:",
  "Pérdida parcial de la bóveda palatina",
  "Pérdida de substancias , de la bóveda palatina y del velo del paladar",
];

const indices2 = [
  2,
  5,
  [6, 10],
  14,
  [11, 14],
  19,
  14,
  20,
  [3, 6],
  10,
  [4, 9, 12],
];

for (let i = 0; i < codigos.length; i++) {
  entidad2.set(codigos[i], {
    descripcion: descripcion2[i],
    indice: codigos[i],
    indiceLesion: indices2[i],
  });
}

export const entidadFusionada = new Map([...entidad, ...entidad2]);
