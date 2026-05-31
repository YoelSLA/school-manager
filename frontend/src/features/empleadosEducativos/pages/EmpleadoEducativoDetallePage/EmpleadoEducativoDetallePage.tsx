import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";

import ConfirmModal from "@/components/ModalConfirm";

import BajaDefinitivaModal from "../../components/BajaDefinitivaModal";

import { useEmpleadoEducativoDetallePage } from "../../hooks/useEmpleadoEducativoDetallePage";

import AsignacionesList from "./AsignacionesList";
import DatosPersonales from "./DatosPersonales/DatosPersonales";
import EmpleadoBottomBar from "./EmpleadoBottomBar/EmpleadoBottomBar";

import styles from "./EmpleadoEducativoDetallePage.module.scss";
import EmpleadoLicenciaSection from "./EmpleadoLicenciaSection";
import HeaderEmpleado from "./HeaderEmpleado/HeaderEmpleado";

export default function EmpleadoEducativoDetallePage() {
	const {
		empleado,
		asignaciones,
		licencias,
		empleadoNav,
		isLoading,
		isError,
		isBajaModalOpen,
		setIsBajaModalOpen,
		isReactivarModalOpen,
		setIsReactivarModalOpen,
		handleToggleActivo,
		confirmarBaja,
		confirmarReactivacion,
		bajaMutation,
		reactivarMutation,
	} = useEmpleadoEducativoDetallePage();

	if (isLoading) {
		return <div>Cargando empleado...</div>;
	}

	if (isError || !empleado || !asignaciones || !licencias) {
		return <div>Error al cargar el empleado</div>;
	}

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<div className={styles.page}>
				<HeaderEmpleado
					empleado={empleado}
					onEditar={() => empleadoNav.editar(empleado)}
					onToggleActivo={handleToggleActivo}
				/>

				<div className={styles.main}>
					<div className={styles.left}>
						<DatosPersonales empleado={empleado} />
					</div>

					<div className={styles.right}>
						<div className={styles.panel}>
							<AsignacionesList asignaciones={asignaciones.asignaciones} />
							<EmpleadoLicenciaSection licencias={licencias} />
						</div>
					</div>
				</div>

				<EmpleadoBottomBar
					activo={empleado.activo}
					onCrearCargo={() => empleadoNav.crearCargo?.(empleado)}
					onCrearLicencia={() => empleadoNav.crearLicencia?.(empleado)}
					onEditar={() => empleadoNav.editar(empleado)}
					onToggleActivo={handleToggleActivo}
				/>
			</div>

			<BajaDefinitivaModal
				isOpen={isBajaModalOpen}
				onClose={() => setIsBajaModalOpen(false)}
				onConfirm={confirmarBaja}
				isSubmitting={bajaMutation.isPending}
			/>

			<ConfirmModal
				open={isReactivarModalOpen}
				title="Reactivar empleado"
				description="El empleado volverá a estar activo en el sistema."
				confirmText="Reactivar"
				cancelText="Cancelar"
				onConfirm={confirmarReactivacion}
				onCancel={() => setIsReactivarModalOpen(false)}
				loading={reactivarMutation.isPending}
			/>
		</PageLayout>
	);
}
