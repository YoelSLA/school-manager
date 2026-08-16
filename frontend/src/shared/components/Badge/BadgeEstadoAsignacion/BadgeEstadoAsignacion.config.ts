import type { BadgeConfig, EstadoAsignacion } from "@/shared/types";

export const ESTADO_ASIGNACION_LABELS: Record<EstadoAsignacion, string> = {
	ACTIVA: "Activa",
	LICENCIA: "En licencia",
	FINALIZADA: "Finalizada",
	BAJA: "Dada de baja",
	PENDIENTE: "Pendiente",
};

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
