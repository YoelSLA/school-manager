import type { EmpleadoEducativoMinimoDTO } from "../../types/empleadosEducativos.types";
import styles from "./EmpleadoSelectedCard.module.scss";

type Props = {
	empleado: EmpleadoEducativoMinimoDTO;
	onRemove: () => void;
};

export default function EmpleadoSelectedCard({ empleado, onRemove }: Props) {
	return (
		<div className={styles["empleado-card"]}>
			<button
				type="button"
				className={styles["empleado-card__remove"]}
				onClick={onRemove}
				aria-label="Quitar empleado"
			>
				✕
			</button>

			<div className={styles["empleado-card__meta"]}>
				<span className={styles["empleado-card__label"]}>CUIL</span>
				<span className={styles["empleado-card__value"]}>{empleado.cuil}</span>
			</div>

			<div className={styles["empleado-card__main"]}>
				<span className={styles["empleado-card__label"]}>
					Apellido y nombre
				</span>
				<span className={styles["empleado-card__name"]}>
					{empleado.apellido}, {empleado.nombre}
				</span>
			</div>
		</div>
	);
}
