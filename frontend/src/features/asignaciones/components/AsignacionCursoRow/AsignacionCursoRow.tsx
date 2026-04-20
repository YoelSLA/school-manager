import { Calendar, Timer } from "lucide-react";
import BadgeSituacionRevista from "@/components/BadgeSituacionRevista";
import BadgeEstadoAsignacion from "@/components/BagdeEstadoAsignacion";
import type {
	CargoDesignacionCursoDTO,
	EmpleadoEducativoAsignacionItemDTO,
} from "@/utils/types";

import styles from "../AsignacionRow/AsignacionRow.module.scss";

type Props = {
	asignacion: EmpleadoEducativoAsignacionItemDTO & {
		designacion: CargoDesignacionCursoDTO;
	};
};

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("es-AR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export default function AsignacionCursoRow({ asignacion }: Props) {
	const { periodo, situacionDeRevista, estadoAsignacion, designacion } =
		asignacion;

	return (
		<div className={`${styles.row} ${styles["row--designacioncurso"]}`}>
			<div className={styles.header}>
				<div className={styles.titulo}>{designacion.materia}</div>

				<div className={styles.estado}>
					<BadgeEstadoAsignacion value={estadoAsignacion} />
				</div>
			</div>

			<div className={styles.subtitulo}>
				<span className={styles.cupof}>#{designacion.cupof}</span>

				<span className={styles.separator}>·</span>

				<span>{designacion.curso}</span>

				{designacion.orientacion && (
					<>
						<span className={styles.separator}>·</span>
						<span>{designacion.orientacion}</span>
					</>
				)}
			</div>

			<div className={styles.footer}>
				<div className={styles.periodo}>
					<Calendar size={14} />

					<span>{formatDate(periodo.fechaDesde)}</span>

					{periodo.fechaHasta ? (
						<>
							<span className={styles.separator}>·</span>
							<span>{formatDate(periodo.fechaHasta)}</span>
						</>
					) : (
						<>
							<span className={styles.separator}>·</span>
							<span className={styles.actual}>Actual</span>
						</>
					)}

					{periodo.dias > 0 && (
						<span className={styles.duracion}>
							<Timer size={14} />
							{periodo.dias} días
						</span>
					)}
				</div>
				<BadgeSituacionRevista value={situacionDeRevista} />
			</div>
		</div>
	);
}
