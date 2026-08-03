import type { UseFormRegister } from "react-hook-form";

import type { DesignacionCursoFormValues } from "@/features/designacion/types";
import type { MateriaNombreDTO } from "@/features/materia";

import Select from "@/shared/components/Select";

type Props = {
  materias: MateriaNombreDTO[];
  register: UseFormRegister<DesignacionCursoFormValues>;
  invalid?: boolean;
  isLoading?: boolean;
};

export default function FormSelectMateria({
  materias,
  register,
  invalid = false,
  isLoading = false,
}: Props) {
  return (
    <Select
      label="Materia"
      disabled={isLoading}
      invalid={invalid}
      {...register("materiaId")}
    >
      <option value="" disabled>
        {isLoading ? "Cargando materias..." : "Seleccione una materia"}
      </option>

      {!isLoading &&
        materias.map((materia) => (
          <option key={materia.id} value={materia.id}>
            {materia.nombre}
          </option>
        ))}
    </Select>
  );
}