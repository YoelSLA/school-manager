import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createLicencia } from "../../form/schemas";
import type {
	LicenciaCreateFormInput,
	LicenciaCreateFormValues,
} from "../../types";

export function useLicenciaCreateForm() {
	const form = useForm<
		LicenciaCreateFormInput,
		unknown,
		LicenciaCreateFormValues
	>({
		resolver: zodResolver(createLicencia),
		defaultValues: {
			licenciaEstatutariaId: undefined,
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
