import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import { DesignacionCursoCreateDTO, MateriaNombreDTO } from "@/utils/types";

type Props = {
	register: UseFormRegister<DesignacionCursoCreateDTO>;
	materias: MateriaNombreDTO[];
	isLoading?: boolean;
	error?: string;
};

export default function MateriaSelectField({
	register,
	materias,
	isLoading = false,
	error,
}: Props) {
	return (
		<FormSelectField
			label="Materia"
			name="materiaId"
			register={register}
			disabled={isLoading}
			error={error}
		>
			{isLoading && <option>Cargando materias...</option>}

			{!isLoading &&
				materias.map((materia) => (
					<option key={materia.id} value={materia.id}>
						{materia.nombre}
					</option>
				))}
		</FormSelectField>
	);
}
