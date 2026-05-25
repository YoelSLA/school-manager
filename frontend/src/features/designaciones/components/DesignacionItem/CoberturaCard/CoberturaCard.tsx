import Button from "@/components/Button";
import { formatearFecha } from "@/utils";
import type { LicenciaDesignacionDTO } from "@/utils/types";
import { CalendarDays, User } from "lucide-react";
import styles from "./CoberturaCard.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
	onCambiarCobertura: (id: number) => void;
};

export default function CoberturaCard({
	designacion,
	onCambiarCobertura,
}: Props) {
	const asignacion = designacion.asignacionActiva;

	if (!asignacion) {
		return (
			<div className={styles.card}>
				<div className={styles.header}>
					<span className={styles.title}>Cobertura actual</span>
				</div>

				<div className={styles.empty}>
					<User size={18} color="#94a3b8" />

					<div>
						<strong>Sin cobertura asignada</strong>

						<span>
							Todavía no hay ningún empleado cubriendo esta designación.
						</span>
					</div>
				</div>
			</div>
		);
	}

	const empleado = asignacion.empleado;
	const apellido = empleado.apellido;
	const nombre = empleado.nombre;
	const cuil = empleado.cuil;
	const fechaDesde = asignacion.periodo.fechaDesde;
	const fechaHasta = asignacion.periodo.fechaHasta;

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<span className={styles.title}>Cobertura actual</span>
			</div>

			<div className={styles.person}>
				<User size={16} color="#7c3aed" />

				<div>
					<strong>
						{apellido}, {nombre}
					</strong>

					<span>{cuil}</span>
				</div>
			</div>

			<div className={styles.meta}>
				<div className={styles.periodo}>
					<CalendarDays size={14} color="#64748b" />

					<div className={styles.periodo__content}>
						<span className={styles.periodo__label}>Período</span>

						<strong>
							{formatearFecha(fechaDesde)} ➡️{" "}
							{formatearFecha(fechaHasta)}
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
		</div>
	);
}