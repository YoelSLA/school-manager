import { CalendarDays, User } from "lucide-react";
import Button from "@/components/Button";
import { formatearFecha } from "@/utils";
import type { LicenciaDesignacionDTO } from "@/utils/types";
import styles from "./CoberturaCard.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
	onCambiarCobertura: (id: number) => void;
};

export default function CoberturaCard({
	designacion,
	onCambiarCobertura,
}: Props) {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.title}>Cobertura actual</span>
			</div>

			{designacion.asignacionActiva ? (
				<>
					<div className={styles.person}>
						<User size={16} color="#7c3aed" />

						<div>
							<strong>
								{designacion.asignacionActiva.empleado.apellido},{" "}
								{designacion.asignacionActiva.empleado.nombre}
							</strong>

							<span> {designacion.asignacionActiva.empleado.cuil}</span>
						</div>
					</div>

					<div className={styles.meta}>
						<div className={styles.periodo}>
							<CalendarDays size={14} color="#64748b" />

							<div className={styles.periodo__content}>
								<span className={styles.periodo__label}>Período</span>
								<strong>
									{formatearFecha(
										designacion.asignacionActiva.periodo.fechaDesde,
									)}{" "}
									➡️{" "}
									{formatearFecha(
										// biome-ignore lint/style/noNonNullAssertion: <asdsad>
										designacion.asignacionActiva.periodo.fechaHasta!,
									)}
								</strong>
							</div>
						</div>
					</div>

					<div className={styles.actions}>
						<Button
							variant="primary"
							size="sm"
							type="button"
							onClick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								onCambiarCobertura(designacion.designacionId);
							}}
						>
							Cambiar cobertura
						</Button>
					</div>
				</>
			) : (
				<div className={styles.empty}>
					<User size={18} color="#94a3b8" />

					<div>
						<strong>Sin cobertura asignada</strong>
						<span>
							Todavía no hay ningún empleado cubriendo esta designación.
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
