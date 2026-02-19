import { BookOpen, Compass, GraduationCap } from "lucide-react";
import styles from "./DesignacionCursoInfo.module.scss";
import { DesignacionCursoResumenDTO } from "@/features/designaciones/types/designacion.types";

type Props = {
	designacion: Pick<
		DesignacionCursoResumenDTO,
		"materia" | "curso" | "orientacion"
	>;
};

export default function DesignacionCursoInfo({ designacion }: Props) {
	return (
		<div className={styles.body}>

			<div className={`${styles.item} ${styles.materia}`}>
				<BookOpen />
				<span
					className={styles.value}
					title={designacion.materia}
				>
					{designacion.materia}
				</span>
			</div>

			<div className={`${styles.item} ${styles.curso}`}>
				<GraduationCap />
				<span className={`${styles.value} ${styles.valueEmphasis}`}>
					{designacion.curso}
				</span>
			</div>

			<div className={`${styles.item} ${styles.orientacion}`}>
				<Compass />
				<span className={styles.value}>{designacion.orientacion}</span>
			</div>

		</div>
	);
}
