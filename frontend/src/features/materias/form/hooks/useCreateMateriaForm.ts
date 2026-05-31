import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { materiaCreateSchema } from "@/features/materias/form/schemas/materiaCreate.schema";
import type { MateriaCreateFormValues } from "@/shared/utils/types";

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
