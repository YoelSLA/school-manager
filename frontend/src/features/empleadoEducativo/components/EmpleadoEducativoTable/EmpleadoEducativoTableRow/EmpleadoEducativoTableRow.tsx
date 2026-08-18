import { CalendarDays, MoreVertical, User } from "lucide-react";
import {
	BadgeEstadoEmpleadoEducativo,
	BadgeRolEducativo,
} from "@/shared/components/Badge";
import { TableRow } from "@/shared/components/Table";
import { formatFechaIngreso } from "@/shared/utils/date";
import type { EmpleadoEducativoDetalleDTO } from "../../../types";
import styles from "./EmpleadoEducativoTableRow.module.scss";

type Props = {
	empleado: EmpleadoEducativoDetalleDTO;
	onVerDetalle: (empleado: EmpleadoEducativoDetalleDTO) => void;
	onAcciones?: (empleado: EmpleadoEducativoDetalleDTO) => void;
};

export default function EmpleadoEducativoTableRow({
	empleado,
	onVerDetalle,
	onAcciones,
}: Props) {
	const { apellido, nombre, cuil, activo, fechaDeIngreso, rolesVigentes } =
		empleado;

	const { texto } = formatFechaIngreso(fechaDeIngreso);

	return (
		<TableRow className={styles.row} onOpen={() => onVerDetalle(empleado)}>
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
				{rolesVigentes.map((rol) => (
					<BadgeRolEducativo key={rol} rolEducativo={rol} />
				))}
			</div>

			{/* Estado */}

			<div className={styles.status}>
				<BadgeEstadoEmpleadoEducativo activo={activo} />
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
		</TableRow>
	);
}
