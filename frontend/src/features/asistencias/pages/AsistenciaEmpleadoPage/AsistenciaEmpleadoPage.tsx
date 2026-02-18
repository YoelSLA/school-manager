import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import PageLayout from "@/layout/PageLayout/PageLayout";
import RegistrarInasistenciaModal from "../../components/RegistrarInasistenciaModal";
import { useAsistenciasEmpleadoMes } from "../../hooks/useAsistenciasEmpleadoMes";
import { useEliminarInasistenciasManual } from "../../hooks/useEliminarInasistenciasManual";
import { useRegistrarInasistenciasManual } from "../../hooks/useRegistrarInasistenciasManual";
import styles from "./AsistenciaDetallePage.module.scss";
import AsistenciaMain from "./AsistenciaMain/AsistenciaMain";
import SidebarContexto from "./SidebarContexto/SidebarContexto";
import SidebarTiempo from "./SidebarTiempo";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

export default function AsistenciaDetallePage() {
	const { empleadoId } = useParams<{ empleadoId: string }>();
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const location = useLocation();
	const empleado = location.state?.empleado;

	const empleadoIdNumber = Number(empleadoId);
	const empleadoValido = !!empleadoId && !Number.isNaN(empleadoIdNumber);

	/* ===============================
		 TIEMPO
	================================ */
	const now = new Date();
	const [anio, setAnio] = useState(now.getFullYear());
	const [mes, setMes] = useState(now.getMonth() + 1);

	/* ===============================
		 SELECCIÓN
	================================ */
	const [selectedFechas, setSelectedFechas] = useState<string[]>([]);

	/* ===============================
		 MODAL
	================================ */
	const [isModalOpen, setIsModalOpen] = useState(false);

	/* ===============================
		 QUERY
	================================ */

	const {
		data: asistencias = [],
		isLoading,
		error,
	} = useAsistenciasEmpleadoMes(escuelaActiva?.id ?? 0, empleadoIdNumber, anio, mes, {
		enabled: empleadoValido,
	});

	/* ===============================
		 MUTATION
	================================ */
	const { mutate: registrarAsistencia, isPending: isRegistrando } =

		useRegistrarInasistenciasManual(escuelaActiva?.id, empleadoIdNumber, anio, mes);

	const { mutate: eliminarInasistencias, isPending: isEliminando } =
		useEliminarInasistenciasManual(escuelaActiva?.id, empleadoIdNumber, anio, mes);

	/* ===============================
		 HANDLERS
	================================ */
	const openModal = () => {
		if (selectedFechas.length === 0) return;
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const confirmarRegistro = ({
		tipoLicencia,
		observacion,
	}: {
		tipoLicencia: string;
		observacion?: string;
	}) => {
		registrarAsistencia(
			{
				empleadoId: empleadoIdNumber,
				fechas: selectedFechas,
				tipoLicencia,
				observacion,
			},
			{
				onSuccess: () => {
					setSelectedFechas([]);
					closeModal();
				},
			},
		);
	};

	const asistenciasSeleccionadas = asistencias.filter((a) =>
		selectedFechas.includes(a.fecha),
	);

	const asistenciasEliminables = asistenciasSeleccionadas.filter(
		(a) => a.estadoAsistencia === "AUSENTE" && a.licencia === null,
	);

	const cantidadEliminables = asistenciasEliminables.length;

	const eliminarSeleccionadas = () => {
		if (cantidadEliminables === 0) return;

		const fechasAEliminar = asistenciasEliminables.map((a) => a.fecha);

		eliminarInasistencias(fechasAEliminar, {
			onSuccess: () => {
				setSelectedFechas([]);
			},
		});
	};

	return (
		<PageLayout>
			<section className={styles["asistencia-detalle"]}>
				<SidebarTiempo
					anio={anio}
					mes={mes}
					onChangeAnio={setAnio}
					onChangeMes={setMes}
				/>

				<AsistenciaMain
					asistencias={asistencias}
					loading={isLoading}
					error={error}
					empleado={empleado}
					selectedFechas={selectedFechas}
					onChangeSelectedFechas={setSelectedFechas}
				/>

				<SidebarContexto
					asistencias={asistencias}
					anio={anio}
					mes={mes}
					selectedFechas={selectedFechas}
					onRegistrar={openModal}
					onEliminar={eliminarSeleccionadas}
					cantidadEliminables={cantidadEliminables}
					disabled={isRegistrando || isEliminando}
				/>
			</section>

			<RegistrarInasistenciaModal
				open={isModalOpen}
				diasSeleccionados={selectedFechas.length}
				isSubmitting={isRegistrando}
				onCancel={closeModal}
				onConfirm={confirmarRegistro}
			/>
		</PageLayout>
	);
}
