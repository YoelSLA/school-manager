import { type DesignacionAdministrativaFormValues, Dia, RolEducativo } from "../../types/designacion.types";

export const DESIGNACION_ADMINISTRATIVA_DEFAULTS: DesignacionAdministrativaFormValues =
{
	cupof: "",
	rolEducativo: RolEducativo.AUXILIAR,
	franjasHorarias: [
		{
			dia: Dia.LUNES,
			horaDesde: "08:00",
			horaHasta: "12:00",
		},
	],
};
