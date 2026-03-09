import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type { DesignacionAdministrativaFormValues } from "../designacion.form.types";
import { crearDesignacionAdministrativaSchema } from "../schemas/crearDesignacionAdministrativa.schema";
import { Dia } from "@/utils/types";
import { RolEducativo } from "../../types/designacion.types";

export function useDesignacionAdministrativaForm() {
	const form = useForm<DesignacionAdministrativaFormValues>({
		resolver: zodResolver(crearDesignacionAdministrativaSchema),
		defaultValues: DESIGNACION_ADMINISTRATIVA_DEFAULTS,
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

const DESIGNACION_ADMINISTRATIVA_DEFAULTS: DesignacionAdministrativaFormValues = {
	cupof: undefined,
	rolEducativo: RolEducativo.AUXILIAR,
	franjasHorarias: [
		{
			dia: Dia.LUNES,
			horaDesde: "08:00",
			horaHasta: "12:00",
		},
	],
};