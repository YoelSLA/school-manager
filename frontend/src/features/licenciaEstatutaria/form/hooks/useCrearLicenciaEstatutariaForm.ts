import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LicenciaEstatutariaCreateFormValues } from "../../types";
import { licenciaEstatutariaCreateSchema } from "../schemas";

export function useCrearLicenciaEstatutariaForm() {
	const form = useForm<LicenciaEstatutariaCreateFormValues>({
		resolver: zodResolver(licenciaEstatutariaCreateSchema),
		defaultValues: {
			articulo: "",
			codigo: "",
			nombre: "",
			descripcion: "",
		},
	});

	return {
		form,
	};
}
