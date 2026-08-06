import {
  Calendar,
  Flag,
  Hourglass,
  MoreVertical,
} from "lucide-react";
import EmpleadoInfo from "@/features/empleadoEducativo/components/EmpleadoInfo";
import BadgeEstadoLicencia from "@/shared/components/badges/BagdeEstadoLicencia";
import Row from "@/shared/components/Table/TableRow";
import { formatDate } from "@/shared/utils/date";
import type { LicenciaRowDTO } from "../../types";
import styles from "./LicenciaRow.module.scss";

type Props = {
  licencia: LicenciaRowDTO;
  onVerDetalle: (licencia: LicenciaRowDTO) => void;
  onDelete?: () => void;
};

export default function LicenciaRow({
  licencia,
  onVerDetalle,
  onDelete,
}: Props) {
  return (
    <Row
      className={styles.row}
      onOpen={() => onVerDetalle(licencia)}
    >
      {/* EMPLEADO */}
      <div className={styles.employee}>
        <EmpleadoInfo empleado={licencia.empleado} />
      </div>

      {/* LICENCIA */}
      <div className={styles.licencia}>
        <span className={styles.codigo}>
          {licencia.licenciaEstatutaria.codigo}
        </span>
      </div>

      {/* PERÍODO */}
      <div className={styles.periodo}>
        <Calendar size={16} />
        {formatDate(licencia.periodo.fechaDesde)}

        <Flag size={16} />

        {formatDate(licencia.periodo.fechaHasta)}
      </div>

      {/* DÍAS */}
      <div className={styles.dias}>
        <Hourglass size={16} />
        {licencia.periodo.dias} días
      </div>

      {/* ESTADO */}
      <div className={styles.estado}>
        <BadgeEstadoLicencia
          value={licencia.estadoLicencia}
        />
      </div>

      {/* ACCIONES */}
      <button
        type="button"
        className={styles.actions}
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
      >
        <MoreVertical size={18} />
      </button>
    </Row>
  );
}