import { Calendar } from "lucide-react";
import styles from "./EmpleadoCardInfo.module.scss";

type Props = {
	fecha: string;
	tieneFecha: boolean;
};

export default function EmpleadoCardInfo({
	fecha,
	tieneFecha,
}: Props) {
	return (
		<section className={styles.info}>
			<div className={styles.info__row}>

				<Calendar className={styles.info__icon} />

				<span className={styles.info__label}>
					Ingreso
				</span>

				<span className={styles.info__separator}>·</span>

				<span
					className={`${styles.info__value} ${!tieneFecha ? styles.info__valueEmpty : ""
						}`}
				>
					{fecha}
				</span>

			</div>
		</section>
	);
}
