import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "@/layout/Breadcrumbs";
import PageLayout from "@/layout/PageLayout/PageLayout";
import styles from "./AsistenciaEmpleadoProfilePage.module.scss";
import AsistenciaHeader from "./AsistenciaHeader";
import AsistenciaKpiGrid from "./AsistenciaKpiGrid";
import AsistenciaQuickSummary from "./AsistenciaQuickSummary";
import AsistenciaRecentList from "./AsistenciaRecentList";

type NavigationState = {
	dynamicLabels?: Record<string, string>;
	empleado: {
		nombre: string;
		apellido: string;
		cuil: string;
		roles: string[];
	};
};

export default function EmpleadoAsistenciasProfilePage() {
	const { empleadoId } = useParams();

	const location = useLocation();
	const state = location.state as NavigationState | null;

	const empleado = state?.empleado;

	if (!empleado || !empleadoId) {
		return (
			<PageLayout>
				<div>No se pudo recuperar la información del empleado.</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			<Breadcrumbs />
			<div className={styles.page}>
				<header className={styles.page__header}>
					<AsistenciaHeader empleadoId={empleadoId} empleado={empleado} />
				</header>

				<section className={styles.page__kpis}>
					<AsistenciaKpiGrid empleadoId={empleadoId} />
				</section>

				<section className={styles.page__secondary}>
					<div className={styles.page__summary}>
						<AsistenciaQuickSummary empleadoId={empleadoId} />
					</div>

					<div className={styles.page__recent}>
						<AsistenciaRecentList empleadoId={empleadoId} />
					</div>
				</section>
			</div>
		</PageLayout>
	);
}
