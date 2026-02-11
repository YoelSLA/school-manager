import { RolEducativo } from "../../types/designacion.types";
import type { DesignacionAdministrativaFormInput } from "../designacion.form.types";

export const DESIGNACION_ADMINISTRATIVA_DEFAULTS: DesignacionAdministrativaFormInput =
	{
		cupof: "",
		rolEducativo: RolEducativo.AUXILIAR,
		franjasHorarias: [
			{
				dia: "LUNES",
				horaDesde: "08:00",
				horaHasta: "12:00",
			},
		],
	};
