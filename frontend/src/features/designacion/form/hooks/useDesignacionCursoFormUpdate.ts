import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type {
	DesignacionCursoFormValues,
	DesignacionCursoUpdateDTO,
	DesignacionDetalleDTO,
} from "../../types";
import { designacionCursoSchemaUpdate } from "../schemas";

type Props = {
	designacion?: DesignacionDetalleDTO;
};

export function useDesignacionCursoFormUpdate({ designacion }: Props) {
	const form = useForm<
		DesignacionCursoFormValues,
		undefined,
		DesignacionCursoUpdateDTO
	>({
		resolver: zodResolver(designacionCursoSchemaUpdate),
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
