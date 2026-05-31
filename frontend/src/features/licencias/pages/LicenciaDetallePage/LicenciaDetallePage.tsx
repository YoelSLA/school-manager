import { useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@/app/layouts/Breadcrumbs";
import PageLayout from "@/app/layouts/PageLayout/PageLayout";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ModalConfirm";
import LicenciaRenovarModal from "../../components/LicenciaRenovarModal";
import useDeleteLicencia from "../../hooks/useDeleteLicencia";
import { useLicenciaDetalle } from "../../hooks/useLicenciaDetalle";
import { useLicenciasNavigation } from "../../hooks/useLicenciasNavigation";
import { useLicenciaTimeline } from "../../hooks/useLicenciaTimeline";
import { useUltimaLicencia } from "../../hooks/useUltimaLicencia";
import styles from "./LicenciaDetallePage.module.scss";
import LicenciaHeaderStack from "./LicenciaHeaderGrid";
import LicenciaTimelineList from "./LicenciaTimelineList";

export default function LicenciaDetallePage() {
	const { licenciaId } = useParams<{ licenciaId: string }>();

	const licenciasNav = useLicenciasNavigation();

	const licenciaIdNumber = Number(licenciaId);

	/* =================================
		 STATE
	================================= */

	const [renovarVisible, setRenovarVisible] = useState(false);

	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	/* =================================
		 QUERY
	================================= */

	const { licencia, isLoading, isError } = useLicenciaDetalle(licenciaIdNumber);

	const {
		data: timeline = [],
		isLoading: timelineLoading,
		isError: timelineError,
	} = useLicenciaTimeline(licenciaIdNumber);

	const puedeRenovar = useUltimaLicencia(timeline, licenciaIdNumber);

	/* =================================
		 DELETE
	================================= */

	const { mutate: deleteLicencia, isPending: isDeleting } = useDeleteLicencia();

	const handleDelete = () => {
		if (!licencia) return;
		deleteLicencia(licencia.id, {
			onSuccess: () => {
				setDeleteModalOpen(false);

				licenciasNav.listado();
			},
		});
	};

	/* =================================
		 STATES
	================================= */

	if (isLoading) {
		return <div className="page-loading">Cargando licencia…</div>;
	}

	if (isError) {
		return <div className="page-error">{isError}</div>;
	}

	if (!licencia) {
		return <div className="page-error">Licencia no encontrada</div>;
	}

	return (
		<PageLayout breadcrumbs={<Breadcrumbs />}>
			<div className={styles.page}>
				{/* =================================
				    CONTENT
				================================= */}
				<div className={styles.content}>
					{/* =================================
					    HEADER
					================================= */}
					<div className={styles.header}>
						<LicenciaHeaderStack licencia={licencia} />
					</div>

					{/* =================================
					    TIMELINE
					================================= */}
					<div className={styles.timeline}>
						{timelineLoading && <p>Cargando timeline…</p>}

						{timelineError && <p>Error al cargar timeline</p>}

						{!timelineLoading && !timelineError && (
							<LicenciaTimelineList
								timeline={timeline}
								licenciaActualId={licencia.id}
								onNavigate={licenciasNav.verDetalle}
							/>
						)}
					</div>
				</div>

				{/* =================================
				    ACTIONS BAR
				================================= */}
				<div className={styles.actionsBar}>
					{/* DESIGNACIONES */}
					<Button
						variant="secondary"
						onClick={() => {
							licenciasNav.verDesignaciones(
								licencia.id,
								licencia.empleado,
								licencia,
							);
						}}
					>
						Designaciones
					</Button>

					{/* RENOVAR */}
					{puedeRenovar && (
						<Button variant="primary" onClick={() => setRenovarVisible(true)}>
							Renovar licencia
						</Button>
					)}

					{/* ELIMINAR */}
					<Button variant="danger" onClick={() => setDeleteModalOpen(true)}>
						Eliminar
					</Button>
				</div>
			</div>

			{/* =================================
			    MODAL RENOVAR
			================================= */}
			{renovarVisible && (
				<LicenciaRenovarModal
					licenciaId={licencia.id}
					onClose={() => setRenovarVisible(false)}
					onSuccess={() => setRenovarVisible(false)}
				/>
			)}

			{/* =================================
			    MODAL DELETE
			================================= */}
			{deleteModalOpen && (
				<ConfirmModal
					open
					title="Eliminar licencia"
					description={`¿Seguro que querés eliminar la licencia ${licencia.normativa.codigo}?`}
					confirmText="Eliminar"
					cancelText="Cancelar"
					onConfirm={handleDelete}
					onCancel={() => setDeleteModalOpen(false)}
					loading={isDeleting}
				/>
			)}
		</PageLayout>
	);
}
