import DesignacionAdministrativaCargosModal from "@/components/modals/DesignacionAdministrativaCargosModal";
import { formatearHora } from "@/utils";
import { DesignacionAdministrativaResponseDTO } from "@/utils/types";
import { useState } from "react";
import "./designacionAdministrativaCard.css";

type Props = {
  designacion: DesignacionAdministrativaResponseDTO;
};

export default function DesignacionAdministrativaCard({ designacion }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="designacion-admin-card">
        {/* HEADER */}
        <div className="card-header">
          <span className="cupof">#{designacion.cupof}</span>
          <span className="rol-pill">{designacion.rolEducativo}</span>
        </div>

        {/* HORARIOS */}
        <table className="horarios-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Desde</th>
              <th>Hasta</th>
            </tr>
          </thead>
          <tbody>
            {designacion.franjasHorarias.map((franja, index) => (
              <tr key={index}>
                <td>{franja.dia}</td>
                <td>{formatearHora(franja.horaDesde)}</td>
                <td>{formatearHora(franja.horaHasta)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ACTION */}
        <div className="card-actions">
          <button className="ver-cargos-btn" onClick={() => setOpen(true)}>
            Ver cargos
          </button>
        </div>
      </div>

      {open && (
        <DesignacionAdministrativaCargosModal
          designacionId={designacion.id}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
