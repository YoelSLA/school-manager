import type { LicenciaResumenDTO } from "../../types/licencia.types";
import styles from "./LicenciaCard.module.scss";

import Card from "@/components/Card/Card";
import EmpleadoInfo from "@/components/EmpleadoInfo";
import { ESTADO_LICENCIA_BADGE } from "../../utils/licencia.bagdes";
import Badge from "@/components/Badge";
import { formatearFecha } from "@/utils";
import { Calendar, Flag, Hourglass } from "lucide-react";

type Props = {
  licencia: LicenciaResumenDTO;
  onVerDetalle: (licenciaId: number) => void;
};

export default function LicenciaCard({ licencia, onVerDetalle }: Props) {
  const { fechaDesde, fechaHasta, dias } = licencia.periodo;

  const status =
    licencia.estadoLicencia === "CUBIERTA"
      ? "success"
      : "danger";

  return (
    <Card
      className={styles.card}
      status={status}
      elevated
      clickable
      largeRadius
      onClick={() => onVerDetalle(licencia.id)}
      viewTransitionName={`licencia-${licencia.id}`}
    >
      <div className={styles.header}>
        <div className={styles.tipoPill}>
          <span className={styles.codigo}>
            {licencia.normativa.codigo}
          </span>
        </div>

        <Badge variant={ESTADO_LICENCIA_BADGE[licencia.estadoLicencia]}>
          {licencia.estadoLicencia}
        </Badge>
      </div>

      <div className={styles.divider} />

      <div className={styles.empleado}>
        <EmpleadoInfo empleado={licencia.empleado} />
      </div>

      <div className={styles.divider} />

      <div className={styles.fechas}>
        <div className={styles.fechaItem}>
          <Calendar size={16} className={styles.icon} />

          <div>
            <span className={styles.label}>Inicio</span>
            <span className={styles.valor}>
              {formatearFecha(fechaDesde)}
            </span>
          </div>
        </div>

        <div className={styles.fechaItem}>
          <Flag size={16} className={styles.icon} />

          <div>
            <span className={styles.label}>Fin</span>
            <span className={styles.valor}>
              {fechaHasta
                ? formatearFecha(fechaHasta)
                : "Sin fecha de finalización"}
            </span>
          </div>
        </div>

        <div className={styles.fechaItem}>
          <Hourglass size={16} className={styles.icon} />

          <div>
            <span className={styles.label}>Duración</span>
            <span className={styles.valor}>
              {dias ?? "—"} días
            </span>
          </div>
        </div>
      </div>

    </Card>
  );
}