import { useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmModal from "@/components/ConfirmModal";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import BajaDefinitivaModal from "../../components/BajaDefinitivaModal";
import { useDarDeBajaDefinitiva } from "../../hooks/useDarDeBajaDefinitiva";
import { useEmpleadoEducativo } from "../../hooks/useEmpleadoEducativo";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";
import { useReactivarEmpleado } from "../../hooks/useReactivarEmpleado";
import AsignacionesList from "./AsignacionesList";
import DatosPersonales from "./DatosPersonales/DatosPersonales";
import styles from "./EmpleadoEducativoDetallePage.module.scss";
import HeaderEmpleado from "./HeaderEmpleado/HeaderEmpleado";
import LicenciasList from "./LicenciasList";
import { BajaDefinitivaDTO } from "@/utils/types";

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
				payload: data
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
		<PageLayout>
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
