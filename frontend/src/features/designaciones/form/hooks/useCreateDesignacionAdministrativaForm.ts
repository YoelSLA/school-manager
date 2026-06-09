import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type {
	DesignacionAdministrativaCreateDTO,
	DesignacionAdministrativaFormValues,
} from "@/shared/types";
import { Dia, RolEducativo } from "@/shared/types/enums";
import { createDesignacionAdministrativaSchema } from "../schemas/createDesignacionAdministrativa.schema";

export function useCreateDesignacionAdministrativaForm() {
	const form = useForm<
		DesignacionAdministrativaFormValues,
		undefined,
		DesignacionAdministrativaCreateDTO
	>({
		resolver: zodResolver(createDesignacionAdministrativaSchema),
		defaultValues: {
			cupof: undefined,
			rolEducativo: RolEducativo.AUXILIAR,
			franjasHorarias: [
				{
					dia: Dia.LUNES,
					horaDesde: "08:00",
					horaHasta: "12:00",
				},
			],
		},
	});

	const franjas = useFieldArray<
		DesignacionAdministrativaFormValues,
		"franjasHorarias"
	>({
		control: form.control,
		name: "franjasHorarias",
	});

	return {
		form,
		franjas,
	};
}
