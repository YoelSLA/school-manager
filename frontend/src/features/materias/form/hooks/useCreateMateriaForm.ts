import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { MateriaCreateDTO } from "@/utils/types";
import { crearMateriaSchema } from "../schemas/crearMateria.schema";

export function useMateriaForm() {
	const form = useForm<MateriaCreateDTO>({
		resolver: zodResolver(crearMateriaSchema),
		defaultValues: {
			nombre: "",
			abreviatura: "",
			cantidadModulos: 1,
		},
	});

	return {
		form,
	};
}
