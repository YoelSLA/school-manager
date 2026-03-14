import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearLicenciaSchema, type CrearLicenciaFormValues } from "./crearLicencia.schema";

export function useLicenciaForm() {
	const form = useForm<CrearLicenciaFormValues>({
		resolver: zodResolver(crearLicenciaSchema),
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