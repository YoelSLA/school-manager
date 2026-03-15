import { useState } from "react";
import { useParams } from "react-router-dom";
import CrearAsignacionModal from "@/features/asignaciones/components/CrearAsignacionModal/CrearAsgnacionModal";
import EditarAsignacionModal from "@/features/asignaciones/components/EditarAsignacionModal/EditarAsignacionModal";
import PageLayout from "@/layout/PageLayout/PageLayout";
import { useCargoActivo } from "../../../asignaciones/hooks/useCargoActivo";
import { useCargosDesignacion } from "../../hooks/useCargosDesignacion";
import useDesignacionDetalle from "../../hooks/useDesignacionDetalle";
import DesignacionCargoActivo from "./DesignacionCargoActivo/DesignacionCargoActivo";
import DesignacionCargosHistorial from "./DesignacionCargosHistorial/DesignacionCargosHistorial";
import styles from "./DesignacionDetallePage.module.scss";
import DesignacionHeaderInfo from "./DesignacionHeaderInfo/DesignacionHeaderInfo";
import DesignacionHorarios from "./DesignacionHorarios";
import { AsignacionDetalleDTO, FiltroCargos } from "@/utils/types";

export default function DesignacionDetallePage() {
	const { designacionId } = useParams<{ designacionId: string }>();
	const id = Number(designacionId);

	const [mostrarCrearAsignacion, setMostrarCrearAsignacion] = useState(false);
	const [cargoAEditar, setCargoAEditar] = useState<AsignacionDetalleDTO | null>(
		null,
	);

	const [filtroCargos, setFiltroCargos] = useState<FiltroCargos>("LICENCIA");

	// 🔹 Designación (header + horarios)
	const {
		designacion,
		isLoading,
		error,
		refetch: refetchDesignacion,
	} = useDesignacionDetalle(id);

	// 🔹 Cargo activo (estado actual)
	const { cargoActivo, isLoading: isLoadingActivo } = useCargoActivo(id);

	// 🔹 Historial de cargos (filtrado desde backend)
	const {
		cargos,
		isLoading: isLoadingCargos,
		refetch: refetchCargos,
	} = useCargosDesignacion(id, filtroCargos);

	if (isLoading) return <p>Cargando designación...</p>;
	if (error) return <p>{error}</p>;
	if (!designacion) return <p>Designación no encontrada</p>;

	return (
		<PageLayout>
			<div className={styles.page}>
				{/* HEADER */}
				<div className={styles.header}>
					<DesignacionHeaderInfo designacion={designacion} />
				</div>
				{/* BODY */}
				<div className={styles.body}>
					{/* CARGO ACTIVO COMPACTO */}
					<div className={styles.cargoActivo}>
						<DesignacionCargoActivo
							cargo={cargoActivo}
							isLoading={isLoadingActivo}
							onEditar={(cargo) => setCargoAEditar(cargo)}
						/>
					</div>

					{/* GRID PRINCIPAL */}
					<div className={styles.content}>
						<div className={styles.horarios}>
							<DesignacionHorarios franjas={designacion.franjasHorarias} />
						</div>

						<div className={styles.historial}>
							<DesignacionCargosHistorial
								cargos={cargos}
								isLoading={isLoadingCargos}
								filtro={filtroCargos}
								onChangeFiltro={setFiltroCargos}
								onNuevoCargo={() => setMostrarCrearAsignacion(true)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* MODAL */}
			{mostrarCrearAsignacion && (
				<CrearAsignacionModal
					designacionId={designacion.id}
					onClose={() => setMostrarCrearAsignacion(false)}
					onSuccess={() => {
						setMostrarCrearAsignacion(false);
						refetchDesignacion();
						refetchCargos();
					}}
				/>
			)}

			{/* MODAL EDITAR */}
			{cargoAEditar && (
				<EditarAsignacionModal
					asignacion={cargoAEditar}
					designacionId={id}
					onClose={() => setCargoAEditar(null)}
					onSuccess={() => {
						setCargoAEditar(null);
						refetchDesignacion();
						refetchCargos();
					}}
				/>
			)}
		</PageLayout>
	);
}
