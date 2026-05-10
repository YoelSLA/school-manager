import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type {
	CursoNombreDTO,
	DesignacionCursoFormValues,
	DesignacionCursoUpdateDTO,
	DesignacionDetalleDTO,
	MateriaNombreDTO,
} from "@/utils/types";
import { editarDesignacionCursoSchema } from "../schemas/editarDesignacionCurso.schema";

type Props = {
	designacion?: DesignacionDetalleDTO;
	materias?: MateriaNombreDTO[];
	cursos?: CursoNombreDTO[];
};

export function useEditarDesignacionCursoForm({
	designacion,
	materias,
	cursos,
}: Props) {
	const form = useForm<
		DesignacionCursoFormValues,
		undefined,
		DesignacionCursoUpdateDTO
	>({
		resolver: zodResolver(editarDesignacionCursoSchema),
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

		if (!materias || !cursos) {
			return;
		}

		const materiaEncontrada = materias.find(
			(m) => m.nombre === designacion.materia,
		);

		const cursoEncontrado = cursos.find(
			(c) => c.division === designacion.curso,
		);

		reset({
			cupof: designacion.cupof,
			materiaId: materiaEncontrada?.id,
			cursoId: cursoEncontrado?.id,
			orientacion: designacion.orientacion ?? "",
			franjasHorarias: designacion.franjasHorarias ?? [],
		});
	}, [designacion, materias, cursos, reset]);

	return {
		form,
		franjas,
	};
}
