import BadgeRolEducativo from "@/shared/components/BadgeRolEducativo";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import type { AsistenciaEmpleadoResumenDTO } from "@/shared/types";
import styles from "./AsistenciaEmpleadoCard.module.scss";

type Props = {
	asistenciaEmpleadoResumen: AsistenciaEmpleadoResumenDTO;
	onSelect: (empleado: AsistenciaEmpleadoResumenDTO) => void;
};

export default function AsistenciaEmpleadoCard({
	asistenciaEmpleadoResumen,
	onSelect,
}: Props) {
	const { empleadoBasico, roles, faltasUltimoMes, licenciaMasFrecuente } =
		asistenciaEmpleadoResumen;

	return (
		<article className={styles.card}>
			<button
				type="button"
				className={styles.card__button}
				onClick={() => onSelect(asistenciaEmpleadoResumen)}
			>
				<section className={styles.card__main}>
					<div className={styles.card__header}>
						<EmpleadoInfo empleado={empleadoBasico} />
					</div>

					<div className={styles.card__roles}>
						{roles.map((rol) => (
							<BadgeRolEducativo key={rol} rolEducativo={rol} />
						))}
					</div>
				</section>

				<aside className={styles.card__stats}>
					<div className={styles.card__faltas}>
						<span className={styles.card__statsLabel}>Cantidad de Faltas</span>

						<span className={styles.card__statsValue}>{faltasUltimoMes}</span>
					</div>

					<div className={styles.card__licencia}>
						<span className={styles.card__statsLabel}>
							Licencia más frecuente
						</span>

						<span className={styles.card__statsSecondary}>
							{licenciaMasFrecuente?.toString() ?? "—"}
						</span>
					</div>
				</aside>
			</button>
		</article>
	);
}
