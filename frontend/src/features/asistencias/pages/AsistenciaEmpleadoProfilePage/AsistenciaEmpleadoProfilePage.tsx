import PageLayout from "@/layout/PageLayout/PageLayout";
import styles from "./AsistenciaEmpleadoProfilePage.module.scss";
import AsistenciaHeader from "./AsistenciaHeader";
import AsistenciaKpiGrid from "./AsistenciaKpiGrid";
import AsistenciaMonthlyChart from "./AsistenciaMonthlyChart";
import AsistenciaTypeChart from "./AsistenciaTypeChart";
import AsistenciaRecentList from "./AsistenciaRecentList";

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
