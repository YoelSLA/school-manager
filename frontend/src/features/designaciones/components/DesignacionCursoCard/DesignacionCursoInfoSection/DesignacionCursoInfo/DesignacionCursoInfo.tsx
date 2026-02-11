import { BookOpen, Compass, GraduationCap } from "lucide-react";
import type { DesignacionCursoResumenDTO } from "../../../../types/designacion.types";
import styles from "./DesignacionCursoInfo.module.scss";

type Props = {
	designacion: Pick<
		DesignacionCursoResumenDTO,
		"materia" | "curso" | "orientacion"
	>;
};

export default function DesignacionCursoInfo({ designacion }: Props) {
	return (
		<div className={styles.body}>
			<div className={styles.grid}>
				<div className={styles.item}>
					<span className={styles.label}>
						<BookOpen size={13} />
						Materia
					</span>
					<span className={styles.value}>{designacion.materia}</span>
				</div>

				<div className={styles.item}>
					<span className={styles.label}>
						<GraduationCap size={13} />
						Curso
					</span>
					<span className={`${styles.value} ${styles.valueEmphasis}`}>
						{designacion.curso}
					</span>
				</div>

				<div className={`${styles.item} ${styles.full}`}>
					<span className={styles.label}>
						<Compass size={13} />
						Orientación
					</span>
					<span className={styles.value}>{designacion.orientacion}</span>
				</div>
			</div>
		</div>
	);
}
