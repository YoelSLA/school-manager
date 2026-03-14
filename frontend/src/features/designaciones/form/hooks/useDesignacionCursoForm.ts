import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { CursoNombreDTO } from "@/features/cursos/types/cursos.types";
import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";
import { Dia } from "@/utils/types";
import type { DesignacionCursoFormValues } from "../designacion.form.types";
import { crearDesignacionCursoSchema } from "../schemas/crearDesignacionCurso.schema";

type Props = {
	materias?: MateriaNombreDTO[];
	cursos?: CursoNombreDTO[];
	orientaciones?: string[];
};

export function useDesignacionCursoForm({
	materias,
	cursos,
	orientaciones,
}: Props) {
	const form = useForm<DesignacionCursoFormValues>({
		resolver: zodResolver(crearDesignacionCursoSchema),
		defaultValues: DESIGNACION_CURSO_DEFAULTS,
	});

	const { setValue, getValues } = form;

	const franjas = useFieldArray<DesignacionCursoFormValues, "franjasHorarias">({
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
	}, [materias, setValue, getValues]);

	useEffect(() => {
		if (!cursos?.length) return;

		if (!getValues("cursoId")) {
			setValue("cursoId", cursos[0].id);
		}
	}, [cursos, setValue, getValues]);

	useEffect(() => {
		if (!orientaciones?.length) return;

		if (!getValues("orientacion")) {
			setValue("orientacion", orientaciones[0]);
		}
	}, [orientaciones, setValue, getValues]);

	return {
		form,
		franjas,
	};
}

const DESIGNACION_CURSO_DEFAULTS: DesignacionCursoFormValues = {
	cupof: undefined,
	materiaId: 1,
	cursoId: 1,
	orientacion: "",
	franjasHorarias: [
		{
			dia: Dia.LUNES,
			horaDesde: "08:00",
			horaHasta: "12:00",
		},
	],
};
