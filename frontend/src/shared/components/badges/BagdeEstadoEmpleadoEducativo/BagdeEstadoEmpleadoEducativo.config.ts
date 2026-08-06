import type { BadgeConfig } from "@/shared/types";

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
