import { CalendarRange, FileText, Timer } from "lucide-react";

import BadgeEstadoLicencia from "@/components/BagdeEstadoLicencia";
import styles from "./LicenciaRow.module.scss";
import type { EmpleadoEducativoLicenciaItemDTO } from "@/utils/types";

type Props = {
	licencia: EmpleadoEducativoLicenciaItemDTO;
};

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("es-AR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
}

export default function LicenciaRow({ licencia }: Props) {
	const { normativa, periodo, estadoLicencia } = licencia;

	return (
		<article className={styles.licenciaRow}>
			<div className={styles.licenciaRow__header}>
				<div className={styles.licenciaRow__titleBlock}>
					<div className={styles.licenciaRow__title}>
						<FileText size={15} />
						<span>
							{normativa.codigo} · {normativa.articulo}
						</span>
					</div>
				</div>

				<div className={styles.licenciaRow__estado}>
					<BadgeEstadoLicencia value={estadoLicencia} />
				</div>
			</div>

			<div className={styles.licenciaRow__footer}>
				<div className={styles.licenciaRow__periodo}>
					<CalendarRange size={14} />

					<span>{formatDate(periodo.fechaDesde)}</span>

					<span className={styles.licenciaRow__separator}>➡️</span>

					<span>{formatDate(periodo.fechaHasta)}</span>
					<span> - </span>
					<div className={styles.licenciaRow__dias}>
						<Timer size={14} />
						<span>{periodo.dias} días</span>
					</div>

				</div>


			</div>
		</article>
	);
}