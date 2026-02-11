import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/layout/PageLayout/PageLayout";
import CrearAsignacionModal from "@/features/asignaciones/components/CrearAsignacionModal/CrearAsgnacionModal";
import useDesignacion from "../../hooks/useDesignacion";
import { useCargosDesignacion } from "../../hooks/useCargosDesignacion";
import { useCargoActivo } from "../../hooks/useCargoActivo";
import DesignacionHeaderInfo from "./DesignacionHeaderInfo/DesignacionHeaderInfo";
import DesignacionHorarios from "./DesignacionHorarios";
import DesignacionCargosHistorial from "./DesignacionCargosHistorial/DesignacionCargosHistorial";

import type { FiltroCargos } from "@/features/asignaciones/types/asignacion.types";

import styles from "./DesignacionDetallePage.module.scss";
import DesignacionCargoActivo from "./DesignacionCargoActivo/DesignacionCargoActivo";

export default function DesignacionDetallePage() {
	const { designacionId } = useParams<{ designacionId: string }>();
	const id = Number(designacionId);

	const [mostrarCrearAsignacion, setMostrarCrearAsignacion] =
		useState(false);

	const [filtroCargos, setFiltroCargos] =
		useState<FiltroCargos>("LICENCIA");

	// 🔹 Designación (header + horarios)
	const {
		designacion,
		isLoading,
		error,
		refetch: refetchDesignacion,
	} = useDesignacion(id);

	// 🔹 Cargo activo (estado actual)
	const {
		cargoActivo,
		isLoading: isLoadingActivo,
	} = useCargoActivo(id);

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

				{/* BODY — 3 COLUMNAS */}
				<div className={styles.body}>
					{/* 🟪 Col 1 — Horarios */}
					<div className={styles.horarios}>
						<DesignacionHorarios
							franjas={designacion.franjasHorarias}
						/>
					</div>

					{/* 🟦 Col 2 — Cargo activo */}
					<div className={styles.cargoActivo}>
						<DesignacionCargoActivo
							cargo={cargoActivo}
							isLoading={isLoadingActivo}
						/>
					</div>

					{/* 🟨 Col 3 — Historial + filtros + nuevo */}
					<div className={styles.historial}>
						<DesignacionCargosHistorial
							cargos={cargos}
							isLoading={isLoadingCargos}
							filtro={filtroCargos}
							onChangeFiltro={setFiltroCargos}
							onNuevoCargo={() =>
								setMostrarCrearAsignacion(true)
							}
						/>
					</div>
				</div>
			</div>

			{/* MODAL */}
			{mostrarCrearAsignacion && (
				<CrearAsignacionModal
					designacionId={designacion.id}
					onClose={() =>
						setMostrarCrearAsignacion(false)
					}
					onSuccess={() => {
						setMostrarCrearAsignacion(false);
						refetchDesignacion();
						refetchCargos();
					}}
				/>
			)}
		</PageLayout>
	);
}
