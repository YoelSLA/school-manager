import { useForm } from "react-hook-form";
import { CaracteristicaAsignacion } from "../types/asignacion.types";
import { AsignacionFormValues, crearAsignacionSchema } from "./crearAsignacion.schema";

export function useAsignacionForm() {

	const form = useForm<AsignacionFormValues>({
		resolver: async (values) => {

			const result = crearAsignacionSchema.safeParse(values);

			if (!result.success) {
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
						{} as Record<string, { type: string; message: string }>
					),
				};
			}

			return {
				values: result.data,
				errors: {},
			};
		},

		defaultValues: TITULAR_DEFAULTS,
		mode: "onSubmit",
	});

	return { form };
}

const TITULAR_DEFAULTS: Extract<AsignacionFormValues, { tipoAsignacion: "TITULAR" }> = {
	tipoAsignacion: "TITULAR",
	empleadoId: undefined,
	fechaTomaPosesion: "",
	caracteristica: CaracteristicaAsignacion.NORMAL,
};

const PROVISIONAL_DEFAULTS: Extract<AsignacionFormValues, { tipoAsignacion: "PROVISIONAL" }> = {
	tipoAsignacion: "PROVISIONAL",
	empleadoId: undefined,
	fechaTomaPosesion: "",
	fechaCese: "",
};