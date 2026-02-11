export interface TipoLicencia {
	enumValue: string;
	articulo: string;
	codigo: string;
	descripcion: string;
}

export const TIPOS_LICENCIA: TipoLicencia[] = [
	/* ===============================
     ARTÍCULO 114 – ENFERMEDAD
  =============================== */
	{
		enumValue: "L_A1",
		articulo: "Artículo 114",
		codigo: "A1",
		descripcion: "Licencia ordinaria por enfermedad.",
	},
	{
		enumValue: "L_A2",
		articulo: "Artículo 114",
		codigo: "A2",
		descripcion: "Licencia extraordinaria por enfermedad.",
	},
	{
		enumValue: "L_A22",
		articulo: "Artículo 114",
		codigo: "A22",
		descripcion:
			"Licencia extraordinaria por enfermedad para docentes titulares con más de 5 años de antigüedad.",
	},
	{
		enumValue: "L_A2211",
		articulo: "Artículo 114",
		codigo: "A2211",
		descripcion:
			"Licencia extraordinaria por enfermedad prolongada hasta 365 días con 100% de haberes.",
	},

	/* ===============================
     ARTÍCULO 114 – MATRIMONIO
  =============================== */
	{
		enumValue: "L_B1",
		articulo: "Artículo 114",
		codigo: "B1",
		descripcion: "Licencia por examen médico prematrimonial.",
	},
	{
		enumValue: "L_B2",
		articulo: "Artículo 114",
		codigo: "B2",
		descripcion: "Licencia por matrimonio otorgada por 12 días corridos.",
	},
	{
		enumValue: "L_114C",
		articulo: "Artículo 114",
		codigo: "114C",
		descripcion: "Licencia por matrimonio para suplentes (6 días hábiles).",
	},

	/* ===============================
     ARTÍCULO 114 – MATERNIDAD
  =============================== */
	{
		enumValue: "L_114D",
		articulo: "Artículo 114",
		codigo: "114D",
		descripcion:
			"Licencia por embarazo y maternidad (135 días con goce íntegro).",
	},
	{
		enumValue: "L_114E",
		articulo: "Artículo 114",
		codigo: "114E",
		descripcion: "Licencia por nacimiento de hijo.",
	},

	/* ===============================
     ARTÍCULO 114 – FAMILIAR ENFERMO
  =============================== */
	{
		enumValue: "L_114F1",
		articulo: "Artículo 114",
		codigo: "114F1",
		descripcion: "Licencia por atención de familiar enfermo.",
	},
	{
		enumValue: "L_114F2",
		articulo: "Artículo 114",
		codigo: "114F2",
		descripcion: "Licencia por familiar enfermo (personal provisional).",
	},
	{
		enumValue: "L_114F3",
		articulo: "Artículo 114",
		codigo: "114F3",
		descripcion:
			"Licencia por familiar enfermo (suplente – 2 días hábiles por año).",
	},
	{
		enumValue: "L_114F4",
		articulo: "Artículo 114",
		codigo: "114F4",
		descripcion: "Licencia por familiar enfermo con declaración jurada.",
	},

	/* ===============================
     ARTÍCULO 114 – VARIAS
  =============================== */
	{
		enumValue: "L_114G",
		articulo: "Artículo 114",
		codigo: "114G",
		descripcion: "Licencia por donación de sangre.",
	},
	{
		enumValue: "L_114H1",
		articulo: "Artículo 114",
		codigo: "114H1",
		descripcion: "Licencia por razones de profilaxis.",
	},
	{
		enumValue: "L_114I",
		articulo: "Artículo 114",
		codigo: "114I",
		descripcion: "Licencia por unidad familiar.",
	},
	{
		enumValue: "L_114J",
		articulo: "Artículo 114",
		codigo: "114J",
		descripcion: "Licencia por duelo familiar.",
	},
	{
		enumValue: "L_114K",
		articulo: "Artículo 114",
		codigo: "114K",
		descripcion: "Licencia por examen médico (servicio militar).",
	},
	{
		enumValue: "L_114L",
		articulo: "Artículo 114",
		codigo: "114L",
		descripcion: "Licencia por servicio militar.",
	},

	/* ===============================
     ARTÍCULO 114 – EXÁMENES
  =============================== */
	{
		enumValue: "L_114LL11",
		articulo: "Artículo 114",
		codigo: "114LL11",
		descripcion: "Licencia por examen universitario o terciario.",
	},
	{
		enumValue: "L_114LL12",
		articulo: "Artículo 114",
		codigo: "114LL12",
		descripcion: "Licencia por examen secundario.",
	},
	{
		enumValue: "L_114LL13",
		articulo: "Artículo 114",
		codigo: "114LL13",
		descripcion: "Licencia por prácticas docentes.",
	},
	{
		enumValue: "L_114LL14",
		articulo: "Artículo 114",
		codigo: "114LL14",
		descripcion: "Licencia por concursos docentes.",
	},
	{
		enumValue: "L_114LL15",
		articulo: "Artículo 114",
		codigo: "114LL15",
		descripcion: "Licencia por cursos de formación docente.",
	},
	{
		enumValue: "L_114LL2",
		articulo: "Artículo 114",
		codigo: "114LL2",
		descripcion: "Licencia por examen (suplente).",
	},
	{
		enumValue: "L_114LL3",
		articulo: "Artículo 114",
		codigo: "114LL3",
		descripcion: "Licencia por examen con certificado.",
	},

	/* ===============================
     ARTÍCULO 114 – CITACIONES
  =============================== */
	{
		enumValue: "L_114M",
		articulo: "Artículo 114",
		codigo: "114M1",
		descripcion: "Licencia por citación de autoridad competente.",
	},
	{
		enumValue: "L_114M11",
		articulo: "Artículo 114",
		codigo: "114M11",
		descripcion: "Licencia por citación DGEyC.",
	},
	{
		enumValue: "L_114M12",
		articulo: "Artículo 114",
		codigo: "114M12",
		descripcion: "Licencia por citación judicial o administrativa.",
	},

	/* ===============================
     ARTÍCULO 114 – ESPECIALES
  =============================== */
	{
		enumValue: "L_114N",
		articulo: "Artículo 114",
		codigo: "114N",
		descripcion: "Licencia por vocación anual.",
	},
	{
		enumValue: "L_114N1",
		articulo: "Artículo 114",
		codigo: "114Ñ",
		descripcion: "Licencia por donación de órganos.",
	},

	/* ===============================
     ARTÍCULO 114 – CAUSAS PARTICULARES
  =============================== */
	{
		enumValue: "L_114O1",
		articulo: "Artículo 114",
		codigo: "11401",
		descripcion: "Licencia por causas particulares (hasta 24 meses).",
	},
	{
		enumValue: "L_114O2",
		articulo: "Artículo 114",
		codigo: "11402",
		descripcion: "Licencia por causas particulares (suplente).",
	},
	{
		enumValue: "L_114O3",
		articulo: "Artículo 114",
		codigo: "11403",
		descripcion: "Licencia por causas particulares no fraccionable.",
	},
	{
		enumValue: "L_114O4",
		articulo: "Artículo 114",
		codigo: "11404",
		descripcion: "Licencia sin goce de haberes (hasta 6 días/año).",
	},
	{
		enumValue: "L_114O5",
		articulo: "Artículo 114",
		codigo: "11405",
		descripcion: "Licencia no acumulativa.",
	},

	/* ===============================
     ARTÍCULO 115
  =============================== */
	{
		enumValue: "L_115A1",
		articulo: "Artículo 115",
		codigo: "115A1",
		descripcion: "Licencia por estudio o investigación docente.",
	},
	{
		enumValue: "L_115A2",
		articulo: "Artículo 115",
		codigo: "115A2",
		descripcion: "Licencia por perfeccionamiento docente.",
	},
	{
		enumValue: "L_115B1",
		articulo: "Artículo 115",
		codigo: "115B1",
		descripcion: "Licencia por representación gremial.",
	},
	{
		enumValue: "L_115B2",
		articulo: "Artículo 115",
		codigo: "115B2",
		descripcion: "Licencia gremial (delegados escolares).",
	},
	{
		enumValue: "L_115B3",
		articulo: "Artículo 115",
		codigo: "115B3",
		descripcion: "Licencia por asambleas gremiales.",
	},
	{
		enumValue: "L_115B4",
		articulo: "Artículo 115",
		codigo: "115B4",
		descripcion: "Licencia gremial para actos eleccionarios.",
	},
	{
		enumValue: "L_115C",
		articulo: "Artículo 115",
		codigo: "115C",
		descripcion: "Licencia por actividad de interés público.",
	},
	{
		enumValue: "L_115D1",
		articulo: "Artículo 115",
		codigo: "115D1",
		descripcion: "Licencia por cargos de mayor jerarquía.",
	},
	{
		enumValue: "L_115E1",
		articulo: "Artículo 115",
		codigo: "115E1",
		descripcion: "Licencia por cargos electivos.",
	},
	{
		enumValue: "L_115E2",
		articulo: "Artículo 115",
		codigo: "115E2",
		descripcion: "Licencia política sin goce de haberes.",
	},
	{
		enumValue: "L_115E3",
		articulo: "Artículo 115",
		codigo: "115E3",
		descripcion:
			"Licencia por desempeño de cargos electivos o de representación política mientras dure la función.",
	},
];
