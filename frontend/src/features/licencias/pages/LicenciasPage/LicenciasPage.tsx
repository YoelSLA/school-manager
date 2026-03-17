import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import ListState from "@/components/ListState";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout/ScrollableGridListLayout";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { useLicencias } from "../../hooks/useLicencias";
import { useLicenciasNavigation } from "../../hooks/useLicenciasNavigation";
import LicenciaCard from "../../components/LicenciaCard";

import type { LicenciaResumenDTO } from "@/utils/types";
import useDeleteLicencia from "../../hooks/useDeleteLicencia";

export default function LicenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const licenciasNav = useLicenciasNavigation();

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	const [licenciaAEliminar, setLicenciaAEliminar] =
		useState<LicenciaResumenDTO | null>(null);

	useEffect(() => {
		setPage(0);
	}, []);

	/* =========================
		 QUERY
	========================= */

	const { data, isLoading, isError, refetch } = useLicencias(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const licencias = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	/* =========================
		 DELETE
	========================= */

	const { mutate: deleteLicencia, isPending: isDeleting } = useDeleteLicencia();

	const handleConfirmDelete = () => {
		if (!licenciaAEliminar) return;

		deleteLicencia(licenciaAEliminar.id, {
			onSuccess: () => setLicenciaAEliminar(null),
		});
	};

	return (
		<>
			<SidebarPageLayout
				sidebar={
					<SidebarSectionLayout
						title="Licencias"
						subtitle="Gestión de licencias del personal educativo"
						actions={
							<Button onClick={licenciasNav.crear}>
								+ Nueva licencia
							</Button>
						}
					/>
				}
				pagination={
					totalPages > 1 ? (
						<Pagination
							page={page}
							totalPages={totalPages}
							onChange={setPage}
						/>
					) : undefined
				}
			>
				{isLoading ? (
					<ListState>Cargando licencias…</ListState>
				) : isError ? (
					<div>
						<p>No se pudieron cargar las licencias</p>
						<Button size="sm" onClick={() => refetch()}>
							Reintentar
						</Button>
					</div>
				) : licencias.length === 0 ? (
					<ListState>No hay licencias para mostrar</ListState>
				) : (
					<ScrollableGridListLayout>
						{licencias.map((licencia) => (
							<LicenciaCard
								key={licencia.id}
								licencia={licencia}
								onVerDetalle={licenciasNav.verDetalle}
								onDelete={() => setLicenciaAEliminar(licencia)}
							/>
						))}
					</ScrollableGridListLayout>
				)}
			</SidebarPageLayout>

			{/* DELETE */}
			{licenciaAEliminar && (
				<ConfirmModal
					open
					title="Eliminar licencia"
					description={`¿Seguro que querés eliminar la licencia ${licenciaAEliminar.normativa.codigo}?`}
					confirmText="Eliminar"
					cancelText="Cancelar"
					onConfirm={handleConfirmDelete}
					onCancel={() => setLicenciaAEliminar(null)}
					loading={isDeleting}
				/>
			)}
		</>
	);
}