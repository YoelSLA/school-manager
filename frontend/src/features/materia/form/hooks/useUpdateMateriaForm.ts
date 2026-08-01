import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { MateriaUpdateFormValues } from "../../types";
import { materiaUpdateSchema } from "../schemas/materiaUpdate.schema";

type Props = {
	materia: MateriaUpdateFormValues;
};

export function useUpdateMateriaForm({ materia }: Props) {
	const form = useForm<MateriaUpdateFormValues>({
		resolver: zodResolver(materiaUpdateSchema),
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
