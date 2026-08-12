import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Turno } from "@/shared/types";
import type { CursoCreateFormValues } from "../../types";
import { cursoCreateSchema } from "../schemas/cursoCreate.schema";

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
