import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";
import LicenciaRenovarModal from "../../components/LicenciaRenovarModal";
import { useLicenciaDetalle } from "../../hooks/useLicenciaDetalle";
import { useLicenciasNavigation } from "../../hooks/useLicenciasNavigation";

import styles from "./LicenciaDetallePage.module.scss";
import LicenciaHeaderStack from "./LicenciaHeaderGrid";
import LicenciaTimelineBox from "./LicenciaTimelineBox";


export default function LicenciaDetallePage() {
	const { licenciaId } = useParams<{ licenciaId: string }>();
	const licenciasNav = useLicenciasNavigation();
	const licenciaIdNumber = Number(licenciaId);

	const [renovarVisible, setRenovarVisible] = useState(false);

	const { licencia, isLoading, isError } = useLicenciaDetalle(licenciaIdNumber);

	if (isLoading) return <div className="page-loading">Cargando licencia…</div>;
	if (isError) return <div className="page-error">{isError}</div>;
	if (!licencia) return <div className="page-error">Licencia no encontrada</div>;

	return (
		<PageLayout>
			<div className={styles.page}>
				<div className={styles.top}>
					<div className={styles.header}>
						<LicenciaHeaderStack licencia={licencia} />
					</div>
					<div className={styles.timeline}>
						<LicenciaTimelineBox
							timeline={licencia.timeline}
							licenciaActualId={licencia.id}
							onNavigate={licenciasNav.verDetalle}
							onRenovar={() => setRenovarVisible(true)}
						/>
					</div>
				</div>
			</div>

			{renovarVisible && (
				<LicenciaRenovarModal
					licenciaId={licencia.id}
					onClose={() => setRenovarVisible(false)}
					onSuccess={() => setRenovarVisible(false)}
				/>
			)}
		</PageLayout>
	);
}
