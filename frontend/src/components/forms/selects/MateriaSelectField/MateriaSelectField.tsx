import type { UseFormRegister } from "react-hook-form";
import FormSelectField from "@/components/forms/FormSelectField/FormSelectField";
import type { DesignacionCursoFormInput, } from "@/features/designaciones/form/designacion.form.types";
import type { MateriaNombreDTO } from "@/features/materias/types/materias.types";

type Props = {
  register: UseFormRegister<DesignacionCursoFormInput>;
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
      registerOptions={{
        required: "Debe seleccionar una materia",
      }}
      disabled={isLoading}
      error={error}
    >
      {materias.map((materia) => (
        <option key={materia.id} value={materia.id}>
          {materia.nombre}
        </option>
      ))}
    </FormSelectField>
  );
}
