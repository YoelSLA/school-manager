import { useMemo } from "react";
import type { UseFormRegister } from "react-hook-form";

import type { CursoDetalleDTO } from "@/features/curso/types";
import { ordenarCursos } from "@/features/curso/utils/cursos.utils";
import type { DesignacionCursoFormValues } from "@/features/designacion/types";
import Select from "@/shared/components/Select";
import { TURNO_LABELS } from "@/shared/utils/enumLabels";

type Props = {
  cursos: CursoDetalleDTO[];
  register: UseFormRegister<DesignacionCursoFormValues>;
  invalid?: boolean;
  isLoading?: boolean;
};

export default function FormSelectCurso({
  cursos,
  register,
  invalid = false,
  isLoading = false,
}: Props) {
  const cursosOrdenados = useMemo(
    () => [...cursos].sort(ordenarCursos),
    [cursos]
  );

  return (
    <Select
      label="Curso"
      disabled={isLoading}
      invalid={invalid}
      {...register("cursoId")}
    >
      <option value="" disabled>
        {isLoading ? "Cargando cursos..." : "Seleccione un curso"}
      </option>

      {!isLoading &&
        cursosOrdenados.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.division} - {TURNO_LABELS[curso.turno] ?? curso.turno}
          </option>
        ))}
    </Select>
  );
}