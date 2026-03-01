import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearMateriaSchema } from "../schemas/crearMateria.schema";
import { MATERIA_DEFAULTS } from "../materias.defaults";
import type { CrearMateriaFormValues } from "../materias.form.types";

export function useMateriaForm() {
	const form = useForm<CrearMateriaFormValues>({
		resolver: zodResolver(crearMateriaSchema),
		defaultValues: MATERIA_DEFAULTS,
	});

	return {
		form,
	};
}
