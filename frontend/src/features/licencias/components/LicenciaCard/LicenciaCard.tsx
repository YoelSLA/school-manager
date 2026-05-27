import Card from "@/components/Card/Card";
import BadgeEstadoLicencia from "@/shared/components/BagdeEstadoLicencia";
import EmpleadoInfo from "@/shared/components/EmpleadoInfo";
import { formatearFecha } from "@/shared/utils";
import type { LicenciaResumenDTO } from "@/shared/utils/types";
import { Calendar, Flag, Hourglass } from "lucide-react";
import styles from "./LicenciaCard.module.scss";

type Props = {
	licencia: LicenciaResumenDTO;
	onVerDetalle: (licenciaId: number) => void;
	onDelete?: () => void;
};

export default function LicenciaCard({ licencia, onVerDetalle }: Props) {
	const { fechaDesde, fechaHasta, dias } = licencia.periodo;

	const status =
		licencia.estadoLicencia === "NO_VIGENTE"
			? "info"
			: licencia.estadoLicencia === "CUBIERTA"
				? "success"
				: "danger";

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
			{/* =================================
			    CONTENT
			================================= */}
			<div className={styles.content}>
				{/* =================================
				    INFO
				================================= */}
				<div className={styles.info}>
					{/* =================================
					    HEADER
					================================= */}
					<div className={styles.header}>
						{/* CÓDIGO */}
						<div className={styles.tipoPill}>
							<span className={styles.codigo}>{licencia.normativa.codigo}</span>
						</div>

						{/* ESTADO */}
						<BadgeEstadoLicencia value={licencia.estadoLicencia} />
					</div>

					{/* =================================
					    EMPLEADO
					================================= */}
					<div className={styles.empleado}>
						<EmpleadoInfo empleado={licencia.empleado} />
					</div>

					{/* =================================
					    DETALLE
					================================= */}
					<div className={styles.detalle}>
						{/* =================================
						    FECHAS
						================================= */}
						<div className={styles.fechas}>
							{/* FECHA INICIO */}
							<div className={styles.fechaItem}>
								<Calendar size={16} className={styles.icon} />

								<div>
									<span className={styles.label}>Inicio</span>

									<span className={styles.valor}>
										{formatearFecha(fechaDesde)}
									</span>
								</div>
							</div>

							{/* FECHA FIN */}
							<div className={styles.fechaItem}>
								<Flag size={16} className={styles.icon} />

								<div>
									<span className={styles.label}>Fin</span>

									<span className={styles.valor}>
										{formatearFecha(fechaHasta)}
									</span>
								</div>
							</div>

							{/* DURACIÓN */}
							<div className={styles.fechaItem}>
								<Hourglass size={16} className={styles.icon} />

								<div>
									<span className={styles.label}>Duración</span>

									<span className={styles.valor}>{dias} días</span>
								</div>
							</div>
						</div>

						{/* =================================
						    DÍAS RESTANTES
						================================= */}
						<div className={styles.restantes}>
							<span className={styles.restantesNumero}>
								{licencia.diasRestantes ?? 0}
							</span>

							<span className={styles.restantesTexto}>días restantes</span>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
}
