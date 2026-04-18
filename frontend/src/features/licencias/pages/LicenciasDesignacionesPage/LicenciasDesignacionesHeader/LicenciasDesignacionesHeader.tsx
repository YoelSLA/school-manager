import { CalendarDays, FileText, User } from "lucide-react";
import styles from "./LicenciaDesignacionesHeader.module.scss";
import BadgeEstadoLicencia from "@/components/BagdeEstadoLicencia/BagdeEstadoLicencia";
import type {
  EmpleadoEducativoMinimoDTO,
  LicenciaDetalleDTO,
} from "@/utils/types";
import { formatearFecha } from "@/utils";

type Props = {
  empleado: EmpleadoEducativoMinimoDTO;
  licencia: LicenciaDetalleDTO;
};

export default function LicenciaDesignacionesHeader({
  empleado,
  licencia,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.statusRow}>
        <BadgeEstadoLicencia value={licencia.estadoLicencia} />
      </div>

      <div className={styles.cardsContainer}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <User size={16} />
            <span>Empleado</span>
          </div>

          <div className={styles.mainValue}>
            {empleado.apellido}, {empleado.nombre}
          </div>

          <div className={styles.secondaryValue}>{empleado.cuil}</div>
        </section>


        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <FileText size={14} />
            <span>Licencia</span>
          </div>

          <div className={styles.licenciaTop}>
            <span className={styles.article}>
              {licencia.normativa.articulo}
            </span>

            <span className={styles.code}>
              {licencia.normativa.codigo}
            </span>
          </div>

          <div className={styles.description}>
            {licencia.normativa.descripcion}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <CalendarDays size={14} />
            <span>Período</span>
          </div>

          <div className={styles.periodInline}>
            <span>{formatearFecha(licencia.periodo.fechaDesde)}</span>
            <span className={styles.arrow}>➡️</span>
            <span>{formatearFecha(licencia.periodo.fechaHasta)}</span>

            <span className={styles.daysInline}>
              ({licencia.periodo.dias} días)
            </span>
          </div>
        </section>
      </div>
    </header>
  );
}