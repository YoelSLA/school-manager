import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Dia, RolEducativo } from "@/shared/types/enums";
import type {
	DesignacionAdministrativaCreateDTO,
	DesignacionAdministrativaFormValues,
} from "../../types";
import { designacionAdministrativaSchemaCreate } from "../schemas";

export function useDesignacionAdministrativaFormCreate() {
	const form = useForm<
		DesignacionAdministrativaFormValues,
		undefined,
		DesignacionAdministrativaCreateDTO
	>({
		resolver: zodResolver(designacionAdministrativaSchemaCreate),
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
