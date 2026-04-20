import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type {
	DesignacionCursoFormValues,
	MateriaNombreDTO,
} from "@/utils/types";

type Props = {
	register: UseFormRegister<DesignacionCursoFormValues>;
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
		<FormSelectField<DesignacionCursoFormValues>
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