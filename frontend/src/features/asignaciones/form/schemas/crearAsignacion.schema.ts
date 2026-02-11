import z from "zod";
import { CaracteristicaAsignacion } from "../../types/asignacion.types";

export const crearAsignacionSchema = z.object({
	empleadoId: z.preprocess(
		(val) => {
			if (val === "" || val == null) return undefined;
			return Number(val);
		},
		z.number().refine((v) => v != null && v >= 1, {
			message: "Debe seleccionar un empleado",
		}),
	),

	tipoAsignacion: z.enum(["TITULAR", "PROVISIONAL"]),

	fechaTomaPosesion: z.string().min(1, {
		message: "La fecha de toma de posesión es obligatoria",
	}),

	caracteristica: z.enum(CaracteristicaAsignacion).optional(),
	usarFechaHoy: z.boolean().optional(),
});
