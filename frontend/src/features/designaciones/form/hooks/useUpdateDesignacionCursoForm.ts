import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type {
	DesignacionCursoFormValues,
	DesignacionCursoUpdateDTO,
	DesignacionDetalleDTO,
} from "@/shared/types";
import { updateDesignacionCursoSchema } from "../schemas/updateDesignacionCurso.schema";

type Props = {
	designacion?: DesignacionDetalleDTO;
};

export function useUpdateDesignacionCursoForm({ designacion }: Props) {
	const form = useForm<
		DesignacionCursoFormValues,
		undefined,
		DesignacionCursoUpdateDTO
	>({
		resolver: zodResolver(updateDesignacionCursoSchema),
	});

	const { reset } = form;

	const franjas = useFieldArray<DesignacionCursoFormValues, "franjasHorarias">({
		control: form.control,
		name: "franjasHorarias",
	});

	useEffect(() => {
		if (!designacion || designacion.tipo !== "CURSO") {
			return;
		}

		reset({
			cupof: designacion.cupof,
			materiaId: designacion.materia.id,
			cursoId: designacion.curso.id,
			orientacion: designacion.orientacion ?? "",
			franjasHorarias: designacion.franjasHorarias ?? [],
		});
	}, [designacion, reset]);

	return {
		form,
		franjas,
	};
}
