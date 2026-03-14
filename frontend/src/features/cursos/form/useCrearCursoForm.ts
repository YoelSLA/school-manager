import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	type CrearCursoFormValues,
	crearCursoSchema,
} from "./crearCurso.schema";

export function useCrearCursoForm() {
	const form = useForm<CrearCursoFormValues>({
		resolver: zodResolver(crearCursoSchema),
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
