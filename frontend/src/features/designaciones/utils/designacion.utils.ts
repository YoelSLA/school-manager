import { Franja, RolEducativo } from "../types/designacion.types";

export const DIAS_SEMANA = [
	"LUNES",
	"MARTES",
	"MIERCOLES",
	"JUEVES",
	"VIERNES",
];

export const DEFAULT_FRANJA: Franja = {
	dia: "LUNES",
	horaDesde: "08:00",
	horaHasta: "12:00",
};

export const ROL_EDUCATIVO_LABELS: Record<RolEducativo, string> = {
	[RolEducativo.DIRECCION]: "Dirección",
	[RolEducativo.VICEDIRECCION]: "Vicedirección",
	[RolEducativo.SECRETARIA]: "Secretaría",
	[RolEducativo.ORIENTACION_EDUCACIONAL]: "Orientación Educacional",
	[RolEducativo.ORIENTACION_SOCIAL]: "Orientación Social",
	[RolEducativo.BIBLIOTECARIO]: "Bibliotecario",
	[RolEducativo.PRECEPTORIA]: "Preceptoría",
	[RolEducativo.DOCENTE]: "Docente",
	[RolEducativo.AUXILIAR]: "Auxiliar",
	[RolEducativo.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL]:
		"Encargo de medio de apoyo técnico profesional",
};

export const ORIENTACIONES = [
	{
		value: "Bachiller en Artes Visuales",
		label: "Bachiller en Artes Visuales",
	},
	{
		value: "Bachiller en Comunicaciones",
		label: "Bachiller en Comunicaciones",
	},
	{
		value: "Bachiller en Economía y Administración",
		label: "Bachiller en Economía y Administración",
	},
	{
		value: "Bachiller de Ciclo Básico",
		label: "Bachiller de Ciclo Básico",
	},
] as const;
