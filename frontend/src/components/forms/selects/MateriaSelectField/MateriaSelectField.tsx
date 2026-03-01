import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type { DesignacionCursoForm, } from "@/features/designaciones/form/designacion.form.types";
import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";

type Props = {
  register: UseFormRegister<DesignacionCursoForm>;
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
