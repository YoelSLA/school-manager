import { Clock, Repeat, Star } from "lucide-react";
import type { BadgeConfig } from "./types";
import {
	type EstadoAsignacion,
	type EstadoDesignacion,
	type EstadoLicencia,
	RolEducativo,
	type SituacionDeRevista,
} from "./types/enums";

/* =========================
        DESIGNACIÓN
========================= */

export const ESTADO_DESIGNACION_CONFIG: Record<EstadoDesignacion, BadgeConfig> =
	{
		CUBIERTA: {
			label: "Cubierta",
			variant: "cubierta",
		},

		LICENCIA: {
			label: "Licencia",
			variant: "licencia",
		},

		VACANTE: {
			label: "Vacante",
			variant: "vacante",
		},
	};

/* =========================
        ASIGNACIÓN
========================= */

export const ESTADO_ASIGNACION_CONFIG: Record<EstadoAsignacion, BadgeConfig> = {
	ACTIVA: {
		label: "Activa",
		variant: "activa",
	},

	LICENCIA: {
		label: "Licencia",
		variant: "licencia",
	},

	FINALIZADA: {
		label: "Finalizada",
		variant: "finalizada",
	},

	BAJA: {
		label: "Baja",
		variant: "baja",
	},

	PENDIENTE: {
		label: "Pendiente",
		variant: "pendiente",
	},
};

/* =========================
        LICENCIA
========================= */

export const ESTADO_LICENCIA_CONFIG: Record<EstadoLicencia, BadgeConfig> = {
	PENDIENTE: {
		label: "Pendiente",
		variant: "pendiente",
	},
	CUBIERTA: {
		label: "Cubierta",
		variant: "cubierta",
	},

	DESCUBIERTA: {
		label: "Descubierta",
		variant: "descubierta",
	},

	NO_VIGENTE: {
		label: "No Vigente",
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
		Titular: {
			label: "Titular",
			variant: "activa",
			icon: Star,
		},

		Provisional: {
			label: "Provisional",
			variant: "licencia",
			icon: Clock,
		},

		Suplente: {
			label: "Suplente",
			variant: "pendiente",
			icon: Repeat,
		},
	};

/* =========================
        ROL EDUCATIVO
========================= */

export const ROL_EDUCATIVO_CONFIG: Record<RolEducativo, BadgeConfig> = {
	[RolEducativo.AUXILIAR]: {
		label: RolEducativo.AUXILIAR,
		variant: "auxiliar",
	},

	[RolEducativo.BIBLIOTECARIO]: {
		label: RolEducativo.BIBLIOTECARIO,
		variant: "bibliotecario",
	},

	[RolEducativo.CAMBIO_DE_FUNCION]: {
		label: RolEducativo.CAMBIO_DE_FUNCION,
		variant: "cambioDeFuncion",
	},

	[RolEducativo.DIRECCION]: {
		label: RolEducativo.DIRECCION,
		variant: "direccion",
	},

	[RolEducativo.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL]: {
		label: RolEducativo.ENCARGO_DE_MEDIO_DE_APOYO_TECNICO_PROFESIONAL,
		variant: "medioApoyoTecnicoProfesional",
	},

	[RolEducativo.VICEDIRECCION]: {
		label: RolEducativo.VICEDIRECCION,
		variant: "vicedireccion",
	},

	[RolEducativo.SECRETARIA]: {
		label: RolEducativo.SECRETARIA,
		variant: "secretaria",
	},

	[RolEducativo.ORIENTACION_EDUCACIONAL]: {
		label: RolEducativo.ORIENTACION_EDUCACIONAL,
		variant: "orientacionEducacional",
	},

	[RolEducativo.ORIENTACION_SOCIAL]: {
		label: RolEducativo.ORIENTACION_SOCIAL,
		variant: "orientacionSocial",
	},

	[RolEducativo.PRECEPTORIA]: {
		label: RolEducativo.PRECEPTORIA,
		variant: "preceptoria",
	},

	[RolEducativo.DOCENTE]: {
		label: RolEducativo.DOCENTE,
		variant: "docente",
	},

	[RolEducativo.RECALIFICACION_LABORAL_DEFINITIVA]: {
		label: RolEducativo.RECALIFICACION_LABORAL_DEFINITIVA,
		variant: "recalificacionLaboralDefinitiva",
	},
};
