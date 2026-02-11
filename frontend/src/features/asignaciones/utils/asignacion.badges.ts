import type { BadgeVariant } from "@/components/Badge/Badge.types";
import type {
	EstadoAsignacion,
	SituacionDeRevista,
} from "../types/asignacion.types";
import { Clock, type LucideIcon, Repeat, Star } from "lucide-react";

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
	TITULAR: {
		label: "Titular",
		className: "sr-badge--titular",
		Icon: Star,
	},
	PROVISIONAL: {
		label: "Provisional",
		className: "sr-badge--provisional",
		Icon: Clock,
	},
	SUPLENTE: {
		label: "Suplente",
		className: "sr-badge--suplente",
		Icon: Repeat,
	},
};
