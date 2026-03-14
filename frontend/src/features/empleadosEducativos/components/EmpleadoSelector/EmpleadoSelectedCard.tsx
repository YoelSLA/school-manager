import { IdCard, User, X } from "lucide-react";
import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import styles from "./EmpleadoSelectedCard.module.scss";

type Props = {
	empleado: EmpleadoEducativoMinimoDTO;
	onRemove: () => void;
};

export default function EmpleadoSelectedCard({ empleado, onRemove }: Props) {
	return (
		<div className={styles.empleadoCard}>
			<button
				type="button"
				className={styles.remove}
				onClick={onRemove}
				aria-label="Quitar empleado"
			>
				<X size={18} />
			</button>

			<div className={styles.meta}>
				<span className={styles.label}>
					<IdCard size={16} className={styles.icon} />
					CUIL
				</span>

				<span className={styles.value}>{empleado.cuil}</span>
			</div>

			<div className={styles.main}>
				<span className={styles.label}>
					<User size={16} className={styles.icon} />
					Apellido, nombre
				</span>

				<span className={styles.name}>
					{empleado.apellido}, {empleado.nombre}
				</span>
			</div>
		</div>
	);
}
