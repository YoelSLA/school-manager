import { EmpleadoEducativo } from "../types/types";
import "./empleadoCard.css";

interface Props {
  empleado: EmpleadoEducativo;
  onVerDetalles: () => void;
}

export default function EmpleadoCard({ empleado, onVerDetalles }: Props) {
  const rolClass = empleado.rol.toLowerCase();

  return (
    <div className="empleado-card">
      {/* CUIL */}
      <div className="empleado-cuil">
        {empleado.cuil}
      </div>

      {/* Nombre */}
      <h3 className="empleado-nombre">
        {empleado.apellido}, {empleado.nombre}
      </h3>

      {/* Fecha ingreso */}
      <div className="empleado-ingreso">
        Ingreso:{" "}
        {new Date(empleado.fechaDeIngreso).toLocaleDateString("es-AR")}
      </div>

      {/* Rol con color */}
      <div className="empleado-roles">
        <span className={`rol-pill ${rolClass}`}>
          {empleado.rol.replace(/_/g, " ")}
        </span>
      </div>

      {/* Footer */}
      <div className="empleado-footer">
        <button className="ver-detalles" onClick={onVerDetalles}>
          Ver detalles →
        </button>
      </div>
    </div>
  );
}
