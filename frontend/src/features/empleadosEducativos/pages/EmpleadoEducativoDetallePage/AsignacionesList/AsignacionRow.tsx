import { Calendar, Clock, Hash, Star, Timer, Users } from "lucide-react";

import Badge from "@/components/Badge";
import { ESTADO_ASIGNACION_BADGE } from "@/features/asignaciones/utils/asignacion.badges";
import type { EmpleadoEducativoAsignacionItemDTO } from "@/features/empleadosEducativos/types/empleadosEducativos.types";
import styles from "./AsignacionRow.module.scss";

type Props = {
	asignacion: EmpleadoEducativoAsignacionItemDTO;
};

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("es-AR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

const SITUACION_ICON = {
	TITULAR: Star,
	PROVISIONAL: Clock,
	SUPLENTE: Users,
} as const;

export default function AsignacionRow({ asignacion }: Props) {
	const {
		cupof,
		tipoDesignacion,
		periodo,
		situacionDeRevista,
		estadoAsignacion,
	} = asignacion;

	const SituacionIcon = SITUACION_ICON[situacionDeRevista];

	return (
		<div
			className={`${styles.row} ${styles[`row--${tipoDesignacion.toLowerCase()}`]}`}
		>
			{/* CUPOF */}
			<div className={`${styles.pill} ${styles.cupof}`}>
				<Hash size={14} />
				{cupof}
			</div>

			{/* SITUACIÓN */}
			<div
				className={`${styles.pill} ${styles.situacion} ${styles[`situacion--${situacionDeRevista.toLowerCase()}`]}`}
			>
				<SituacionIcon size={14} />
				{situacionDeRevista}
			</div>

			{/* ESTADO */}
			<div className={styles.estado}>
				<Badge variant={ESTADO_ASIGNACION_BADGE[estadoAsignacion]}>
					{estadoAsignacion}
				</Badge>
			</div>

			{/* PERÍODO */}
			<div className={styles.periodo}>
				<Calendar size={14} />
				{formatDate(periodo.fechaDesde)}
				{periodo.fechaHasta ? (
					<>
						<span className={styles.separator}>–</span>
						{formatDate(periodo.fechaHasta)}
					</>
				) : (
					<span className={styles.actual}>Actual</span>
				)}

				{periodo.dias > 0 && (
					<span className={styles.duracion}>
						<Timer size={14} />
						{periodo.dias} días
					</span>
				)}
			</div>
		</div>
	);
}
