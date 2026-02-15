import { Calendar } from "lucide-react";
import styles from "./EmpleadoCardInfo.module.scss";

type Props = {
	fechaDeIngreso?: string | null;
};

export default function EmpleadoCardInfo({ fechaDeIngreso }: Props) {
	const tieneFecha = !!fechaDeIngreso;

	let fechaFormateada = "Sin fecha de ingreso";

	if (fechaDeIngreso) {
		const date = new Date(fechaDeIngreso);

		if (!Number.isNaN(date.getTime())) {
			fechaFormateada = date.toLocaleDateString("es-AR", {
				day: "2-digit",
				month: "long",
				year: "numeric",
			});
		}
	}

	return (
		<section className={styles.info}>
			<div className={styles.info__text}>
				<span className={styles.info__label}>
					<Calendar size={16} /> Ingreso
				</span>

				<span
					className={`${styles.info__value} ${!tieneFecha ? styles["info__value--empty"] : ""
						}`}
				>
					{fechaFormateada}
				</span>
			</div>
		</section>
	);
}
