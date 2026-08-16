import { FileText, User } from "lucide-react";
import { BadgeRolEducativo } from "@/shared/components/Badge";
import { TableRow } from "@/shared/components/Table";
import type { AsistenciaEmpleadoResumenDTO } from "../../../types";
import styles from "./AsistenciaEmpleadoEducativoTableRow.module.scss";

type Props = {
  asistenciaEmpleadoResumen: AsistenciaEmpleadoResumenDTO;
  onSelect: (empleado: AsistenciaEmpleadoResumenDTO) => void;
};

export default function AsistenciaEmpleadoEducativoTableRow({
  asistenciaEmpleadoResumen,
  onSelect,
}: Props) {
  const {
    empleadoBasico,
    roles,
    faltasUltimoMes,
    licenciaMasFrecuente,
  } = asistenciaEmpleadoResumen;

  return (
    <TableRow
      className={styles.row}
      onOpen={() => onSelect(asistenciaEmpleadoResumen)}
    >
      <div className={styles.employee}>
        <User className={styles.employeeIcon} />

        <div className={styles.employeeContent}>
          <span className={styles.employeeName}>
            {empleadoBasico.apellido}, {empleadoBasico.nombre}
          </span>

          <span className={styles.employeeCuil}>
            {empleadoBasico.cuil}
          </span>
        </div>
      </div>

      <div className={styles.roles}>
        {roles.map((rol) => (
          <BadgeRolEducativo
            key={rol}
            rolEducativo={rol}
          />
        ))}
      </div>

      <div className={styles.faltas}>
        <span>{faltasUltimoMes}</span>
      </div>

      <div className={styles.licencia}>
        <FileText size={16} />

        <span>
          {licenciaMasFrecuente?.toString() ?? "—"}
        </span>
      </div>
    </TableRow>
  );
}