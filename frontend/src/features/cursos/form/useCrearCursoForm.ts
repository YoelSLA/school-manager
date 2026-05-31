import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cursoCreateSchema } from "@/features/cursos/form/crearCurso.schema";
import type { CursoCreateFormValues } from "@/shared/utils/types";

export function useCrearCursoForm() {
	const form = useForm<CursoCreateFormValues>({
		resolver: zodResolver(cursoCreateSchema),
		defaultValues: {
			turno: "MANIANA",
			anio: 1,
			grado: 1,
		},
	});

	return {
		form,
	};
}
