import DesignacionCardHorarios from "../../DesignacionCard/DesignacionCardHorarios/DesignacionCardHorarios";
import DesignacionCursoInfo from "./DesignacionCursoInfo";

import styles from "./DesignacionCursoInfoSection.module.scss";

type Props = {
	materia: string;
	curso: string;
	orientacion: string;
	franjasCount: number;
};

export default function DesignacionCursoInfoSection({
	materia,
	curso,
	orientacion,
	franjasCount,
}: Props) {
	return (
		<div className={styles.section}>
			<div className={styles.infoRow}>
				<DesignacionCursoInfo designacion={{ materia, curso, orientacion }} />

				<div className={styles.horariosWrapper}>
					<DesignacionCardHorarios franjasCount={franjasCount} />
				</div>
			</div>
		</div>
	);
}
