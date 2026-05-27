import type {
    DesignacionAdministrativaCreateDTO,
    DesignacionAdministrativaFormValues,
} from "@/shared/utils/types";
import { Dia, RolEducativo } from "@/shared/utils/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { crearDesignacionAdministrativaSchema } from "../schemas/crearDesignacionAdministrativa.schema";

export function useDesignacionAdministrativaForm() {
	const form = useForm<
		DesignacionAdministrativaFormValues,
		undefined,
		DesignacionAdministrativaCreateDTO
	>({
		resolver: zodResolver(crearDesignacionAdministrativaSchema),
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
