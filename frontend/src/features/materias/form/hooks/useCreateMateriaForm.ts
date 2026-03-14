import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MATERIA_DEFAULTS } from "../materias.defaults";
import type { CrearMateriaFormValues } from "../materias.form.types";
import { crearMateriaSchema } from "../schemas/crearMateria.schema";

export function useMateriaForm() {
	const form = useForm<CrearMateriaFormValues>({
		resolver: zodResolver(crearMateriaSchema),
		defaultValues: MATERIA_DEFAULTS,
	});

	return {
		form,
	};
}
