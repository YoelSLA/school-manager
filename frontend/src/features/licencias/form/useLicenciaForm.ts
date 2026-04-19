import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { LicenciaCreateDTO } from "@/utils/types";
import { crearLicenciaSchema } from "./crearLicencia.schema";

export function useLicenciaForm() {
	const form = useForm<LicenciaCreateDTO>({
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
