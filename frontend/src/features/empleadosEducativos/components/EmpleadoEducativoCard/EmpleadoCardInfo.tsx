import { Calendar } from "lucide-react";

import styles from "./EmpleadoCardInfo.module.scss";

type Props = {
	fechaDeIngreso: string;
};

export default function EmpleadoCardInfo({ fechaDeIngreso }: Props) {
	const fecha = new Date(fechaDeIngreso).toLocaleDateString("es-AR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return (
		<section className={styles.info}>
			<div className={styles.info__text}>
				<span className={styles.info__label}>
					{" "}
					<Calendar size={16} /> Ingreso
				</span>
				<span className={styles.info__value}>{fecha}</span>
			</div>
		</section>
	);
}
