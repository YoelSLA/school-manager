import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import type { EmpleadoAsistenciaDTO } from "@/shared/utils/types";

import BadgeRolEducativo from "@/shared/components/BadgeRolEducativo";
import styles from "./EmpleadoAsistenciaCard.module.scss";

type Props = {
	empleado: EmpleadoAsistenciaDTO;
	onSelect: (empleado: EmpleadoAsistenciaDTO) => void;
};

export default function EmpleadoAsistenciaCard({ empleado, onSelect }: Props) {
	return (
		<article className={styles.card}>
			<button
				type="button"
				className={styles.card__button}
				onClick={() => onSelect(empleado)}
			>
				<EmpleadoInfo empleado={empleado} />

				<section className={styles.card__roles}>
					{empleado.roles.map((rol) => (
						<BadgeRolEducativo rolEducativo={rol} />
					))}
				</section>

				<aside className={styles.card__faltas}>
					<span className={styles.card__faltasLabel}>Faltas</span>

					<span className={styles.card__faltasValue}>
						{empleado.cantidadFaltas ?? 0}
					</span>

					<span className={styles.card__faltasText}>
						{(empleado.cantidadFaltas ?? 0) === 1 ? "falta" : "faltas"}
					</span>
				</aside>
			</button>
		</article>
	);
}
