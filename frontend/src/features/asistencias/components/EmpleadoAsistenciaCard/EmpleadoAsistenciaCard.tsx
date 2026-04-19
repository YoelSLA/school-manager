import EmpleadoInfo from "@/components/EmpleadoInfo";
import RolPill from "@/components/RolPill";
import { rolLabels } from "@/features/designaciones/utils/designacion.badges";
import type { EmpleadoAsistenciaDTO } from "@/utils/types";

import styles from "./EmpleadoAsistenciaCard.module.scss";

type Props = {
	empleado: EmpleadoAsistenciaDTO;
	onSelect: (empleado: EmpleadoAsistenciaDTO) => void;
};

export default function EmpleadoAsistenciaCard({
	empleado,
	onSelect,
}: Props) {
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
						<RolPill key={rol}>{rolLabels[rol] ?? rol}</RolPill>
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