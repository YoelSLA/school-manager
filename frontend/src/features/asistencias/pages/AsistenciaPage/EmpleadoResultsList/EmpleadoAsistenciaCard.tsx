import { ArrowRight, IdCard, User } from "lucide-react";
import RolPill from "@/components/RolPill";
import type { EmpleadoAsistenciaDTO } from "@/features/asistencias/types/asistencias.types";
import { rolLabels } from "@/features/designaciones/utils/designacion.badges";
import styles from "./EmpleadoAsistenciaCard.module.scss";

type Props = {
	empleado: EmpleadoAsistenciaDTO;
	onSelect: (empleado: EmpleadoAsistenciaDTO) => void;
};

export default function EmpleadoAsistenciaCard({ empleado, onSelect }: Props) {
	return (
		<article className={styles.card}>
			{/* HEADER */}
			<header className={styles.card__header}>
				<div className={styles.card__meta}>
					<IdCard size={14} />
					<span>{empleado.cuil}</span>
				</div>

				<h3 className={styles.card__name}>
					<User size={16} />
					{empleado.apellido}, {empleado.nombre}
				</h3>
			</header>

			<hr className={styles.card__divider} />

			{/* ROLES */}
			<section className={styles.card__roles}>
				{empleado.roles.map((rol) => (
					<RolPill key={rol}>{rolLabels[rol] ?? rol}</RolPill>
				))}
			</section>

			<hr className={styles.card__divider} />

			{/* FOOTER */}
			<footer className={styles.card__footer}>
				<button
					type="button"
					className={styles.card__action}
					onClick={() => {
						onSelect(empleado);
					}}
				>
					<ArrowRight size={14} />
					Ver asistencia
				</button>
			</footer>
		</article>
	);
}
