import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { DESIGNACION_ADMINISTRATIVA_DEFAULTS } from "../defaults/designacionAdministrativa.defaults";
import type {
	DesignacionAdministrativaFormInput,
	DesignacionAdministrativaFormOutput,
} from "../designacion.form.types";
import { crearDesignacionAdministrativaSchema } from "../schemas/crearDesignacionAdministrativa.schema";

export function useDesignacionAdministrativaForm() {
	const form = useForm<
		DesignacionAdministrativaFormInput,
		unknown,
		DesignacionAdministrativaFormOutput
	>({
		resolver: zodResolver(crearDesignacionAdministrativaSchema),
		defaultValues: DESIGNACION_ADMINISTRATIVA_DEFAULTS,
	});

	const franjas = useFieldArray<
		DesignacionAdministrativaFormInput,
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
