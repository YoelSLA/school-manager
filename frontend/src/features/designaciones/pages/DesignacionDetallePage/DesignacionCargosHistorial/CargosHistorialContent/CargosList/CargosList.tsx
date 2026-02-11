import type { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";
import CargoRow from "./CargoRow";

export function CargosList({ cargos }: { cargos: AsignacionDetalleDTO[] }) {
  return (
    <div>
      {cargos.map((cargo) => (
        <CargoRow
          key={cargo.id}
          cargo={cargo}
        />
      ))}
    </div>
  );
}
