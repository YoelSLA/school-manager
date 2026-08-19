import { User } from "lucide-react";
import { PeriodoDisplay } from "@/shared/components";
import { BadgeSituacionRevista } from "@/shared/components/Badge";
import type { LicenciaDesignacionDTO } from "../../../types";
import styles from "./LicenciaDesignacionCobertura.module.scss";

type Props = {
	designacion: LicenciaDesignacionDTO;
};

export default function LicenciaDesignacionCobertura({ designacion }: Props) {
	const asignacion = designacion.cobertura;

	if (!asignacion) {
		return (
			<section className={styles.cobertura}>
				<div className={styles.content}>
					<div className={`${styles.icon} ${styles.empty}`}>
						<User size={17} strokeWidth={2} />
					</div>

					<div className={styles.details}>
						<strong>Sin cobertura asignada</strong>

						<span>La designación todavía no tiene reemplazo</span>
					</div>
				</div>
			</section>
		);
	}

	const empleado = asignacion.empleadoEducativoBasico;

	return (
		<section className={styles.cobertura}>
			<div className={styles.content}>
				<div className={styles.icon}>
					<User size={17} strokeWidth={2} />
				</div>

				<div className={styles.details}>
					<div className={styles.name}>
						<strong>
							{empleado.apellido}, {empleado.nombre}
						</strong>
					</div>

					<div className={styles.meta}>
						<span>{empleado.cuil}</span>

						<span className={styles.separator}>·</span>

						<PeriodoDisplay periodo={asignacion.periodo} showDuration={false} />
					</div>
				</div>
			</div>

			<div className={styles.situacion}>
				<BadgeSituacionRevista value={asignacion.situacionDeRevista} />
			</div>
		</section>
	);
}
