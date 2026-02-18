import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearCursoSchema } from "./crearCurso.schema";
import type {
	CrearCursoFormInput,
	CrearCursoFormOutput,
} from "./curso.form.types";
import { CURSO_DEFAULTS } from "./curso.default";

export function useCrearCursoForm() {
	const form = useForm<CrearCursoFormInput, unknown, CrearCursoFormOutput>({
		resolver: zodResolver(crearCursoSchema),
		defaultValues: CURSO_DEFAULTS,
	});

	return {
		form,
	};
}
