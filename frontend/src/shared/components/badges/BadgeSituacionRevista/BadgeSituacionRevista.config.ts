import { Clock, Repeat, ShieldCheck } from "lucide-react";
import type { BadgeConfig, SituacionDeRevista } from "@/shared/types";

export const SITUACION_REVISTA_LABELS: Record<SituacionDeRevista, string> = {
	TITULAR: "Titular",
	PROVISIONAL: "Provisional",
	SUPLENTE: "Suplente",
};

export const SITUACION_REVISTA_CONFIG: Record<SituacionDeRevista, BadgeConfig> =
	{
		TITULAR: {
			label: SITUACION_REVISTA_LABELS.TITULAR,
			variant: "titular",
			icon: ShieldCheck,
		},

		PROVISIONAL: {
			label: SITUACION_REVISTA_LABELS.PROVISIONAL,
			variant: "provisional",
			icon: Clock,
		},

		SUPLENTE: {
			label: SITUACION_REVISTA_LABELS.SUPLENTE,
			variant: "suplente",
			icon: Repeat,
		},
	};
