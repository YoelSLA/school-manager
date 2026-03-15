import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearLicenciaSchema } from "./crearLicencia.schema";
import { LicenciaCreateDTO } from "@/utils/types";

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
