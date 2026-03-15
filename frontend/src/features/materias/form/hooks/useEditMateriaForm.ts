import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MateriaUpdateDTO } from "@/utils/types";
import { editarMateriaSchema } from "../schemas/editarMateria.schema";

type Props = {
	materia: MateriaUpdateDTO;
};

export function useEditMateriaForm({ materia }: Props) {
	const form = useForm<MateriaUpdateDTO>({
		resolver: zodResolver(editarMateriaSchema),
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
