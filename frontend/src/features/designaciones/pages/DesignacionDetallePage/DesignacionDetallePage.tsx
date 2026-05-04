import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@/layout/Breadcrumbs";
import PageLayout from "@/layout/PageLayout/PageLayout";
import type { AsignacionDetalleDTO, FiltroCargos } from "@/utils/types";
import { useCargoActivo } from "../../../asignaciones/hooks/useCargoActivo";
import { useCargosDesignacion } from "../../hooks/useCargosDesignacion";
import useDesignacionDetalle from "../../hooks/useDesignacionDetalle";
import DesignacionCargoActivo from "./DesignacionCargoActivo/DesignacionCargoActivo";
import DesignacionCargosHistorial from "./DesignacionCargosHistorial/DesignacionCargosHistorial";
import styles from "./DesignacionDetallePage.module.scss";
import DesignacionHeaderInfo from "./DesignacionHeaderInfo/DesignacionHeaderInfo";
import DesignacionHorarios from "./DesignacionHorarios";
import ModalCreateAsignacionTitular from "@/features/asignaciones/components/ModalCreateAsignacion/ModalCreateAsignacionTitular/ModalCreateAsignacionTitular";
import ModalCreateAsignacionProvisional from "@/features/asignaciones/components/ModalCreateAsignacion/ModalCreateAsignacionProvisional/ModalCreateAsignacionProvisional";
import ModalUpdateAsignacionProvisional from "@/features/asignaciones/components/ModalUpdateAsignacion/ModalUpdateAsignacionProvisional";
import ModalUpdateAsignacionTitular from "@/features/asignaciones/components/ModalUpdateAsignacion/ModalUpdateAsignacionTitular";
import DesignacionDatos from "./DesignacionDatos/DesignacionDatos";
import Button from "@/components/Button";
import { Pencil } from "lucide-react";
import { designacionesPaths } from "@/router/paths";

export default function DesignacionDetallePage() {
	const { designacionId } = useParams<{ designacionId: string }>();
	const id = Number(designacionId);
	const navigate = useNavigate();

	const [cargoAEditar, setCargoAEditar] = useState<AsignacionDetalleDTO | null>(
		null,
	);
	const [tipoAsignacionCrear, setTipoAsignacionCrear] = useState<
		"TITULAR" | "PROVISIONAL" | null
	>(null);

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

	const handleEditar = () => {
		navigate(designacionesPaths.edit(id));
	};


	if (isLoading) return <p>Cargando designación...</p>;
	if (error) return <p>{error}</p>;
	if (!designacion) return <p>Designación no encontrada</p>;

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<div className={styles.page}>
				{/* HEADER */}
				<div className={styles.header}>
					<DesignacionHeaderInfo designacion={designacion} />
				</div>
				{/* BODY */}
				<div className={styles.body}>
					<div className={styles.content}>
						<div className={styles.cargoActivo}>
							<DesignacionCargoActivo
								cargo={cargoActivo}
								designacionId={id}
								isLoading={isLoadingActivo}
								onEditar={(cargo) => setCargoAEditar(cargo)}
							/>
						</div>
						<div className={styles.horarios}>
							<DesignacionHorarios franjas={designacion.franjasHorarias} />
						</div>
						<div className={styles.datos}>
							<DesignacionDatos designacion={designacion} />

						</div>
						<div className={styles.botonesSection}>
							<h3 className={styles.title}>Acciones</h3>

							<div className={styles.botones}>
								<Button variant="secondary" size="sm" onClick={handleEditar}>
									<Pencil size={16} />
									Editar
								</Button>
							</div>
						</div>
						<div className={styles.historial}>
							<DesignacionCargosHistorial
								cargos={cargos}
								isLoading={isLoadingCargos}
								filtro={filtroCargos}
								onChangeFiltro={setFiltroCargos}
								onNuevoCargo={(tipo) => setTipoAsignacionCrear(tipo)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* MODAL */}
			{tipoAsignacionCrear === "TITULAR" && (
				<ModalCreateAsignacionTitular
					designacionId={designacion.id}
					secuencia={1}
					empleadoInicial={null}
					tomaPosesion={new Date().toISOString().slice(0, 10)}
					onClose={() => setTipoAsignacionCrear(null)}
					onSuccess={() => {
						setTipoAsignacionCrear(null);
						refetchDesignacion();
						refetchCargos();
					}}
				/>
			)}

			{tipoAsignacionCrear === "PROVISIONAL" && (
				<ModalCreateAsignacionProvisional
					designacionId={designacion.id}
					onClose={() => setTipoAsignacionCrear(null)}
					onSuccess={() => {
						setTipoAsignacionCrear(null);
						refetchDesignacion();
						refetchCargos();
					}}
				/>
			)}

			{/* MODAL EDITAR */}
			{cargoAEditar && cargoAEditar.situacionDeRevista === "Titular" && (
				<ModalUpdateAsignacionTitular
					asignacionId={cargoAEditar.id}
					designacionId={id}
					secuencia={cargoAEditar.secuencia ?? 1}
					empleadoInicial={cargoAEditar.empleado}
					tomaPosesion={cargoAEditar.periodo.fechaDesde}
					onClose={() => setCargoAEditar(null)}
					onSuccess={() => {
						setCargoAEditar(null);
						refetchDesignacion();
						refetchCargos();
					}}
				/>
			)}

			{cargoAEditar && cargoAEditar.situacionDeRevista === "Provisional" && (
				<ModalUpdateAsignacionProvisional
					asignacionId={cargoAEditar.id}
					designacionId={id}
					secuencia={cargoAEditar.secuencia ?? 1}
					empleadoInicial={cargoAEditar.empleado}
					fechaDesde={cargoAEditar.periodo.fechaDesde}
					fechaHasta={cargoAEditar.periodo.fechaHasta}
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
