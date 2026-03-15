import { useMemo } from "react";
import type { UseFormRegister } from "react-hook-form";

import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import {
	ordenarCursos,
	TURNO_LABELS,
} from "@/features/cursos/utils/cursos.utils";
import { CursoNombreDTO, DesignacionCursoCreateDTO } from "@/utils/types";

type Props = {
	register: UseFormRegister<DesignacionCursoCreateDTO>;
	cursos: CursoNombreDTO[];
	isLoading?: boolean;
	error?: string;
};

export default function CursoSelectField({
	register,
	cursos,
	isLoading = false,
	error,
}: Props) {
	const cursosOrdenados = useMemo(() => {
		if (isLoading) return [];
		return cursos.slice().sort(ordenarCursos);
	}, [cursos, isLoading]);

	return (
		<FormSelectField
			label="Curso"
			name={"cursoId"}
			register={register}
			disabled={isLoading}
			error={error}
		>
			{isLoading && <option>Cargando cursos...</option>}

			{!isLoading &&
				cursosOrdenados.map((curso) => (
					<option key={curso.id} value={curso.id}>
						{curso.division} - {TURNO_LABELS[curso.turno] ?? curso.turno}
					</option>
				))}
		</FormSelectField>
	);
}
