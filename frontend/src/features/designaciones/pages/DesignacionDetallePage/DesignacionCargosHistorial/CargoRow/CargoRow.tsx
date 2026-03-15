import Badge from "@/components/Badge";
import EmpleadoInfo from "@/components/EmpleadoInfo/EmpleadoInfo";
import SituacionRevistaBadge from "@/components/SituacionRevistaBadge/SituacionRevistaBadge";
import { ESTADO_ASIGNACION_BADGE } from "@/features/asignaciones/utils/asignacion.badges";
import { formatearFecha } from "@/utils";
import styles from "./CargoRow.module.scss";
import { AsignacionDetalleDTO } from "@/utils/types";

type Props = {
	cargo: AsignacionDetalleDTO;
};

export default function CargoRow({ cargo }: Props) {
	const {
		situacionDeRevista,
		periodo,
		estadoAsignacion,
		fechaBaja,
		causaBaja,
		empleado,
	} = cargo;

	const { fechaDesde, fechaHasta } = periodo;

	const esBaja = estadoAsignacion === "BAJA";

	return (
		<div className={styles.row}>
			{/* Línea principal */}
			<div className={styles.main}>
				{/* Empleado */}
				<EmpleadoInfo empleado={empleado} />

				{/* Situación */}
				<SituacionRevistaBadge value={situacionDeRevista} />

				{/* Período */}
				<div className={styles.periodo}>
					<span>{formatearFecha(fechaDesde)}</span>
					<span className={styles.arrow}>→</span>
					<span>{fechaHasta ? formatearFecha(fechaHasta) : "—"}</span>
				</div>

				{/* Estado */}
				<Badge variant={ESTADO_ASIGNACION_BADGE[estadoAsignacion]}>
					{estadoAsignacion}
				</Badge>
			</div>

			{/* Línea secundaria solo si BAJA */}
			{esBaja && (
				<div className={styles.baja}>
					<span className={styles.bajaLabel}>Baja:</span>
					<span>{fechaBaja ? formatearFecha(fechaBaja) : "—"}</span>

					<span className={styles.dot}>·</span>

					<span className={styles.bajaLabel}>Motivo:</span>
					<span className={styles.bajaMotivo}>{causaBaja ?? "—"}</span>
				</div>
			)}
		</div>
	);
}
