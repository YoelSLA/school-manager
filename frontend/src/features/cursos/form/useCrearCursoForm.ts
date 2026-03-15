import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearCursoSchema } from "./crearCurso.schema";
import { CrearCursoDTO } from "@/utils/types";

export function useCrearCursoForm() {
	const form = useForm<CrearCursoDTO>({
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
