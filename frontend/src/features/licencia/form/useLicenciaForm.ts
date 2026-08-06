import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLicencia } from "../form/schemas/createLicencia.schema";
import type { LicenciaCreateFormValues } from "../types";

export function useLicenciaForm() {
	const form = useForm<LicenciaCreateFormValues>({
		resolver: zodResolver(createLicencia),
		defaultValues: {
			tipoLicencia: "L_A1",
			periodo: {
				fechaDesde: undefined,
				fechaHasta: undefined,
			},
			descripcion: "",
			asignacionesIds: [],
		},
	});

	return { form };
}
