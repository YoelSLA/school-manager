import { useMemo } from "react";
import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/FormSelectField/FormSelectField";
import { ordenarCursos } from "@/features/cursos/utils/cursos.utils";
import type {
	CursoDetalleDTO,
	DesignacionCursoFormValues,
} from "@/shared/types";
import { TURNO_LABELS } from "@/shared/utils/enumLabels";

type Props = {
	register: UseFormRegister<DesignacionCursoFormValues>;
	cursos: CursoDetalleDTO[];
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
		<FormSelectField<DesignacionCursoFormValues>
			label="Curso"
			name="cursoId"
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
