import type { BadgeVariant } from "@/components/Badge/Badge.types";
import { EstadoLicencia } from "@/utils/types";

export const ESTADO_LICENCIA_BADGE = {
	CUBIERTA: "cubierta",
	DESCUBIERTA: "descubierta",
	INACTIVA: "inactiva",
} as const satisfies Record<EstadoLicencia, BadgeVariant>;
