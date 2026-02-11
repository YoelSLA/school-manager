import { CaracteristicaAsignacion } from "../../types/asignacion.types";
import type { AsignacionFormInput } from "../asignacion.form.types";

export const ASIGNACION_DEFAULTS: AsignacionFormInput = {
	empleadoId: undefined,
	tipoAsignacion: "TITULAR",
	fechaTomaPosesion: "",
	caracteristica: CaracteristicaAsignacion.NORMAL,
	usarFechaHoy: true,
};
