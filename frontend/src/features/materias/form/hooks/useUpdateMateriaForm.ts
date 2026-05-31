import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { materiaUpdateSchema } from "@/features/materias/form/schemas/materiaUpdateschema";
import type { MateriaUpdateFormValues } from "@/shared/utils/types";

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
