import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type {
	DesignacionAdministrativaDetalleDTO,
	DesignacionAdministrativaFormValues,
	DesignacionAdministrativaUpdateDTO,
} from "../../types";
import { designacionAdministrativaSchemaUpdate } from "../schemas";

type Props = {
	designacion: DesignacionAdministrativaDetalleDTO;
};

export function useDesignacionAdministrativaFormUpdate({ designacion }: Props) {
	const form = useForm<
		DesignacionAdministrativaFormValues,
		undefined,
		DesignacionAdministrativaUpdateDTO
	>({
		resolver: zodResolver(designacionAdministrativaSchemaUpdate),
		defaultValues: {
			cupof: designacion.cupof,
			rolEducativo: designacion.rolEducativo,
			franjasHorarias: designacion.franjasHorarias ?? [],
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
