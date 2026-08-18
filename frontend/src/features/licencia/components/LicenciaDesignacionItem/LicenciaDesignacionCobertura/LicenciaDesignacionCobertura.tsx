import { CalendarDays, User } from "lucide-react";
import { Button } from "@/shared/components";
import { BadgeSituacionRevista } from "@/shared/components/Badge";
import { formatDate } from "@/shared/utils/date";
import type { LicenciaDesignacionDTO } from "../../../types";
import styles from "./LicenciaDesignacionCobertura.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
	onCubrir: () => void;
	onCambiarCobertura: () => void;
};

export default function LicenciaDesignacionCobertura({
	designacion,
	onCubrir,
	onCambiarCobertura,
}: Props) {
	const asignacion = designacion.cobertura;

	if (!asignacion) {
		return (
			<section className={styles.cobertura}>
				<div className={styles.content}>
					<div className={styles.icon}>
						<User size={17} />
					</div>

					<div className={styles.details}>
						<strong>Sin cobertura asignada</strong>
						<span>La designación todavía no tiene reemplazo</span>
					</div>
				</div>

				<button
					type="button"
					className={styles.link}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						onCubrir();
					}}
				>
					Cubrir →
				</button>
			</section>
		);
	}

	const empleado = asignacion.empleadoEducativoBasico;

	return (
		<section className={styles.cobertura}>
			<div className={styles.content}>
				<div className={styles.icon}>
					<User size={17} />
				</div>

				<div className={styles.details}>
					<div className={styles.name}>
						<strong>
							{empleado.apellido}, {empleado.nombre}
						</strong>
						<BadgeSituacionRevista value={asignacion.situacionDeRevista} />
					</div>

					<div className={styles.meta}>
						<span>{empleado.cuil}</span>

						<span className={styles.separator}>·</span>

						<CalendarDays size={14} />

						<span>
							{formatDate(asignacion.periodo.fechaDesde)} →{" "}
							{"fechaHasta" in asignacion.periodo &&
							asignacion.periodo.fechaHasta
								? formatDate(asignacion.periodo.fechaHasta)
								: "Sin fecha"}
						</span>
					</div>
				</div>
			</div>

			<Button
				variant="ghost"
				size="sm"
				type="button"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					onCambiarCobertura();
				}}
			>
				Cambiar cobertura
			</Button>
		</section>
	);
}
