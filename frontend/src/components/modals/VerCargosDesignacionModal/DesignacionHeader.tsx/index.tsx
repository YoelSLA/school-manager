import { DesignacionDetalleDTO } from "@/utils/types/designacion";
import "./DesignacionHeader.css";

type Props = {
  designacion: DesignacionDetalleDTO;
};

export function DesignacionHeader({ designacion }: Props) {
  return (
    <header className="designacion-header">
      <div className="header-main">
        <span className={`badge badge-${designacion.tipo.toLowerCase()}`}>
          {designacion.tipo === "ADMINISTRATIVA"
            ? "Administrativa"
            : "Por curso"}
        </span>

        <h2>
          #{designacion.cupof} · {designacion.rolEducativo}
        </h2>

        {!designacion.estaCubierta && (
          <span className="badge badge-warning">Pendiente</span>
        )}
      </div>

      {designacion.tipo === "CURSO" && (
        <div className="header-extra">
          <strong>{designacion.materia}</strong>
          <span>
            {designacion.curso} · {designacion.orientacion}
          </span>
        </div>
      )}
    </header>
  );
}
