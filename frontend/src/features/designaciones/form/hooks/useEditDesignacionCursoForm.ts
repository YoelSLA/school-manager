import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { CursoNombreDTO } from "@/features/cursos/types/cursos.types";

import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";
import type { DesignacionDetalleDTO } from "../../types/designacion.types";
import type { EditarDesignacionCursoFormValues } from "../designacion.form.types";
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
	const form = useForm<EditarDesignacionCursoFormValues>({
		resolver: zodResolver(editarDesignacionCursoSchema),
	});

	const { reset } = form;

	const franjas = useFieldArray<
		EditarDesignacionCursoFormValues,
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
