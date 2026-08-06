import { BreadcrumbPageLayout } from "@/app/layouts/pages";
import { ModalConfirm } from "@/shared/components/Modal";
import { AsistenciaCalendar, AsistenciaHeader, AsistenciaStats, RegistrarInasistenciaModal } from "../../components";
import { useAsistenciaDetallePage } from "../../hooks/pages";
import styles from "./AsistenciaDetallePage.module.scss";

export default function AsistenciaDetallePage() {
  const {
    empleado,
    month,
    setMonth,
    asistencias,
    asistenciasMap,
    selectedDate,
    isModalOpen,
    isDeleteModalOpen,
    isPending,
    isDeleting,
    isLoading,
    error,
    handleDayClick,
    closeModal,
    closeDeleteModal,
    confirmarRegistro,
    confirmarEliminacion,
  } = useAsistenciaDetallePage();

  if (isLoading) {
    return (
      <BreadcrumbPageLayout>
        <div>Cargando asistencias...</div>
      </BreadcrumbPageLayout>
    );
  }

  if (error) {
    return (
      <BreadcrumbPageLayout>
        <div>Error al cargar asistencias</div>
      </BreadcrumbPageLayout>
    );
  }

  return (
    <BreadcrumbPageLayout>
      <section className={styles.page}>
        <AsistenciaHeader empleado={empleado} />

        <div className={styles.content}>
          <AsistenciaCalendar
            month={month}
            onMonthChange={setMonth}
            asistenciasMap={asistenciasMap}
            onDayClick={handleDayClick}
          />

          <AsistenciaStats asistencias={asistencias} />
        </div>
      </section>

      <RegistrarInasistenciaModal
        open={isModalOpen}
        diasSeleccionados={selectedDate ? 1 : 0}
        fechasSeleccionadas={selectedDate ? [selectedDate] : []}
        isSubmitting={isPending}
        onCancel={closeModal}
        onConfirm={confirmarRegistro}
      />

      <ModalConfirm
        open={isDeleteModalOpen}
        title="Eliminar inasistencia"
        description="Esta acción eliminará la inasistencia manual registrada."
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={closeDeleteModal}
        onConfirm={confirmarEliminacion}
        loading={isDeleting}
      />
    </BreadcrumbPageLayout>
  );
}