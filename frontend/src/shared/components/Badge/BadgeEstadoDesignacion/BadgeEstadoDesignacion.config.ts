import type { BadgeConfig, EstadoDesignacion } from "@/shared/types";

const ESTADO_DESIGNACION_LABELS: Record<EstadoDesignacion, string> = {
	CUBIERTA: "Cubierta",
	VACANTE: "Vacante",
};

export const ESTADO_DESIGNACION_CONFIG: Record<EstadoDesignacion, BadgeConfig> =
	{
		CUBIERTA: {
			label: ESTADO_DESIGNACION_LABELS.CUBIERTA,
			variant: "cubierta",
		},

		VACANTE: {
			label: ESTADO_DESIGNACION_LABELS.VACANTE,
			variant: "vacante",
		},
	};
