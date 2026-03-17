import { Calendar, Flag, Hourglass, Trash2 } from "lucide-react";
import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import EmpleadoInfo from "@/components/EmpleadoInfo";
import { formatearFecha } from "@/utils";
import styles from "./LicenciaCard.module.scss";
import type { LicenciaResumenDTO } from "@/utils/types";
import BadgeEstadoLicencia from "@/components/BagdeEstadoLicencia";

type Props = {
	licencia: LicenciaResumenDTO;
	onVerDetalle: (licenciaId: number) => void;
	onDelete?: () => void;
};

export default function LicenciaCard({ licencia, onVerDetalle, onDelete }: Props) {
	const { fechaDesde, fechaHasta, dias } = licencia.periodo;

	const status = licencia.estadoLicencia === "CUBIERTA" ? "success" : "danger";

	return (
		<Card
			className={styles.card}
			status={status}
			elevated
			clickable
			largeRadius
			onClick={() => onVerDetalle(licencia.id)}
			viewTransitionName={`licencia-${licencia.id}`}
		>
			<div className={styles.header}>
				<div className={styles.tipoPill}>
					<span className={styles.codigo}>{licencia.normativa.codigo}</span>
				</div>

				<BadgeEstadoLicencia value={licencia.estadoLicencia} />
			</div>

			<div className={styles.empleado}>
				<EmpleadoInfo empleado={licencia.empleado} />
			</div>

			<div className={styles.fechas}>
				<div className={styles.fechaItem}>
					<Calendar size={16} className={styles.icon} />
					<div>
						<span className={styles.label}>Inicio</span>
						<span className={styles.valor}>{formatearFecha(fechaDesde)}</span>
					</div>
				</div>

				<div className={styles.fechaItem}>
					<Flag size={16} className={styles.icon} />
					<div>
						<span className={styles.label}>Fin</span>
						<span className={styles.valor}>
							{fechaHasta
								? formatearFecha(fechaHasta)
								: "Sin fecha de finalización"}
						</span>
					</div>
				</div>

				<div className={styles.fechaItem}>
					<Hourglass size={16} className={styles.icon} />
					<div>
						<span className={styles.label}>Duración</span>
						<span className={styles.valor}>{dias ?? "—"} días</span>
					</div>
				</div>
			</div>

			{/* FOOTER */}
			<div className={styles.footer}>
				<Button
					variant="danger"
					size="sm"
					onClick={(e) => {
						e.stopPropagation();
						onDelete?.();
					}}
				>
					<Trash2 />
				</Button>
			</div>
		</Card>
	);
}