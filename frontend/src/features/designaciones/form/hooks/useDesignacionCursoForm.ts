import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DESIGNACION_CURSO_DEFAULTS } from "../defaults/designacionCurso.defaults";
import type { DesignacionCursoFormInput, DesignacionCursoFormOutput } from "../designacion.form.types";
import { crearDesignacionCursoSchema } from "../schemas/crearDesignacionCurso.schema";
import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";
import type { CursoNombreDTO } from "@/features/cursos/types/cursos.types";

type Params = {
	materias?: MateriaNombreDTO[];
	cursos?: CursoNombreDTO[];
	orientaciones?: string[];
};

export function useDesignacionCursoForm({
	materias,
	cursos,
	orientaciones,
}: Params) {
	const form = useForm<
		DesignacionCursoFormInput,
		unknown,
		DesignacionCursoFormOutput
	>({
		resolver: zodResolver(crearDesignacionCursoSchema),
		defaultValues: DESIGNACION_CURSO_DEFAULTS,
	});

	const { setValue, getValues } = form;

	const franjas = useFieldArray<
		DesignacionCursoFormInput,
		"franjasHorarias"
	>({
		control: form.control,
		name: "franjasHorarias",
	});

	useEffect(() => {
		if (!materias?.length) return;

		const biologia = materias.find(
			(m) => m.nombre.toLowerCase() === "biología",
		);

		if (!biologia) return;

		if (!getValues("materiaId")) {
			setValue("materiaId", biologia.id);
		}
	}, [materias?.length]);

	useEffect(() => {
		if (!cursos?.length) return;

		if (!getValues("cursoId")) {
			setValue("cursoId", cursos[0].id);
		}
	}, [cursos?.length]);

	useEffect(() => {
		if (!orientaciones?.length) return;

		if (!getValues("orientacion")) {
			setValue("orientacion", orientaciones[0]);
		}
	}, [orientaciones?.length]);

	return {
		form,
		franjas,
	};
}
