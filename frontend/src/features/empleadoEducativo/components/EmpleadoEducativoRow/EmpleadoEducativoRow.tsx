import {
  CalendarDays,
  MoreVertical,
  User,
  Users,
} from "lucide-react";
import BadgeEstadoEmpleado from "@/shared/components/badges/BagdeEstadoEmpleadoEducativo";
import Row from "@/shared/components/Table/TableRow";
import { formatFechaIngreso } from "@/shared/utils/date";
import type { EmpleadoEducativoDetalleDTO } from "../../types";
import styles from "./EmpleadoEducativoRow.module.scss";

type Props = {
  empleado: EmpleadoEducativoDetalleDTO;
  onVerDetalle: (empleado: EmpleadoEducativoDetalleDTO) => void;
  onAcciones?: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoEducativoRow({
  empleado,
  onVerDetalle,
  onAcciones,
}: Props) {
  const {
    apellido,
    nombre,
    cuil,
    activo,
    fechaDeIngreso,
    rolesVigentes,
  } = empleado;

  const { texto } = formatFechaIngreso(fechaDeIngreso);

  const rolesLabel =
    rolesVigentes.length === 0
      ? "Sin roles"
      : rolesVigentes.join(", ");

  return (
    <Row
      className={styles.row}
      onOpen={() => onVerDetalle(empleado)}
    >
      {/* Empleado */}

      <div className={styles.employee}>
        <User className={styles.employeeIcon} />

        <div className={styles.employeeContent}>
          <span className={styles.employeeTitle}>
            {apellido}, {nombre}
          </span>
        </div>
      </div>

      {/* CUIL */}

      <div className={styles.cuil}>
        <span>{cuil}</span>
      </div>

      {/* Fecha de ingreso */}

      <div className={styles.entryDate}>
        <CalendarDays size={16} />
        <span>{texto}</span>
      </div>

      {/* Roles */}

      <div className={styles.roles}>
        <Users size={16} />
        <span>{rolesLabel}</span>
      </div>

      {/* Estado */}

      <div className={styles.status}>
        <BadgeEstadoEmpleado activo={activo} />
      </div>

      {/* Acciones */}

      <button
        type="button"
        className={styles.actions}
        onClick={(e) => {
          e.stopPropagation();
          onAcciones?.(empleado);
        }}
      >
        <MoreVertical size={18} />
      </button>
    </Row>
  );
}