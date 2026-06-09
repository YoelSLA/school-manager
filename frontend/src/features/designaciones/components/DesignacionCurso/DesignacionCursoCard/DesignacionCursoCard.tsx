import { BookOpen, Compass, GraduationCap } from "lucide-react";
import type { DesignacionCursoCardDTO } from "@/shared/types";
import DesignacionCard from "../../DesignacionCard";
import styles from "./DesignacionCursoCard.module.scss";

type Props = {
	designacion: DesignacionCursoCardDTO;
	onVerDetalle: (designacion: DesignacionCursoCardDTO) => void;
};

export default function DesignacionCursoCard({
	designacion,
	onVerDetalle,
}: Props) {
	const {
		id,
		cupof,
		cantidadFranjasHorarias,
		estadoDesignacion,
		nombreMateria,
		nombreCurso,
		orientacion,
	} = designacion;

	return (
		<DesignacionCard
			designacionId={id}
			franjasCount={cantidadFranjasHorarias}
			cupof={cupof}
			estadoDesignacion={estadoDesignacion}
			onVerDetalle={() => onVerDetalle(designacion)}
		>
			<div className={styles.body}>
				<div className={`${styles.item} ${styles.materia}`}>
					<BookOpen />

					<span className={styles.value} title={nombreMateria}>
						{nombreMateria}
					</span>
				</div>

				<div className={`${styles.item} ${styles.curso}`}>
					<GraduationCap />

					<span className={`${styles.value} ${styles.valueEmphasis}`}>
						{nombreCurso}
					</span>
				</div>

				<div className={`${styles.item} ${styles.orientacion}`}>
					<Compass />

					<span className={styles.value}>{orientacion}</span>
				</div>
			</div>
		</DesignacionCard>
	);
}
