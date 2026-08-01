import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/FormSelectField/FormSelectField";
import type { DesignacionCursoFormValues } from "@/features/designacion/types/designacion.types";
import type { MateriaNombreDTO } from "@/features/materia";


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
