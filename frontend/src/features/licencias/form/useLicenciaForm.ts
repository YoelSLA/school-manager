import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LicenciaCreateFormValues } from "@/shared/types";
import { crearLicenciaSchema } from "./crearLicencia.schema";

export function useLicenciaForm() {
	const form = useForm<LicenciaCreateFormValues>({
		resolver: zodResolver(crearLicenciaSchema),
		defaultValues: {
			tipoLicencia: "L_A1",
			periodo: {
				fechaDesde: undefined,
				fechaHasta: undefined,
			},
			descripcion: "",
			designacionesIds: [],
		},
	});

	return { form };
}
