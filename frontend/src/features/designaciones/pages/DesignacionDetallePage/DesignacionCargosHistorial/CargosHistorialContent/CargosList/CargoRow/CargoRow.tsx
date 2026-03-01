import type { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";
import { formatearFecha } from "@/utils";
import Badge from "@/components/Badge";
import { ESTADO_ASIGNACION_BADGE } from "@/features/asignaciones/utils/asignacion.badges";
import styles from "./CargoRow.module.scss";
import SituacionRevistaBadge from "@/features/asignaciones/components/SituacionRevistaBadge/SituacionRevistaBadge";
import { User } from "lucide-react";

type Props = {
  cargo: AsignacionDetalleDTO;
};

export default function CargoRow({ cargo }: Props) {
  const {
    situacionDeRevista,
    periodo,
    estadoAsignacion,
    fechaBaja,
    causaBaja,
    empleado,
  } = cargo;

  const { fechaDesde, fechaHasta } = periodo;

  const esBaja = estadoAsignacion === "BAJA";

  return (
    <div className={styles.row}>
      {/* Línea principal */}
      <div className={styles.main}>
        {/* Empleado */}
        <div className={styles.empleado}>
          <div className={styles.empleadoHeader}>
            <User size={14} />
            <span className={styles.nombre}>
              {empleado.apellido}, {empleado.nombre}
            </span>
          </div>
          <span className={styles.cuil}>{empleado.cuil}</span>
        </div>

        {/* Situación */}
        <SituacionRevistaBadge value={situacionDeRevista} />

        {/* Período */}
        <div className={styles.periodo}>
          <span>{formatearFecha(fechaDesde)}</span>
          <span className={styles.arrow}>→</span>
          <span>
            {fechaHasta ? formatearFecha(fechaHasta) : "—"}
          </span>
        </div>

        {/* Estado */}
        <Badge variant={ESTADO_ASIGNACION_BADGE[estadoAsignacion]}>
          {estadoAsignacion}
        </Badge>
      </div>

      {/* Línea secundaria solo si BAJA */}
      {esBaja && (
        <div className={styles.baja}>
          <span className={styles.bajaLabel}>Baja:</span>
          <span>{fechaBaja ? formatearFecha(fechaBaja) : "—"}</span>

          <span className={styles.dot}>·</span>

          <span className={styles.bajaLabel}>Motivo:</span>
          <span className={styles.bajaMotivo}>
            {causaBaja ?? "—"}
          </span>
        </div>
      )}
    </div>
  );
}