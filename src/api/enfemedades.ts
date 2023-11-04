const entidad = new Map();

const abecedario = "abcdefghijklmnopqrstuvwxyz".split("");

const descripcion = [
  "Pérdida de 1-3 centímetros no deformante",
  "Pérdida de 1-3 centímetros deformante",
  "Pérdida de 3 a 10 centímetros deformante",
  "Pérdida de más de 10 centímetros no deformante",
  "Pérdida de más de 10 centímetros deformante",
];

const indices = [
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
  "1-023",
  "1-024",
  "1-025",
  "1-026",
  "1-027",
  "1-028",
  "1-029",
  "1-030",
  "1-031",
  "1-011",
  "1-042",
  "1-051",
  "1-052",
  "1-061",
  "1-062",
  "1-063",
  "1-071",
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
  "Pérdida parcial del maxilar inferior con marcada repercusión funcional, según su extensión , deformación y alteración de la función.",
  "Pérdida total del maxilar inferior",
  "Trastornos de la masticación por lesiones de las articulaciones temporo -mandibulares. Sin pérdida de substancia ósea",
  "Perdida de los maxilares superiores y de la mandibula",
  "Otras lesiones óseas de la cara que produzcan deformaciones o alteraciones funcionales",
  "Pérdidas hasta de 5 piezas dentarías. Únicamente prótesis por la sanidad respectiva",
  "Pérdida traumática de más de 5 piezas dentarías con prótesis y masticación deficiente, proporcionalmente al número de piezas perdidas",
  "Pérdidas total de la dentadura de origen traumático y prótesis",
  "Lesiones severas de los maxilares , con amputación parcial o total de la lengua con graves trastornos de la deglución y del lenguaje.",
  "Lesiones o afecciones que determinen alteraciones de los movimientos normales del cuello o dolor con o sin signos radiológicos de origen traumático:",
  "Lesiones o afecciones que determinen alteraciones de los movimientos normales del cuello o dolor con o sin signos radiológicos de origen degenerativo",
  "Lesiones o afecciones esternales , condrocostales, vertebrales dorsales sin repercusión funcional",
  "Lesiones o afecciones esternales , condrocostales, vertebrales dorsales con repercusión funcional",
  "Lesiones o afecciones de la columna lumbar, incluyendo las dos últimas vértebras dorsales sin repercusión funcional",
  "Lesiones o afecciones de la columna lumbar, incluyendo las dos últimas vértebras dorsales con repercusión funcional",
  "Discitis , síndrome del causal estrecho o postelaminectomía y otras lesiones de este 3 tipo no contempladas",
  "Lesiones o afecciones de los huesos de la pelvis o de las articulaciones sacroilíacas, sacrococígeas y pubianas con alteración u con recuperación funcional",
];

const indices2 = [
  [2],
  [5],
  [6, 10],
  14,
  [11, 14],
  [19],
  [14],
  [20],
  [3, 6],
  [10],
  [4, 8, 12],
  [10, 14],
  [20],
  [4, 7, 14],
  [21],
  [3, 6, 9],
  [4],
  [4],
  [5],
  [21],
  [4, 8, 12],
  [2, 4, 6],
  [1, 4, 9],
  [4, 8, 12],
  [1, 5, 10],
  [5, 10, 15],
  [3, 6, 9],
  [5, 10, 15],
];

for (let i = 0; i < codigos.length; i++) {
  entidad2.set(codigos[i], {
    descripcion: descripcion2[i],
    indice: codigos[i],
    indiceLesion: indices2[i],
  });
}

export const entidadFusionada = new Map([...entidad, ...entidad2]);
