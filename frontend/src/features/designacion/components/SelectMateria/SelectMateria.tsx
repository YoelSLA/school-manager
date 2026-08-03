import type { SelectHTMLAttributes } from "react";
import type { MateriaNombreDTO } from "@/features/materia";
import Select from "@/shared/components/Select";

type Props = {
  materias: MateriaNombreDTO[];
  isLoading?: boolean;
  invalid?: boolean;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "children" | "label">;

export default function SelectMateria({
  materias,
  isLoading = false,
  invalid = false,
  ...props
}: Props) {
  return (
    <Select
      label="Materia"
      disabled={isLoading}
      invalid={invalid}
      {...props}
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