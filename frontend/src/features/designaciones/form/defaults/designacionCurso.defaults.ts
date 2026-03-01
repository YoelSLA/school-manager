import { type DesignacionCursoFormValues, Dia } from "../../types/designacion.types";

export const DESIGNACION_CURSO_DEFAULTS: DesignacionCursoFormValues = {
	cupof: "",
	materiaId: "",
	cursoId: "",
	orientacion: "",
	franjasHorarias: [
		{
			dia: Dia.LUNES,
			horaDesde: "08:00",
			horaHasta: "12:00",
		},
	],
};