import { Clock } from "lucide-react";
import styles from "./DesignacionCardHorarios.module.scss";

type Props = {
	franjasCount: number;
};

export default function DesignacionCardHorarios({ franjasCount }: Props) {
	const label =
		franjasCount === 1
			? "1 franja"
			: `${franjasCount} franjas`;

	return (
		<div className={styles.horarios}>
			<Clock className={styles.horarios__icon} />
			<span className={styles.horarios__text}>
				Carga horaria · {label}
			</span>
		</div>
	);
}
