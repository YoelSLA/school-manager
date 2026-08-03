import type { SelectHTMLAttributes } from "react";

import type { CursoSelectDTO } from "@/features/curso/types";

import Select from "@/shared/components/Select";

type Props = {
  cursos: CursoSelectDTO[];
  isLoading?: boolean;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "label">;

export default function SelectCurso({
  cursos,
  isLoading = false,
  ...props
}: Props) {
  return (
    <Select
      label="Curso"
      disabled={isLoading}
      {...props}
    >
      <option value="">
        {isLoading ? "Cargando cursos..." : "Seleccione un curso"}
      </option>

      {!isLoading &&
        cursos.map((curso) => (
          <option key={curso.id} value={curso.id}>
            {curso.nombre}
          </option>
        ))}
    </Select>
  );
}