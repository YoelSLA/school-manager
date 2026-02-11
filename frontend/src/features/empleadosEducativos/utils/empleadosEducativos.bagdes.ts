import type { BadgeVariant } from "@/components/Badge/Badge.types";

export const ESTADO_EMPLEADO_BADGE = {
	ACTIVO: "activa",
	INACTIVO: "inactiva",
} as const satisfies Record<"ACTIVO" | "INACTIVO", BadgeVariant>;

export function getEstadoEmpleadoKey(
	activo: boolean,
): keyof typeof ESTADO_EMPLEADO_BADGE {
	return activo ? "ACTIVO" : "INACTIVO";
}
