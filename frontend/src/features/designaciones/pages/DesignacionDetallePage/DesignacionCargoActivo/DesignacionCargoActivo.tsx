import type { AsignacionDetalleDTO } from "@/features/asignaciones/types/asignacion.types";
import {
  User,
} from "lucide-react";

import styles from "./DesignacionCargoActivo.module.scss";
import { ESTADO_ASIGNACION_BADGE } from "@/features/asignaciones/utils/asignacion.badges";
import Badge from "@/components/Badge";
import { formatearFecha } from "@/utils";
import SituacionRevistaBadge from "@/features/asignaciones/components/SituacionRevistaBadge/SituacionRevistaBadge";

type Props = {
  cargo: AsignacionDetalleDTO;
  isLoading?: boolean;
};

export default function DesignacionCargoActivo({
  cargo,
  isLoading = false,
}: Props) {

  if (isLoading) {
    return (
      <section className={styles.root}>
        <h3 className={styles.title}>CARGO ACTIVO</h3>
        <p className={styles.loading}>Cargando cargo activo…</p>
      </section>
    );
  }

  if (!cargo) {
    return (
      <section className={styles.root}>
        <h3 className={styles.title}>CARGO ACTIVO</h3>

        <div className={styles.emptyWrapper}>
          <p className={styles.empty}>
            No hay un cargo activo actualmente
          </p>
        </div>
      </section>
    );
  }


  const { empleado, periodo, situacionDeRevista, estadoAsignacion } = cargo;
  const { fechaDesde, fechaHasta } = periodo;

  return (
    <section className={styles.root}>
      <h3 className={styles.title}>CARGO ACTIVO</h3>
      <div className={styles.card}>
        {/* IDENTIDAD */}
        <div className={styles.section}>
          <div className={styles.row}>
            <User size={16} />
            <div>
              <div className={styles.name}>
                {empleado.apellido}, {empleado.nombre}
              </div>
              <div className={styles.subtle}>
                {empleado.cuil}
              </div>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.period}>
          <div className={styles.periodItem}>
            <span className={styles.periodLabel}>Toma de posesión</span>
            <span className={styles.periodValue}>
              {formatearFecha(fechaDesde)}
            </span>
          </div>

          {fechaHasta && (
            <div className={styles.periodItem}>
              <span className={styles.periodLabel}>Hasta</span>
              <span className={styles.periodValue}>
                {formatearFecha(fechaHasta)}
              </span>
            </div>
          )}
        </div>

        <hr className={styles.divider} />

        {/* ESTADO */}
        <div className={styles.section}>
          <SituacionRevistaBadge value={situacionDeRevista} />
          <Badge variant={ESTADO_ASIGNACION_BADGE[estadoAsignacion]}>
            {estadoAsignacion}
          </Badge>
        </div>

      </div>


    </section>
  );
}
