import { FileText, Hash } from "lucide-react";

import BadgeEstadoLicencia from "@/shared/components/BagdeEstadoLicencia";
import PeriodoDisplay from "@/shared/components/PeriodoDisplay";

import type { LicenciaEmpleadoEducativoRowDTO } from "@/shared/types";

import styles from "./LicenciaEmpleadoEducativoRow.module.scss";

type Props = {
	licencia: LicenciaEmpleadoEducativoRowDTO;
};

export default function LicenciaEmpleadoEducativoRow({ licencia }: Props) {
	const { descripcion, normativa, periodo, estado } = licencia;

	return (
		<article className={styles.card}>
			{/* ================================
	    TOP
	================================ */}
			<div className={styles.top}>
				<div className={styles.badges}>
					<div className={styles.badge}>
						<Hash size={14} />

						<span>{normativa.codigo}</span>
					</div>

					<div className={styles.badgeArticulo}>
						<FileText size={14} />

						<span>{normativa.articulo}</span>
					</div>
				</div>

				<div className={styles.status}>
					<BadgeEstadoLicencia value={estado} />
				</div>
			</div>

			{/* ================================
	    TITLE
	================================ */}
			<h3 className={styles.title}>{descripcion}</h3>

			{/* ================================
	    FOOTER
	================================ */}
			<div className={styles.footer}>
				<PeriodoDisplay periodo={periodo} />
			</div>
		</article>
	);
}
