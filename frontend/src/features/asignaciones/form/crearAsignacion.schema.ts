import { z } from "zod";
import { CaracteristicaAsignacion } from "../types/asignacion.types";

export const crearAsignacionSchema = z
	.object({
		empleadoId: z.coerce
			.number({ message: "Debe seleccionar un empleado" })
			.min(1, { message: "Debe seleccionar un empleado" })
			.optional(),

		tipoAsignacion: z.enum(["TITULAR", "PROVISIONAL"]),

		fechaTomaPosesion: z
			.string()
			.min(1, "La fecha de toma de posesión es obligatoria"),

		fechaCese: z
			.string()
			.min(1, "La fecha de cese es obligatoria"),

		caracteristica: z
			.nativeEnum(CaracteristicaAsignacion)
			.optional(),

		usarFechaHoy: z.boolean().optional(),
	})
	.superRefine((data, ctx) => {
		console.log("🟡 ZOD VALIDANDO DATA:", data);

		const { fechaCese, fechaTomaPosesion, tipoAsignacion, caracteristica } =
			data;

		// ----------------------------
		// Validación de fechas
		// ----------------------------

		if (fechaCese && fechaTomaPosesion) {
			const cese = new Date(fechaCese);
			const toma = new Date(fechaTomaPosesion);

			console.log("📅 Comparando fechas:", {
				toma,
				cese,
			});

			if (Number.isNaN(cese.getTime()) || Number.isNaN(toma.getTime())) {
				console.log("⚠️ Fecha inválida detectada");
				return;
			}

			if (cese < toma) {
				console.log("❌ Fecha de cese menor a toma de posesión");

				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"La fecha de cese no puede ser anterior a la toma de posesión",
					path: ["fechaCese"],
				});
			}
		}

		// ----------------------------
		// Validación de característica
		// ----------------------------

		console.log("🔎 Validando característica:", {
			tipoAsignacion,
			caracteristica,
		});

		if (tipoAsignacion === "TITULAR") {
			if (!caracteristica) {
				console.log("❌ Falta característica para asignación titular");

				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message:
						"La característica es obligatoria para asignaciones titulares",
					path: ["caracteristica"],
				});
			}
		}

		console.log("✅ ZOD VALIDACIÓN COMPLETADA");
	});

export type AsignacionFormValues = z.infer<typeof crearAsignacionSchema>;