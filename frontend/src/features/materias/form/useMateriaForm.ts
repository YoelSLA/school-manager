import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearMateriaSchema } from "./crearMateria.schema";
import { MATERIA_DEFAULTS } from "./materias.defaults";
import type {
	CrearMateriaFormInput,
	CrearMateriaFormOutput,
} from "./materias.form.types";

export function useMateriaForm() {
	const form = useForm<CrearMateriaFormInput, unknown, CrearMateriaFormOutput>({
		resolver: zodResolver(crearMateriaSchema),
		defaultValues: MATERIA_DEFAULTS,
	});

	return {
		form,
	};
}
