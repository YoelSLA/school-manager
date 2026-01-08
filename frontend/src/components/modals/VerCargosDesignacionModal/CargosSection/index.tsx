import { AsignacionDetalleDTO } from "@/utils/types/asignacion";
import "../SectionBlock.css";
import { CargoCard } from "./CargoCard";
import "./cargosSection.css";

type Props = {
  asignaciones: AsignacionDetalleDTO[];
  onNuevo: () => void;
};

export function CargosSection({ asignaciones, onNuevo }: Props) {
  return (
    <section className="section-block">
      <div className="cargos-header">
        <h4 className="section-block__title">Cargos</h4>

        <button className="btn-primary" onClick={onNuevo}>
          + Nuevo cargo
        </button>
      </div>

      {asignaciones.length === 0 ? (
        <div className="empty-state">
          No hay cargos asociados a esta designación
        </div>
      ) : (
        <ul className="cargos-list">
          {asignaciones.map((a) => (
            <CargoCard key={a.id} asignacion={a} />
          ))}
        </ul>
      )}
    </section>
  );
}
