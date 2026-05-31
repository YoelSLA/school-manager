import { BookOpen, GraduationCap, Hash, Shapes } from "lucide-react";

import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import type { AsignacionCursoEmpleadoEducativoRowDTO } from "@/shared/utils/types";

import AsignacionRowFooter from "../../AsignacionRowFooter";
import AsignacionRowLayout from "../../AsignacionRowLayout";

import styles from "./AsignacionCursoEmpleadoRow.module.scss";

type Props = {
	asignacion: AsignacionCursoEmpleadoEducativoRowDTO;
};

export default function AsignacionCursoEmpleadoEducativoRow({
	asignacion,
}: Props) {
	const { designacion, periodo, situacionDeRevista, estadoAsignacion } =
		asignacion;

	return (
		<AsignacionRowLayout
			variant="curso"
			title={
				<div className={styles.header}>
					<div className={styles.titleSection}>
						<div className={styles.iconContainer}>
							<BookOpen size={18} />
						</div>

						<div className={styles.titleContent}>
							<span className={styles.title}>{designacion.materia}</span>

							<span className={styles.label}>Asignación académica</span>
						</div>
					</div>
				</div>
			}
			status={
				<div className={styles.status}>
					<BadgeEstadoAsignacion value={estadoAsignacion} />
				</div>
			}
			subtitle={
				<div className={styles.badges}>
					<div className={styles.badge}>
						<Hash size={14} />
						<span>{designacion.cupof}</span>
					</div>

					<div className={styles.badgeCurso}>
						<GraduationCap size={14} />
						<span>{designacion.curso}</span>
					</div>

					{designacion.orientacion && (
						<div className={styles.badgeOrientacion}>
							<Shapes size={14} />

							<span>{designacion.orientacion}</span>
						</div>
					)}
				</div>
			}
			footer={
				<div className={styles.footer}>
					<AsignacionRowFooter
						periodo={periodo}
						situacionDeRevista={situacionDeRevista}
					/>
				</div>
			}
		/>
	);
}
