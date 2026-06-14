import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LicenciaCreateFormValues } from "@/shared/types";
import { createLicencia } from "@/features/licencias/form/createLicencia.schema";

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
