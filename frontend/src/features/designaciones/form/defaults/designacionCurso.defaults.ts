import type { DesignacionCursoFormInput } from "../designacion.form.types";

export const DESIGNACION_CURSO_DEFAULTS: DesignacionCursoFormInput = {
	cupof: "",
	materiaId: "",
	cursoId: "",
	orientacion: "",
	franjasHorarias: [
		{
			dia: "LUNES",
			horaDesde: "08:00",
			horaHasta: "12:00",
		},
	],
};
