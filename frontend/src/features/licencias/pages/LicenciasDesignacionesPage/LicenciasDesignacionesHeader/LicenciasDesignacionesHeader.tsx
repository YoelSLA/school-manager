import InfoCard from "@/features/licencias/components/InfoCard";
import BadgeEstadoLicencia from "@/shared/components/BagdeEstadoLicencia/BagdeEstadoLicencia";
import { formatearFecha } from "@/shared/utils";
import type {
	EmpleadoEducativoMinimoDTO,
	LicenciaDetalleDTO,
} from "@/shared/utils/types";
import { CalendarDays, FileText, User } from "lucide-react";
import styles from "./LicenciaDesignacionesHeader.module.scss";

type Props = {
	empleado: EmpleadoEducativoMinimoDTO;
	licencia: LicenciaDetalleDTO;
};

export default function LicenciaDesignacionesHeader({
	empleado,
	licencia,
}: Props) {
	return (
		<header className={styles.header}>
			<div className={styles.statusRow}>
				<BadgeEstadoLicencia value={licencia.estadoLicencia} />
			</div>

			<div className={styles.cardsContainer}>
				<InfoCard icon={<User size={16} />} title="Empleado">
					<div className={styles.mainValue}>
						{empleado.apellido}, {empleado.nombre}
					</div>

					<div className={styles.secondaryValue}>{empleado.cuil}</div>
				</InfoCard>

				<InfoCard icon={<FileText size={14} />} title="Licencia">
					<div className={styles.licenciaTop}>
						<span className={styles.article}>
							{licencia.normativa.articulo}
						</span>

						<span className={styles.code}>{licencia.normativa.codigo}</span>
					</div>

					<div className={styles.description}>
						{licencia.normativa.descripcion}
					</div>
				</InfoCard>

				<InfoCard icon={<CalendarDays size={14} />} title="Período">
					<div className={styles.periodInline}>
						<span>{formatearFecha(licencia.periodo.fechaDesde)}</span>
						<span className={styles.arrow}>➡️</span>
						<span>{formatearFecha(licencia.periodo.fechaHasta)}</span>

						<span className={styles.daysInline}>
							({licencia.periodo.dias} días)
						</span>
					</div>
				</InfoCard>
			</div>
		</header>
	);
}
