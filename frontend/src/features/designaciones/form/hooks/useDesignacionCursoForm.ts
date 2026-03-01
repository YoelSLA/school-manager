import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DESIGNACION_CURSO_DEFAULTS } from "../defaults/designacionCurso.defaults";
import { crearDesignacionCursoSchema } from "../schemas/crearDesignacionCurso.schema";
import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";
import type { CursoNombreDTO } from "@/features/cursos/types/cursos.types";
import type { DesignacionCursoFormValues } from "../../types/designacion.types";

type Props = {
	materias?: MateriaNombreDTO[];
	cursos?: CursoNombreDTO[];
};

export function useDesignacionCursoForm({
	materias,
	cursos,
}: Props) {
	const form = useForm<DesignacionCursoFormValues>({
		resolver: async (values, context, options) => {
			try {
				return await zodResolver(crearDesignacionCursoSchema)(
					values,
					context,
					options
				);
			} catch (error) {
				console.log("🔥 ZOD RAW ERROR:", error);

				if (error instanceof Error) {
					console.log("Mensaje:", error.message);
				}

				if (error && typeof error === "object" && "issues" in error) {
					console.log("Issues:", (error as any).issues);
				}

				throw error;
			}
		},
		defaultValues: DESIGNACION_CURSO_DEFAULTS,
	});

	const { setValue, getValues } = form;

	const franjas = useFieldArray({
		control: form.control,
		name: "franjasHorarias",
	});

	console.log("📚 materias:", materias);

	useEffect(() => {
		const subscription = form.watch((values) => {
			console.log("👀 WATCH VALUES:", values);
			console.log("👀 TYPEOF CUPOF EN WATCH:", typeof values.cupof);
		});

		return () => subscription.unsubscribe();
	}, [form]);

	useEffect(() => {
		if (!materias?.length) return;

		const biologia = materias.find(
			(m) => m.nombre.toLowerCase() === "biología",
		);

		if (!biologia) return;

		if (!getValues("materiaId")) {
			setValue("materiaId", String(biologia.id));
		}
	}, [materias, setValue, getValues]);

	useEffect(() => {
		if (!cursos?.length) return;

		if (!getValues("cursoId")) {
			setValue("cursoId", String(cursos[0].id));
		}
	}, [cursos, setValue, getValues]);

	return {
		form,
		franjas,
	};
}
