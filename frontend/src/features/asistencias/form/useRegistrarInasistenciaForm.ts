import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TIPOS_LICENCIA } from "@/features/licencias/utils/tipoLicencia";
import type {
	RegistrarInasistenciaFormInput,
	RegistrarInasistenciaFormOutput,
} from "./asistencias.form.types";
import { registrarInasistenciaSchema } from "./asistencias.schemas";

export const DEFAULT_TIPO_LICENCIA = TIPOS_LICENCIA.find(
	(t) => t.enumValue === "L_A1",
)?.enumValue;

export function useRegistrarInasistenciaForm() {
	const form = useForm<
		RegistrarInasistenciaFormInput,
		unknown,
		RegistrarInasistenciaFormOutput
	>({
		resolver: zodResolver(registrarInasistenciaSchema),
		defaultValues: {
			tipoLicencia: DEFAULT_TIPO_LICENCIA,
			observacion: "",
		},
	});

	return { form };
}
