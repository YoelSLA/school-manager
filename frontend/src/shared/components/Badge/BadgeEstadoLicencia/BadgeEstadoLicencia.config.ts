import type { BadgeConfig, EstadoLicencia } from "@/shared/types";

export const ESTADO_LICENCIA_LABELS: Record<EstadoLicencia, string> = {
	PENDIENTE: "Pendiente",
	CUBIERTA: "Cubierta",
	DESCUBIERTA: "Descubierta",
	NO_VIGENTE: "No vigente",
};

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
