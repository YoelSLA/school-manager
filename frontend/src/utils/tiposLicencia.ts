export interface TipoLicencia {
  enum: string;
  articulo: string;
  codigo: string;
  descripcion: string;
}

export const TIPOS_LICENCIA: TipoLicencia[] = [
  /* ===============================
     ARTÍCULO 114 – ENFERMEDAD
  =============================== */
  {
    enum: "L_A1",
    articulo: "Artículo 114",
    codigo: "A1",
    descripcion: "Licencia ordinaria por enfermedad.",
  },
  {
    enum: "L_A2",
    articulo: "Artículo 114",
    codigo: "A2",
    descripcion: "Licencia extraordinaria por enfermedad.",
  },
  {
    enum: "L_A22",
    articulo: "Artículo 114",
    codigo: "A22",
    descripcion:
      "Licencia extraordinaria por enfermedad para docentes titulares con más de 5 años de antigüedad.",
  },
  {
    enum: "L_A2211",
    articulo: "Artículo 114",
    codigo: "A2211",
    descripcion:
      "Licencia extraordinaria por enfermedad prolongada hasta 365 días con 100% de haberes.",
  },

  /* ===============================
     ARTÍCULO 114 – MATRIMONIO
  =============================== */
  {
    enum: "L_B1",
    articulo: "Artículo 114",
    codigo: "B1",
    descripcion: "Licencia por examen médico prematrimonial.",
  },
  {
    enum: "L_B2",
    articulo: "Artículo 114",
    codigo: "B2",
    descripcion: "Licencia por matrimonio otorgada por 12 días corridos.",
  },
  {
    enum: "L_114C",
    articulo: "Artículo 114",
    codigo: "114C",
    descripcion: "Licencia por matrimonio para suplentes (6 días hábiles).",
  },

  /* ===============================
     ARTÍCULO 114 – MATERNIDAD
  =============================== */
  {
    enum: "L_114D",
    articulo: "Artículo 114",
    codigo: "114D",
    descripcion:
      "Licencia por embarazo y maternidad (135 días con goce íntegro).",
  },
  {
    enum: "L_114E",
    articulo: "Artículo 114",
    codigo: "114E",
    descripcion: "Licencia por nacimiento de hijo.",
  },

  /* ===============================
     ARTÍCULO 114 – FAMILIAR ENFERMO
  =============================== */
  {
    enum: "L_114F1",
    articulo: "Artículo 114",
    codigo: "114F1",
    descripcion: "Licencia por atención de familiar enfermo.",
  },
  {
    enum: "L_114F2",
    articulo: "Artículo 114",
    codigo: "114F2",
    descripcion: "Licencia por familiar enfermo (personal provisional).",
  },
  {
    enum: "L_114F3",
    articulo: "Artículo 114",
    codigo: "114F3",
    descripcion:
      "Licencia por familiar enfermo (suplente – 2 días hábiles por año).",
  },
  {
    enum: "L_114F4",
    articulo: "Artículo 114",
    codigo: "114F4",
    descripcion: "Licencia por familiar enfermo con declaración jurada.",
  },

  /* ===============================
     ARTÍCULO 114 – VARIAS
  =============================== */
  {
    enum: "L_114G",
    articulo: "Artículo 114",
    codigo: "114G",
    descripcion: "Licencia por donación de sangre.",
  },
  {
    enum: "L_114H1",
    articulo: "Artículo 114",
    codigo: "114H1",
    descripcion: "Licencia por razones de profilaxis.",
  },
  {
    enum: "L_114I",
    articulo: "Artículo 114",
    codigo: "114I",
    descripcion: "Licencia por unidad familiar.",
  },
  {
    enum: "L_114J",
    articulo: "Artículo 114",
    codigo: "114J",
    descripcion: "Licencia por duelo familiar.",
  },
  {
    enum: "L_114K",
    articulo: "Artículo 114",
    codigo: "114K",
    descripcion: "Licencia por examen médico (servicio militar).",
  },
  {
    enum: "L_114L",
    articulo: "Artículo 114",
    codigo: "114L",
    descripcion: "Licencia por servicio militar.",
  },

  /* ===============================
     ARTÍCULO 114 – EXÁMENES
  =============================== */
  {
    enum: "L_114LL11",
    articulo: "Artículo 114",
    codigo: "114LL11",
    descripcion: "Licencia por examen universitario o terciario.",
  },
  {
    enum: "L_114LL12",
    articulo: "Artículo 114",
    codigo: "114LL12",
    descripcion: "Licencia por examen secundario.",
  },
  {
    enum: "L_114LL13",
    articulo: "Artículo 114",
    codigo: "114LL13",
    descripcion: "Licencia por prácticas docentes.",
  },
  {
    enum: "L_114LL14",
    articulo: "Artículo 114",
    codigo: "114LL14",
    descripcion: "Licencia por concursos docentes.",
  },
  {
    enum: "L_114LL15",
    articulo: "Artículo 114",
    codigo: "114LL15",
    descripcion: "Licencia por cursos de formación docente.",
  },
  {
    enum: "L_114LL2",
    articulo: "Artículo 114",
    codigo: "114LL2",
    descripcion: "Licencia por examen (suplente).",
  },
  {
    enum: "L_114LL3",
    articulo: "Artículo 114",
    codigo: "114LL3",
    descripcion: "Licencia por examen con certificado.",
  },

  /* ===============================
     ARTÍCULO 114 – CITACIONES
  =============================== */
  {
    enum: "L_114M",
    articulo: "Artículo 114",
    codigo: "114M1",
    descripcion: "Licencia por citación de autoridad competente.",
  },
  {
    enum: "L_114M11",
    articulo: "Artículo 114",
    codigo: "114M11",
    descripcion: "Licencia por citación DGEyC.",
  },
  {
    enum: "L_114M12",
    articulo: "Artículo 114",
    codigo: "114M12",
    descripcion: "Licencia por citación judicial o administrativa.",
  },

  /* ===============================
     ARTÍCULO 114 – ESPECIALES
  =============================== */
  {
    enum: "L_114N",
    articulo: "Artículo 114",
    codigo: "114N",
    descripcion: "Licencia por vocación anual.",
  },
  {
    enum: "L_114N1",
    articulo: "Artículo 114",
    codigo: "114Ñ",
    descripcion: "Licencia por donación de órganos.",
  },

  /* ===============================
     ARTÍCULO 114 – CAUSAS PARTICULARES
  =============================== */
  {
    enum: "L_114O1",
    articulo: "Artículo 114",
    codigo: "11401",
    descripcion: "Licencia por causas particulares (hasta 24 meses).",
  },
  {
    enum: "L_114O2",
    articulo: "Artículo 114",
    codigo: "11402",
    descripcion: "Licencia por causas particulares (suplente).",
  },
  {
    enum: "L_114O3",
    articulo: "Artículo 114",
    codigo: "11403",
    descripcion: "Licencia por causas particulares no fraccionable.",
  },
  {
    enum: "L_114O4",
    articulo: "Artículo 114",
    codigo: "11404",
    descripcion: "Licencia sin goce de haberes (hasta 6 días/año).",
  },
  {
    enum: "L_114O5",
    articulo: "Artículo 114",
    codigo: "11405",
    descripcion: "Licencia no acumulativa.",
  },

  /* ===============================
     ARTÍCULO 115
  =============================== */
  {
    enum: "L_115A1",
    articulo: "Artículo 115",
    codigo: "115A1",
    descripcion: "Licencia por estudio o investigación docente.",
  },
  {
    enum: "L_115A2",
    articulo: "Artículo 115",
    codigo: "115A2",
    descripcion: "Licencia por perfeccionamiento docente.",
  },
  {
    enum: "L_115B1",
    articulo: "Artículo 115",
    codigo: "115B1",
    descripcion: "Licencia por representación gremial.",
  },
  {
    enum: "L_115B2",
    articulo: "Artículo 115",
    codigo: "115B2",
    descripcion: "Licencia gremial (delegados escolares).",
  },
  {
    enum: "L_115B3",
    articulo: "Artículo 115",
    codigo: "115B3",
    descripcion: "Licencia por asambleas gremiales.",
  },
  {
    enum: "L_115B4",
    articulo: "Artículo 115",
    codigo: "115B4",
    descripcion: "Licencia gremial para actos eleccionarios.",
  },
  {
    enum: "L_115C",
    articulo: "Artículo 115",
    codigo: "115C",
    descripcion: "Licencia por actividad de interés público.",
  },
  {
    enum: "L_115D1",
    articulo: "Artículo 115",
    codigo: "115D1",
    descripcion: "Licencia por cargos de mayor jerarquía.",
  },
  {
    enum: "L_115E1",
    articulo: "Artículo 115",
    codigo: "115E1",
    descripcion: "Licencia por cargos electivos.",
  },
  {
    enum: "L_115E2",
    articulo: "Artículo 115",
    codigo: "115E2",
    descripcion: "Licencia política sin goce de haberes.",
  },
  {
    enum: "L_115E3",
    articulo: "Artículo 115",
    codigo: "115E3",
    descripcion:
      "Licencia por desempeño de cargos electivos o de representación política mientras dure la función.",
  },
];
