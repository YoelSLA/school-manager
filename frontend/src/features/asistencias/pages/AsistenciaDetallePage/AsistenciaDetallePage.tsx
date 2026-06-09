import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import ConfirmModal from "@/components/ModalConfirm";
import RegistrarInasistenciaModal from "../../components/RegistrarInasistenciaModal/RegistrarInasistenciaModal";
import useAsistenciaDetallePage from "../../hooks/pages/useAsistenciaDetallePage";
import AsistenciaCalendar from "./AsistenciaCalendar/AsistenciaCalendar";
import styles from "./AsistenciaDetallePage.module.scss";
import AsistenciaHeader from "./AsistenciaHeader/AsistenciaHeader";
import AsistenciaStats from "./AsistenciaStats";

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

	/* =========================================================
	 * LOADING
	 * =======================================================*/
	if (isLoading) {
		return (
			<PageLayout>
				<Breadcrumbs />
				<div>Cargando asistencias...</div>
			</PageLayout>
		);
	}

	/* =========================================================
	 * ERROR
	 * =======================================================*/
	if (error) {
		return (
			<PageLayout>
				<Breadcrumbs />
				<div>Error al cargar asistencias</div>
			</PageLayout>
		);
	}

	return (
		<PageLayout>
			{/* =============================================
			 * BREADCRUMB
			 * ===========================================*/}
			<Breadcrumbs />

			<section className={styles.page}>
				{/* =============================================
				 * HEADER
				 * ===========================================*/}
				<AsistenciaHeader empleado={empleado} />

				{/* =============================================
				 * CONTENT
				 * ===========================================*/}
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

			{/* =============================================
			 * REGISTER MODAL
			 * ===========================================*/}
			<RegistrarInasistenciaModal
				open={isModalOpen}
				diasSeleccionados={selectedDate ? 1 : 0}
				fechasSeleccionadas={selectedDate ? [selectedDate] : []}
				isSubmitting={isPending}
				onCancel={closeModal}
				onConfirm={confirmarRegistro}
			/>

			{/* =============================================
			 * DELETE MODAL
			 * ===========================================*/}
			<ConfirmModal
				open={isDeleteModalOpen}
				title="Eliminar inasistencia"
				description="Esta acción eliminará la inasistencia manual registrada."
				confirmText="Eliminar"
				cancelText="Cancelar"
				onCancel={closeDeleteModal}
				onConfirm={confirmarEliminacion}
				loading={isDeleting}
			/>
		</PageLayout>
	);
}
