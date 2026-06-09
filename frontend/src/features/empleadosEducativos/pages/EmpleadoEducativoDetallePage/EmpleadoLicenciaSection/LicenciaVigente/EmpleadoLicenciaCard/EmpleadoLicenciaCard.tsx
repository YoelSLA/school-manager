import BadgeEstadoLicencia from "@/shared/components/BagdeEstadoLicencia";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";

import type { LicenciaDetalleDTO } from "@/shared/types";

import styles from "./EmpleadoLicenciaCard.module.scss";

type Props = {
	licencia: LicenciaDetalleDTO;
};

export default function EmpleadoLicenciaCard({ licencia }: Props) {
	return (
		<article className={styles.card}>
			<div className={styles.content}>
				{/* ================================
				    HEADER
				================================ */}
				<div className={styles.header}>
					<div className={styles.tipoPill}>
						<span className={styles.codigo}>{licencia.normativa.codigo}</span>
					</div>

					<BadgeEstadoLicencia value={licencia.estadoLicencia} />
				</div>

				{/* ================================
				    DESCRIPCIÓN
				================================ */}
				<p className={styles.descripcion}>{licencia.descripcion}</p>

				{/* ================================
				    PERÍODO
				================================ */}
				<PeriodoDisplay periodo={licencia.periodo} />
			</div>
		</article>
	);
}
