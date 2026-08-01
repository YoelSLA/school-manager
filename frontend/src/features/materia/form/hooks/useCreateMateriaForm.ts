import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { MateriaCreateFormValues } from "../../types";
import { materiaCreateSchema } from "../schemas/materiaCreate.schema";

export function useCreateMateriaForm() {
	const form = useForm<MateriaCreateFormValues>({
		resolver: zodResolver(materiaCreateSchema),
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
