import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearLicenciaSchema, type CrearLicenciaFormValues } from "./crearLicencia.schema";

export function useLicenciaForm() {
	const form = useForm<CrearLicenciaFormValues>({
		resolver: async (data, context, options) => {
			console.log("FORM DATA", data);

			const result = crearLicenciaSchema.safeParse(data);

			if (!result.success) {
				console.log("ZOD ERROR", result.error.flatten());
			}

			return zodResolver(crearLicenciaSchema)(data, context, options);
		},
		defaultValues: {
			tipoLicencia: "L_A1",
			periodo: {
				fechaDesde: undefined,
				fechaHasta: undefined,
			},
			descripcion: "",
			designacionesIds: []
		},
	});

	return { form };
}