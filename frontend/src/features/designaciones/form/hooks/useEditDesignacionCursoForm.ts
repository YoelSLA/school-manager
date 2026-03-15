import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { editarDesignacionCursoSchema } from "../schemas/editarDesignacionCurso.schema";
import { CursoNombreDTO, DesignacionCursoUpdateDTO, DesignacionDetalleDTO, MateriaNombreDTO } from "@/utils/types";

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
	const form = useForm<DesignacionCursoUpdateDTO>({
		resolver: zodResolver(editarDesignacionCursoSchema),
	});

	const { reset } = form;

	const franjas = useFieldArray<
		DesignacionCursoUpdateDTO,
		"franjasHorarias"
	>({
		control: form.control,
		name: "franjasHorarias",
	});

	useEffect(() => {
		if (!designacion) {
			return;
		}

		if (designacion.tipo !== "CURSO") {
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

		const materiaId = materiaEncontrada?.id;
		const cursoId = cursoEncontrado?.id;

		const dataReset = {
			cupof: designacion.cupof,
			materiaId,
			cursoId,
			orientacion: designacion.orientacion ?? "",
			franjasHorarias: designacion.franjasHorarias ?? [],
		};

		reset(dataReset);
	}, [designacion, materias, cursos, reset]);

	return {
		form,
		franjas,
	};
}
