import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { asistenciaCreateSchema } from "../../form/schemas";
import type {
	AsistenciaCreateDTO,
	AsistenciaCreateFormValues,
} from "../../types";

export function useCreateaAsistenciaForm() {
	const form = useForm<
		AsistenciaCreateFormValues,
		unknown,
		AsistenciaCreateDTO
	>({
		resolver: zodResolver(asistenciaCreateSchema),
		defaultValues: {
			licenciaEstatutariaId: undefined,
			observacion: "",
		},
	});

	return { form };
}
