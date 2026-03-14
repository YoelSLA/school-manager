import EmpleadoInfo from "@/components/EmpleadoInfo";
import RolPill from "@/components/RolPill";
import type { EmpleadoAsistenciaDTO } from "@/features/asistencias/types/asistencias.types";
import { rolLabels } from "@/features/designaciones/utils/designacion.badges";
import styles from "./EmpleadoAsistenciaCard.module.scss";

type Props = {
	empleado: EmpleadoAsistenciaDTO;
	onSelect: (empleado: EmpleadoAsistenciaDTO) => void;
};

export default function EmpleadoAsistenciaCard({ empleado }: Props) {
	return (
		<article className={styles.card}>
			{/* HEADER */}

			<EmpleadoInfo empleado={empleado} />

			<hr className={styles.card__divider} />

			{/* ROLES */}
			<section className={styles.card__roles}>
				{empleado.roles.map((rol) => (
					<RolPill key={rol}>{rolLabels[rol] ?? rol}</RolPill>
				))}
			</section>

			<hr className={styles.card__divider} />
		</article>
	);
}
