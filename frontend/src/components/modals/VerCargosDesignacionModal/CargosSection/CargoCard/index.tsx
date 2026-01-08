import { AsignacionDetalleDTO } from "@/utils/types/asignacion";
import "./cargoCard.css";

type Props = {
  asignacion: AsignacionDetalleDTO;
};

export function CargoCard({ asignacion }: Props) {
  const estadoTexto = asignacion.disponible
    ? "Disponible"
    : asignacion.situacionDeRevista;

  return (
    <li className="cargo-card">
      {/* HEADER */}
      <div className="cargo-card__header">
        <span className="cargo-card__empleado">
          {asignacion.empleado.apellido}, {asignacion.empleado.nombre}
        </span>

        <span
          className={`cargo-card__estado ${
            asignacion.disponible ? "disponible" : "ocupado"
          }`}
        >
          {estadoTexto}
        </span>
      </div>

      {/* BODY */}
      <div className="cargo-card__body">
        <div className="cargo-card__fechas">
          <span>
            <strong>Desde:</strong> {asignacion.fechaTomaPosesion}
          </span>

          {asignacion.fechaCese && (
            <span>
              <strong>Hasta:</strong> {asignacion.fechaCese}
            </span>
          )}
        </div>

        {asignacion.fechaBaja && (
          <div className="cargo-card__baja">
            Baja: {asignacion.fechaBaja}
            {asignacion.causaBaja && ` (${asignacion.causaBaja})`}
          </div>
        )}
      </div>
    </li>
  );
}
