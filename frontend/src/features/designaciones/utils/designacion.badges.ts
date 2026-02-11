import type { BadgeVariant } from "@/components/Badge/Badge.types";
import {
	type EstadoDesignacion,
	RolEducativo,
} from "../types/designacion.types";

export const ESTADO_DESIGNACION_BADGE = {
	CUBIERTA: "cubierta",
	LICENCIA: "licencia",
	VACANTE: "vacante",
} as const satisfies Record<EstadoDesignacion, BadgeVariant>;

export const rolEducativoLabels: Record<RolEducativo, string> = {
	[RolEducativo.DIRECCION]: "Dirección",
	[RolEducativo.VICEDIRECCION]: "Vicedirección",
	[RolEducativo.SECRETARIA]: "Secretaría",
	[RolEducativo.BIBLIOTECARIO]: "Bibliotecario",
	[RolEducativo.ORIENTACION_EDUCACIONAL]: "Orientación Educacional",
	[RolEducativo.ORIENTACION_SOCIAL]: "Orientación Social",
	[RolEducativo.PRECEPTORIA]: "Preceptoría",
	[RolEducativo.DOCENTE]: "Docente",
	[RolEducativo.AUXILIAR]: "Auxiliar",
	[RolEducativo.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL]:
		"Encargo de Medio de Apoyo Técnico Profesional",
};

export const rolLabels: Record<string, string> = {
	DIRECCION: "Dirección",
	VICEDIRECCION: "Vicedirección",
	SECRETARIA: "Secretaría",
	BIBLIOTECARIO: "Bibliotecario",
	ORIENTACION_EDUCACIONAL: "Orientación Educacional",
	ORIENTACION_SOCIAL: "Orientación Social",
	PRECEPTORIA: "Preceptoría",
	DOCENTE: "Docente",
	AUXILIAR: "Auxiliar",
	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL:
		"Encargo de Medio de Apoyo Técnico Profesional",
};
