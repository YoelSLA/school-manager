import { Clock, type LucideIcon, Repeat, Star } from "lucide-react";
import type { BadgeVariant } from "@/components/Badge/Badge.types";
import { EstadoAsignacion, SituacionDeRevista } from "@/utils/types/enums";

export const ESTADO_ASIGNACION_BADGE = {
	ACTIVA: "activa",
	LICENCIA: "licencia",
	FINALIZADA: "finalizada",
	BAJA: "baja",
	PENDIENTE: "pendiente",
} satisfies Record<EstadoAsignacion, BadgeVariant>;

export const SITUACION_REVISTA_CONFIG: Record<
	SituacionDeRevista,
	{
		label: string;
		className: string;
		Icon: LucideIcon;
	}
> = {
	Titular: {
		label: "Titular",
		className: "sr-badge--titular",
		Icon: Star,
	},
	Provisional: {
		label: "Provisional",
		className: "sr-badge--provisional",
		Icon: Clock,
	},
	Suplente: {
		label: "Suplente",
		className: "sr-badge--suplente",
		Icon: Repeat,
	},
};
