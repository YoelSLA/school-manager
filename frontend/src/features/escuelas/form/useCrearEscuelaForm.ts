import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearEscuelaSchema } from "./crearEscuela.schema";
import { CREAR_ESCUELA_DEFAULTS } from "./escuela.defaults";
import type { EscuelaFormInput, EscuelaFormOutput } from "./escuela.form.types";

export function useCrearEscuelaForm() {
	const form = useForm<EscuelaFormInput, unknown, EscuelaFormOutput>({
		resolver: zodResolver(crearEscuelaSchema),
		defaultValues: CREAR_ESCUELA_DEFAULTS,
	});

	return {
		form,
	};
}
