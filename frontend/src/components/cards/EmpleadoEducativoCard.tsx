import { EmpleadoEducativoResponseDTO } from "@/utils/types";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  User,
  XCircle,
} from "lucide-react";
import "./empleadoEducativoCard.css";

type Props = {
  empleado: EmpleadoEducativoResponseDTO;
  roles?: string[];
  onVerDetalle?: (id: number) => void;
};

export function EmpleadoEducativoCard({
  empleado,
  roles = [],
  onVerDetalle,
}: Props) {
  const { id, apellido, nombre, cuil, activo, fechaDeIngreso } = empleado;

  console.log(id, nombre, apellido, cuil, activo, fechaDeIngreso);

  return (
    <article className={`empleado-card ${activo ? "activo" : "inactivo"}`}>
      {/* ================= HEADER ================= */}
      <div className="card-section card-header">
        {/* FILA SUPERIOR */}
        <div className="header-top">
          {/* Nombre / Apellido */}
          <div className="header-nombre">
            <div className="nombre-row">
              <User size={18} />
              <div className="nombre-col">
                <span className="empleado-apellido">{apellido}</span>
                <span className="empleado-nombre">{nombre}</span>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="header-estado">
            <span className={`estado-pill ${activo ? "on" : "off"}`}>
              {activo ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
              {activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        {/* FILA INFERIOR */}
        <div className="header-bottom">
          <span className="empleado-cuil">{cuil}</span>
        </div>
      </div>

      {/* ================= INFO ================= */}
      <div className="card-divider" />

      <section className="card-section info">
        <Calendar size={16} />
        <div>
          <span className="dato-label">Ingreso</span>
          <span className="dato-valor">
            {new Date(fechaDeIngreso).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </section>

      <div className="card-divider" />

      {/* ================= ROLES ================= */}
      <section className="card-section roles">
        <span className="roles-title">Roles</span>

        {roles.length > 0 ? (
          <div className="roles-list">
            {roles.map((rol) => (
              <span key={rol} className="rol-chip">
                {rol}
              </span>
            ))}
          </div>
        ) : (
          <span className="roles-empty">Sin roles asignados</span>
        )}
      </section>

      <div className="card-divider" />

      {/* ================= FOOTER ================= */}
      <footer className="card-section footer">
        <button onClick={() => onVerDetalle?.(id)}>
          Ver detalles <ArrowRight size={16} />
        </button>
      </footer>
    </article>
  );
}
