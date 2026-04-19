import { BookOpen, Compass, GraduationCap } from "lucide-react";
import type { DesignacionCursoResumenDTO } from "@/utils/types";
import DesignacionCard from "../DesignacionCard";
import styles from "./DesignacionCursoCard.module.scss";

type Props = {
	designacion: DesignacionCursoResumenDTO;
	onVerDetalle: (designacion: DesignacionCursoResumenDTO) => void;
};

export default function DesignacionCursoCard({
	designacion,
	onVerDetalle,
}: Props) {
	return (
		<DesignacionCard
			designacionId={designacion.id}
			franjasCount={designacion.franjasHorarias.length}
			cupof={designacion.cupof}
			estadoDesignacion={designacion.estadoDesignacion}
			onVerDetalle={() => onVerDetalle(designacion)}
		>
			<div className={styles.body}>
				<div className={`${styles.item} ${styles.materia}`}>
					<BookOpen />

					<span className={styles.value} title={designacion.materia}>
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
		</DesignacionCard>
	);
}
