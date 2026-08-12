import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LicenciaEstatutariaUpdateFormValues } from "../../types";
import { licenciaEstatutariaUpdateSchema } from "../schemas";

export function useEditarLicenciaEstatutariaForm(
	licencia: LicenciaEstatutariaUpdateFormValues,
) {
	const form = useForm<LicenciaEstatutariaUpdateFormValues>({
		resolver: zodResolver(licenciaEstatutariaUpdateSchema),
		defaultValues: licencia,
	});

	return {
		form,
	};
}
