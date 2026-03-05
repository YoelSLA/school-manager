import { useForm } from "react-hook-form";
import { type AsignacionFormValues, crearAsignacionSchema } from "./crearAsignacion.schema";
import { CaracteristicaAsignacion } from "../types/asignacion.types";

export function useAsignacionForm() {

	const form = useForm<AsignacionFormValues>({
		resolver: async (values) => {
			console.log("🟡 RHF VALUES:", values);

			const result = crearAsignacionSchema.safeParse(values);

			if (!result.success) {
				console.error("💥 ZOD ERROR RAW:", result.error);

				console.error("💥 ZOD FLATTEN:", result.error.flatten());

				console.error("💥 ZOD FIELD ERRORS:", result.error.flatten().fieldErrors);

				return {
					values: {},
					errors: Object.entries(result.error.flatten().fieldErrors).reduce(
						(acc, [key, value]) => {
							if (!value) return acc;

							acc[key as keyof AsignacionFormValues] = {
								type: "validation",
								message: value[0],
							};

							return acc;
						},
						{} as any
					),
				};
			}

			console.log("✅ ZOD OK:", result.data);

			return {
				values: result.data,
				errors: {},
			};
		},

		defaultValues: ASIGNACION_DEFAULTS,
		mode: "onSubmit",
	});

	return { form };
}

const ASIGNACION_DEFAULTS: AsignacionFormValues = {
	empleadoId: undefined,
	tipoAsignacion: "TITULAR",
	fechaTomaPosesion: "",
	fechaCese: "",
	caracteristica: CaracteristicaAsignacion.NORMAL,
	usarFechaHoy: true,
};