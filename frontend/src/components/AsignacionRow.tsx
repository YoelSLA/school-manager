import { AsignacionSimpleResponseDTO } from "@/utils/types";
import "./asignacionRow.css";

type Props = {
  asignacion: AsignacionSimpleResponseDTO;
};

export default function AsignacionRow({ asignacion }: Props) {
  return (
    <div className="asignacion-row">
      <span className="pill pill-cuil">{asignacion.empleado.cuil}</span>

      <span className="pill pill-nombre">
        {asignacion.empleado.apellido}, {asignacion.empleado.nombre}
      </span>

      <span className="pill pill-situacion">
        {asignacion.situacionDeRevista}
      </span>

      <span className="pill pill-fecha">{asignacion.fechaTomaPosesion}</span>

      <span className="pill pill-fecha">{asignacion.fechaCese ?? "—"}</span>

      <span className={`pill ${asignacion.vigente ? "pill-ok" : "pill-off"}`}>
        {asignacion.vigente ? "Vigente" : "Finalizada"}
      </span>

      <span
        className={`pill ${asignacion.enLicencia ? "pill-warn" : "pill-ok"}`}
      >
        {asignacion.enLicencia ? "Licencia" : "Activa"}
      </span>

      <span className={`pill ${asignacion.cubierta ? "pill-ok" : "pill-warn"}`}>
        {asignacion.cubierta ? "Cubierta" : "Sin cubrir"}
      </span>
    </div>
  );
}
