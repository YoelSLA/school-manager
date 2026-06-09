import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import type {
	DesignacionAdministrativaDetalleDTO,
	DesignacionAdministrativaFormValues,
	DesignacionAdministrativaUpdateDTO,
} from "@/shared/types";
import { updateDesignacionAdministrativaSchema } from "../schemas/updateDesignacionAdministrativa.schema";

type Props = {
	designacion: DesignacionAdministrativaDetalleDTO;
};

export function useUpdateDesignacionAdministrativaForm({ designacion }: Props) {
	const form = useForm<
		DesignacionAdministrativaFormValues,
		undefined,
		DesignacionAdministrativaUpdateDTO
	>({
		resolver: zodResolver(updateDesignacionAdministrativaSchema),
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
