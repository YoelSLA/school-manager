import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type {
	CrearMateriaFormValues,
	EditarMateriaFormValues,
} from "../materias.form.types";
import { crearMateriaSchema } from "../schemas/crearMateria.schema";

type Props = {
	materia: CrearMateriaFormValues;
};

export function useEditMateriaForm({ materia }: Props) {
	const form = useForm<EditarMateriaFormValues>({
		resolver: zodResolver(crearMateriaSchema),
		defaultValues: materia,
	});

	const { reset } = form;

	useEffect(() => {
		reset(materia);
	}, [materia, reset]);

	return {
		form,
	};
}
