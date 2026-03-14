import PageLayout from "@/layout/PageLayout/PageLayout";
import styles from "./AsistenciaEmpleadoProfilePage.module.scss";
import AsistenciaHeader from "./AsistenciaHeader";
import AsistenciaKpiGrid from "./AsistenciaKpiGrid";
import AsistenciaMonthlyChart from "./AsistenciaMonthlyChart";
import AsistenciaRecentList from "./AsistenciaRecentList";
import AsistenciaTypeChart from "./AsistenciaTypeChart";

export default function EmpleadoAsistenciasProfilePage() {
	return (
		<PageLayout>
			<div className={styles.page}>
				<AsistenciaHeader />
				<AsistenciaKpiGrid />
				<AsistenciaMonthlyChart />

				<div className={styles.secondary}>
					<AsistenciaTypeChart />
					<AsistenciaRecentList />
				</div>
			</div>
		</PageLayout>
	);
}
