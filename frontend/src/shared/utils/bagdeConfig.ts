import { Clock, Repeat, ShieldCheck } from "lucide-react";
import {
	ESTADO_ASIGNACION_LABELS,
	ESTADO_DESIGNACION_LABELS,
	ESTADO_LICENCIA_LABELS,
	ROL_EDUCATIVO_LABELS,
	SITUACION_REVISTA_LABELS,
} from "./enumLabels";
import type { BadgeConfig } from "./types";
import type {
	EstadoAsignacion,
	EstadoDesignacion,
	EstadoLicencia,
	RolEducativo,
	SituacionDeRevista,
} from "./types/enums";

/* =========================
        DESIGNACIÓN
========================= */

export const ESTADO_DESIGNACION_CONFIG: Record<EstadoDesignacion, BadgeConfig> =
	{
		CUBIERTA: {
			label: ESTADO_DESIGNACION_LABELS.CUBIERTA,
			variant: "cubierta",
		},

		VACANTE: {
			label: ESTADO_DESIGNACION_LABELS.VACANTE,
			variant: "vacante",
		},
	};

/* =========================
        ASIGNACIÓN
========================= */

export const ESTADO_ASIGNACION_CONFIG: Record<EstadoAsignacion, BadgeConfig> = {
	ACTIVA: {
		label: ESTADO_ASIGNACION_LABELS.ACTIVA,
		variant: "activa",
	},

	LICENCIA: {
		label: ESTADO_ASIGNACION_LABELS.LICENCIA,
		variant: "licencia",
	},

	FINALIZADA: {
		label: ESTADO_ASIGNACION_LABELS.FINALIZADA,
		variant: "finalizada",
	},

	BAJA: {
		label: ESTADO_ASIGNACION_LABELS.BAJA,
		variant: "baja",
	},

	PENDIENTE: {
		label: ESTADO_ASIGNACION_LABELS.PENDIENTE,
		variant: "pendiente",
	},
};

/* =========================
        LICENCIA
========================= */

export const ESTADO_LICENCIA_CONFIG: Record<EstadoLicencia, BadgeConfig> = {
	PENDIENTE: {
		label: ESTADO_LICENCIA_LABELS.PENDIENTE,
		variant: "pendiente",
	},

	CUBIERTA: {
		label: ESTADO_LICENCIA_LABELS.CUBIERTA,
		variant: "cubierta",
	},

	DESCUBIERTA: {
		label: ESTADO_LICENCIA_LABELS.DESCUBIERTA,
		variant: "descubierta",
	},

	NO_VIGENTE: {
		label: ESTADO_LICENCIA_LABELS.NO_VIGENTE,
		variant: "no_vigente",
	},
};

/* =========================
        EMPLEADO
========================= */

export const ESTADO_EMPLEADO_CONFIG = {
	ACTIVO: {
		label: "Activo",
		variant: "activa",
	},

	INACTIVO: {
		label: "Inactivo",
		variant: "inactiva",
	},
} as const satisfies Record<"ACTIVO" | "INACTIVO", BadgeConfig>;

export function getEstadoEmpleadoKey(
	activo: boolean,
): keyof typeof ESTADO_EMPLEADO_CONFIG {
	return activo ? "ACTIVO" : "INACTIVO";
}

/* =========================
      SITUACIÓN REVISTA
========================= */

export const SITUACION_REVISTA_CONFIG: Record<SituacionDeRevista, BadgeConfig> =
	{
		TITULAR: {
			label: SITUACION_REVISTA_LABELS.TITULAR,
			variant: "titular",
			icon: ShieldCheck,
		},

		PROVISIONAL: {
			label: SITUACION_REVISTA_LABELS.PROVISIONAL,
			variant: "provisional",
			icon: Clock,
		},

		SUPLENTE: {
			label: SITUACION_REVISTA_LABELS.SUPLENTE,
			variant: "suplente",
			icon: Repeat,
		},
	};

/* =========================
        ROL EDUCATIVO
========================= */

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
