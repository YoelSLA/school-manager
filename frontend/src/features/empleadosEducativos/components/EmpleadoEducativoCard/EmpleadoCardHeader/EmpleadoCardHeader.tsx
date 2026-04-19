import { IdCard, User } from "lucide-react";
import BadgeEstadoEmpleado from "@/components/BagdeEstadoEmpleado";
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
	return (
		<div className={styles.cardHeader}>
			<div className={styles.cardHeader__topRow}>
				<div className={styles.cardHeader__nombreRow}>
					<User className={styles.cardHeader__icon} />

					<div className={styles.cardHeader__nombreBlock}>
						<span className={styles.cardHeader__apellido}>{apellido}</span>

						<span className={styles.cardHeader__nombreText}>{nombre}</span>
					</div>
					<div className={styles.cardHeader__cuilRow}>
						<IdCard className={styles.cardHeader__iconSecondary} />
						<span className={styles.cardHeader__cuil}>{cuil}</span>
					</div>
				</div>
				<BadgeEstadoEmpleado activo={activo} />
			</div>
		</div>
	);
}
