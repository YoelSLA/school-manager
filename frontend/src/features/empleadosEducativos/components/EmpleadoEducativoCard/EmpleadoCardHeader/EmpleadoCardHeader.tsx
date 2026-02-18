import { IdCard, User } from "lucide-react";
import Badge from "@/components/Badge";
import {
	ESTADO_EMPLEADO_BADGE,
	getEstadoEmpleadoKey,
} from "../../../utils/empleadosEducativos.bagdes";
import styles from "./EmpleadoCardHeader.module.scss";

type Props = {
	apellido: string;
	nombre: string;
	cuil: string;
	activo: boolean;
};

export default function EmpleadoCardHeader({
	apellido,
	nombre,
	cuil,
	activo,
}: Props) {
	const estadoKey = getEstadoEmpleadoKey(activo);
	return (
		<div className={styles.cardHeader}>

			<div className={styles.cardHeader__topRow}>
				<div className={styles.cardHeader__nombreRow}>
					<User className={styles.cardHeader__icon} />

					<div className={styles.cardHeader__nombreBlock}>
						<span className={styles.cardHeader__apellido}>
							{apellido}
						</span>

						<span className={styles.cardHeader__nombreText}>
							{nombre}
						</span>
					</div>
					<div className={styles.cardHeader__cuilRow}>
						<IdCard className={styles.cardHeader__iconSecondary} />
						<span className={styles.cardHeader__cuil}>{cuil}</span>
					</div>
				</div>
				<Badge
					variant={ESTADO_EMPLEADO_BADGE[estadoKey]}
				>
					{activo ? "Activo" : "Inactivo"}
				</Badge>
			</div>
		</div>
	);

}
