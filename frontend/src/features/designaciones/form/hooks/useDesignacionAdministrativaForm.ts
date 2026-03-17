import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { crearDesignacionAdministrativaSchema } from "../schemas/crearDesignacionAdministrativa.schema";
import { Dia, RolEducativo } from "@/utils/types/enums";
import type { DesignacionAdministrativaCreateDTO } from "@/utils/types";

export function useDesignacionAdministrativaForm() {
	const form = useForm<DesignacionAdministrativaCreateDTO>({
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
		DesignacionAdministrativaCreateDTO,
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

