import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { MateriaUpdateDTO, MateriaUpdateFormValues } from "../../types";
import { materiaUpdateSchema } from "../schemas/materiaUpdate.schema";

type Props = {
	materia: MateriaUpdateDTO;
	onSubmit: (data: MateriaUpdateDTO) => void;
};

export function useUpdateMateriaForm({ materia, onSubmit }: Props) {
	const form = useForm<MateriaUpdateFormValues>({
		resolver: zodResolver(materiaUpdateSchema),
		defaultValues: materia,
	});

	useEffect(() => {
		form.reset(materia);
	}, [materia, form]);

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
