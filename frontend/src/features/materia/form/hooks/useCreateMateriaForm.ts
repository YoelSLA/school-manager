import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { MateriaCreateDTO, MateriaCreateFormValues } from "../../types";
import { materiaCreateSchema } from "../schemas/materiaCreate.schema";

export function useCreateMateriaForm(
	onSubmit: (data: MateriaCreateDTO) => void,
) {
	const form = useForm<MateriaCreateFormValues>({
		resolver: zodResolver(materiaCreateSchema),
		defaultValues: {
			nombre: "",
			abreviatura: "",
			cantidadModulos: 1,
		},
	});

	const handleFormSubmit = form.handleSubmit((data) => {
		onSubmit({
			nombre: data.nombre,
			abreviatura: data.abreviatura,
			cantidadModulos: Number(data.cantidadModulos),
		});
	});

	return {
		register: form.register,
		errors: form.formState.errors,
		handleFormSubmit,
	};
}
