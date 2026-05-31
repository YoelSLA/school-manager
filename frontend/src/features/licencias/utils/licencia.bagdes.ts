import type { BadgeVariant } from "@/components/Badge/Badge.types";
import type { EstadoLicencia } from "@/shared/utils/types/enums";

export const ESTADO_LICENCIA_BADGE = {
	PENDIENTE: "pendiente",
	CUBIERTA: "cubierta",
	DESCUBIERTA: "descubierta",
	NO_VIGENTE: "no_vigente",
} as const satisfies Record<EstadoLicencia, BadgeVariant>;
