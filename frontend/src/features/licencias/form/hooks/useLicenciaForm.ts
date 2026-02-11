import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearLicenciaSchema } from "../schemas/crearLicencia.schema";
import { LICENCIA_DEFAULTS } from "../defaults/licencia.defaults";
import type {
	LicenciaFormInput,
	LicenciaFormOutput,
} from "../licencia.form.types";

export function useLicenciaForm() {
	const form = useForm<LicenciaFormInput, unknown, LicenciaFormOutput>({
		resolver: zodResolver(crearLicenciaSchema),
		defaultValues: LICENCIA_DEFAULTS,
	});

	return {
		form,
	};
}
