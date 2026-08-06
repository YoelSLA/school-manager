import type { BadgeConfig, RolEducativo } from "@/shared/types";

export const ROL_EDUCATIVO_LABELS: Record<RolEducativo, string> = {
	AUXILIAR: "Auxiliar",
	BIBLIOTECARIO: "Bibliotecario",
	CAMBIO_DE_FUNCION: "Cambio de función",
	DIRECCION: "Dirección",
	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL:
		"Encargo de medio de apoyo técnico profesional",
	VICEDIRECCION: "Vicedirección",
	SECRETARIA: "Secretaría",
	ORIENTACION_EDUCACIONAL: "Orientación educacional",
	ORIENTACION_SOCIAL: "Orientación social",
	PRECEPTORIA: "Preceptoría",
	DOCENTE: "Docente",
	RECALIFICACION_LABORAL_DEFINITIVA: "Recalificación laboral definitiva",
};

export const ROL_EDUCATIVO_CONFIG: Record<RolEducativo, BadgeConfig> = {
	AUXILIAR: {
		label: ROL_EDUCATIVO_LABELS.AUXILIAR,
		variant: "auxiliar",
	},

	BIBLIOTECARIO: {
		label: ROL_EDUCATIVO_LABELS.BIBLIOTECARIO,
		variant: "bibliotecario",
	},

	CAMBIO_DE_FUNCION: {
		label: ROL_EDUCATIVO_LABELS.CAMBIO_DE_FUNCION,
		variant: "cambioDeFuncion",
	},

	DIRECCION: {
		label: ROL_EDUCATIVO_LABELS.DIRECCION,
		variant: "direccion",
	},

	ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL: {
		label: ROL_EDUCATIVO_LABELS.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL,
		variant: "medioApoyoTecnicoProfesional",
	},

	VICEDIRECCION: {
		label: ROL_EDUCATIVO_LABELS.VICEDIRECCION,
		variant: "vicedireccion",
	},

	SECRETARIA: {
		label: ROL_EDUCATIVO_LABELS.SECRETARIA,
		variant: "secretaria",
	},

	ORIENTACION_EDUCACIONAL: {
		label: ROL_EDUCATIVO_LABELS.ORIENTACION_EDUCACIONAL,
		variant: "orientacionEducacional",
	},

	ORIENTACION_SOCIAL: {
		label: ROL_EDUCATIVO_LABELS.ORIENTACION_SOCIAL,
		variant: "orientacionSocial",
	},

	PRECEPTORIA: {
		label: ROL_EDUCATIVO_LABELS.PRECEPTORIA,
		variant: "preceptoria",
	},

	DOCENTE: {
		label: ROL_EDUCATIVO_LABELS.DOCENTE,
		variant: "docente",
	},

	RECALIFICACION_LABORAL_DEFINITIVA: {
		label: ROL_EDUCATIVO_LABELS.RECALIFICACION_LABORAL_DEFINITIVA,
		variant: "recalificacionLaboralDefinitiva",
	},
};