import { Briefcase, Check, CircleSlash, Pause, X } from "lucide-react";
import type { BadgeVariant } from "./Badge.types";

export const BADGE_ICONS: Partial<Record<BadgeVariant, React.ElementType>> = {
	activa: Check,
	licencia: Pause,
	cubierta: Check,
	descubierta: X,
	vacante: Briefcase,
	inactiva: CircleSlash,
	finalizada: CircleSlash,
	baja: X,
};
