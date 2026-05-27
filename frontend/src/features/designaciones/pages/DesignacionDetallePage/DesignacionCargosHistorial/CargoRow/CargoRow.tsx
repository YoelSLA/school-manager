import SituacionRevistaBadge from "@/shared/components/BadgeSituacionRevista/BadgeSituacionRevista";
import BadgeEstadoAsignacion from "@/shared/components/BagdeEstadoAsignacion";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo/EmpleadoInfo";
import { formatearFecha } from "@/shared/utils";
import type { AsignacionDetalleDTO } from "@/shared/utils/types";
import styles from "./CargoRow.module.scss";

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
					<span className={styles.arrow}>➡️</span>
					<span>{fechaHasta ? formatearFecha(fechaHasta) : "—"}</span>
				</div>

				<BadgeEstadoAsignacion value={estadoAsignacion} />
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
