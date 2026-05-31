import type { EmpleadoEducativoLicenciasDTO } from "@/shared/utils/types";
import styles from "./EmpleadoLicenciaSection.module.scss";
import LicenciasHistorial from "./LicenciasHistorial";
import LicenciaVigente from "./LicenciaVigente";

type Props = {
	licencias: EmpleadoEducativoLicenciasDTO;
};

export default function EmpleadoLicenciaSection({ licencias }: Props) {
	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<h3 className={styles.title}>LICENCIAS</h3>
			</header>

			<div className={styles.content}>
				<LicenciaVigente licencia={licencias.licenciaActiva} />

				<LicenciasHistorial licencias={licencias.historial} />
			</div>
		</section>
	);
}
