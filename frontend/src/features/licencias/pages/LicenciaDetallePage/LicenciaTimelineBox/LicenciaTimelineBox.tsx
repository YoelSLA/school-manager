import { useUltimaLicencia } from "@/features/licencias/hooks/useUltimaLicencia";
import type { LicenciaTimelineItemDTO } from "@/features/licencias/types/licencia.types";

import styles from "./LicenciaTimelineBox.module.scss";
import LicenciaTimelineFooter from "./LicenciaTimelineFooter";
import LicenciaTimelineList from "./LicenciaTimelineList";

type Props = {
	timeline: LicenciaTimelineItemDTO[];
	licenciaActualId: number;
	onNavigate: (licenciaId: number) => void;
	onRenovar: () => void;
};

export default function LicenciaTimelineBox({
	timeline,
	licenciaActualId,
	onNavigate,
	onRenovar,
}: Props) {
	const puedeRenovar = useUltimaLicencia(timeline, licenciaActualId);

	return (
		<section className={styles.box}>
			<h3 className={styles.title}>LICENCIA EN EL TIEMPO</h3>

			<div className={styles.body}>
				<LicenciaTimelineList
					timeline={timeline}
					licenciaActualId={licenciaActualId}
					onNavigate={onNavigate}
				/>

				<LicenciaTimelineFooter
					puedeRenovar={puedeRenovar}
					onRenovar={onRenovar}
				/>
			</div>
		</section>
	);
}
