import { CalendarDays, FileText, User } from "lucide-react";
import type { EmpleadoEducativoBasicoDTO } from "@/features/empleadoEducativo/types";
import BadgeEstadoLicencia from "@/shared/components/badges/BagdeEstadoLicencia/BagdeEstadoLicencia";
import { formatDate } from "@/shared/utils/date";
import type { LicenciaDetalleDTO } from "../../types";
import styles from "./LicenciaDesignacionHeader.module.scss";

type Props = {
  empleado: EmpleadoEducativoBasicoDTO;
  licencia: LicenciaDetalleDTO;
};

export default function LicenciaDesignacionHeader({
  empleado,
  licencia,
}: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <div className={styles.item}>
          <User size={16} />

          <strong>
            {empleado.apellido}, {empleado.nombre}
          </strong>

          <span>{empleado.cuil}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.item}>
          <FileText size={16} />

          <strong>{licencia.licenciaEstatutaria.articulo}</strong>

          <span className={styles.code}>
            {licencia.licenciaEstatutaria.codigo}
          </span>
        </div>

        <div className={styles.divider} />

        <div className={styles.item}>
          <CalendarDays size={16} />

          <strong>
            {formatDate(licencia.periodo.fechaDesde)} →{" "}
            {formatDate(licencia.periodo.fechaHasta)}
          </strong>

          <span>{licencia.periodo.dias} días</span>
        </div>
      </div>

      <BadgeEstadoLicencia value={licencia.estadoLicencia} />
    </header>
  );
}