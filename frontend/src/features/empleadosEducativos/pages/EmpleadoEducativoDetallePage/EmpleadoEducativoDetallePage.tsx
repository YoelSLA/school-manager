import { useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import ConfirmModal from "@/components/ModalConfirm";
import type { BajaDefinitivaDTO } from "@/shared/utils/types";
import BajaDefinitivaModal from "../../components/BajaDefinitivaModal";
import { useDarDeBajaDefinitiva } from "../../hooks/useDarDeBajaDefinitiva";
import { useEmpleadoEducativo } from "../../hooks/useEmpleadoEducativo";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";
import { useReactivarEmpleado } from "../../hooks/useReactivarEmpleado";
import AsignacionesList from "./AsignacionesList";
import DatosPersonales from "./DatosPersonales/DatosPersonales";
import EmpleadoBottomBar from "./EmpleadoBottomBar/EmpleadoBottomBar";
import styles from "./EmpleadoEducativoDetallePage.module.scss";
import HeaderEmpleado from "./HeaderEmpleado/HeaderEmpleado";
import LicenciasList from "./LicenciasList";

export default function EmpleadoEducativoDetallePage() {
	const { empleadoId } = useParams();
	const empleadoNav = useEmpleadoNavigation();
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [isBajaModalOpen, setIsBajaModalOpen] = useState(false);
	const [isReactivarModalOpen, setIsReactivarModalOpen] = useState(false);

	const id = Number(empleadoId);

	const { data: empleado, isLoading, isError } = useEmpleadoEducativo(id);

	const bajaMutation = useDarDeBajaDefinitiva();
	const reactivarMutation = useReactivarEmpleado();

	if (isLoading) return <div>Cargando empleado...</div>;
	if (isError || !empleado) return <div>Error al cargar el empleado</div>;

	/* =========================
		 HANDLERS
	========================= */

	const handleToggleActivo = () => {
		if (empleado.activo) {
			setIsBajaModalOpen(true);
		} else {
			setIsReactivarModalOpen(true);
		}
	};

	const confirmarBaja = (data: BajaDefinitivaDTO) => {
		if (!escuelaActiva?.id) return;

		bajaMutation.mutate(
			{
				empleadoId: empleado.id,
				escuelaId: escuelaActiva.id,
				payload: data,
			},
			{
				onSuccess: () => {
					setIsBajaModalOpen(false);
				},
			},
		);
	};

	const confirmarReactivacion = () => {
		if (!escuelaActiva?.id) return;

		reactivarMutation.mutate(
			{
				empleadoId: empleado.id,
				escuelaId: escuelaActiva.id,
			},
			{
				onSuccess: () => {
					setIsReactivarModalOpen(false);
				},
			},
		);
	};

	/* =========================
		 RENDER
	========================= */

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
							<AsignacionesList asignaciones={empleado.asignaciones} />
							<LicenciasList licencias={empleado.licencias} />
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

			{/* ================= MODALS ================= */}

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
