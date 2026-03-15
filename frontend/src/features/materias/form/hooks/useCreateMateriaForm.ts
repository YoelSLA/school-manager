import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { crearMateriaSchema } from "../schemas/crearMateria.schema";
import { MateriaCreateDTO } from "@/utils/types";

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
