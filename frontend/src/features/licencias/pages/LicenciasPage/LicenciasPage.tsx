import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { usePagination } from "@/hooks/usePagination";
import GridListState from "@/layout/GridListState";
import ListPageLayout from "@/layout/ListPageLayout";
import Pagination from "@/layout/Pagination";
import Sidebar from "@/layout/Sidebar";
import SidebarPageLayout from "@/layout/SidebarPageLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import type { LicenciaResumenDTO } from "@/utils/types";
import LicenciaCard from "../../components/LicenciaCard";
import useDeleteLicencia from "../../hooks/useDeleteLicencia";
import { useLicencias } from "../../hooks/useLicencias";
import { useLicenciasNavigation } from "../../hooks/useLicenciasNavigation";

export default function LicenciasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const licenciasNav = useLicenciasNavigation();

	const { page, setPage, pageSize } = usePagination([escuelaActiva?.id]);

	const [licenciaAEliminar, setLicenciaAEliminar] =
		useState<LicenciaResumenDTO | null>(null);

	/* =========================
		 QUERY
	========================= */

	const { data, isLoading, isError, refetch, isFetching } = useLicencias(
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
					<Sidebar
						title="Licencias"
						subtitle="Gestión de licencias del personal educativo"
						onRefresh={refetch}
						isFetching={isFetching}
						onCreate={licenciasNav.crear}
						createLabel="Nueva licencia"
					/>
				}
				content={
					<ListPageLayout
						content={
							<GridListState
								isLoading={isLoading}
								isError={isError}
								items={licencias}
								loadingMessage="Cargando licencias…"
								emptyMessage="No hay licencias para el filtro seleccionado"
								errorMessage="No se pudieron cargar las licencias"
								getKey={(l) => l.id}
								renderItem={(l) => (
									<LicenciaCard
										licencia={l}
										onVerDetalle={licenciasNav.verDetalle}
										onDelete={() => setLicenciaAEliminar(l)}
									/>
								)}
							/>
						}
						pagination={
							<Pagination
								page={page}
								totalPages={totalPages}
								onChange={setPage}
							/>
						}
					/>
				}
			/>

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
