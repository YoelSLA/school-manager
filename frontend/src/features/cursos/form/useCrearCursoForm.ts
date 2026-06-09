import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cursoCreateSchema } from "@/features/cursos/form/cursoCreate.schema";
import { type CursoCreateFormValues, Turno } from "@/shared/types";

export function useCrearCursoForm() {
	const form = useForm<CursoCreateFormValues>({
		resolver: zodResolver(cursoCreateSchema),
		defaultValues: {
			turno: Turno.MANIANA,
			anio: 1,
			grado: 1,
		},
	});

	return {
		form,
	};
}
