import type { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";
import { formatearFecha } from "@/utils";
import Badge from "@/components/Badge";
import { ESTADO_ASIGNACION_BADGE } from "@/features/asignaciones/utils/asignacion.badges";
import styles from "./CargoRow.module.scss";
import SituacionRevistaBadge from "@/features/asignaciones/components/SituacionRevistaBadge/SituacionRevistaBadge";

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
  } = cargo;

  const { fechaDesde, fechaHasta } = periodo;

  const esBaja = estadoAsignacion === "BAJA";

  return (
    <div className={styles.row}>
      {/* Línea principal */}
      <div className={styles.main}>
        <SituacionRevistaBadge value={situacionDeRevista} />

        <div className={styles.periodo}>
          <span>{formatearFecha(fechaDesde)}</span>
          <span className={styles.arrow}>→</span>
          <span>{fechaHasta ? formatearFecha(fechaHasta) : "—"}</span>
        </div>

        <Badge variant={ESTADO_ASIGNACION_BADGE[estadoAsignacion]}>
          {estadoAsignacion}
        </Badge>
      </div>

      {/* Línea secundaria solo si BAJA */}
      {esBaja && (
        <div className={styles.baja}>
          <span className={styles.bajaLabel}>
            Baja:
          </span>
          <span>
            {formatearFecha(fechaBaja)}
          </span>
          <span className={styles.dot}>·</span>
          <span className={styles.bajaLabel}>
            Motivo:
          </span>
          <span className={styles.bajaMotivo}>
            {causaBaja}
          </span>
        </div>
      )}
    </div>
  );
}
