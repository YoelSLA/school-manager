import type { BadgeVariant } from "@/components/Badge/Badge.types";
import type { EstadoLicencia } from "@/utils/types/enums";

export const ESTADO_LICENCIA_BADGE = {
	PENDIENTE: "pendiente",
	CUBIERTA: "cubierta",
	DESCUBIERTA: "descubierta",
	FINALIZADA: "finalizada",
} as const satisfies Record<EstadoLicencia, BadgeVariant>;
