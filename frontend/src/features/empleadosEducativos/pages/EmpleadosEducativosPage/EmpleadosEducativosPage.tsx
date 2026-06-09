import { useState } from "react";
import GridListState from "@/app/layouts/GridListState";
import ListPageLayout from "@/app/layouts/ListPageLayout";
import Pagination from "@/app/layouts/Pagination";
import Sidebar from "@/app/layouts/Sidebar";
import SidebarPageLayout from "@/app/layouts/SidebarPageLayout/SidebarPageLayout";
import FilterPillGroup from "@/components/FilterPillGroup";
import type { EmpleadoEducativoFiltro, SortState } from "@/shared/types";
import { usePagination } from "@/shared/utils/hooks/usePagination";
import EmpleadoEducativoCard from "../../components/EmpleadoEducativoCard";
import EmpleadoSortDropdown from "../../components/EmpleadoSortDropdown";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";
import { useEmpleadosEducativos } from "../../hooks/useEmpleadosEducativos";
import { FILTROS_EMPLEADOS } from "../../utils/empleadosEducativos.utils";

export default function EmpleadosEducativosPage() {
	const [filtro, setFiltro] = useState<EmpleadoEducativoFiltro>("TODOS");
	const [sort, setSort] = useState<SortState>({});

	const { page, setPage, pageSize } = usePagination([filtro, sort]);

	const { data, isLoading, refetch, isFetching } = useEmpleadosEducativos(
		filtro,
		page,
		pageSize,
		sort,
	);

	const empleadoNav = useEmpleadoNavigation();

	const empleados = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	/* =========================
			 HANDLERS
	========================= */

	const handleSortChange = (newSort: SortState) => {
		setSort(newSort);
	};

	const handleFiltroChange = (newFiltro: EmpleadoEducativoFiltro) => {
		setFiltro(newFiltro);
	};

	return (
		<SidebarPageLayout
			sidebar={
				<Sidebar
					title="Empleados educativos"
					subtitle="Listado del personal de la escuela"
					filters={
						<FilterPillGroup
							items={FILTROS_EMPLEADOS}
							value={filtro}
							onChange={handleFiltroChange}
						/>
					}
					controls={
						<EmpleadoSortDropdown value={sort} onChange={handleSortChange} />
					}
					onRefresh={refetch}
					isFetching={isFetching}
					onCreate={empleadoNav.crear}
					createLabel="Nuevo empleado"
				/>
			}
			content={
				<ListPageLayout
					content={
						<GridListState
							isLoading={isLoading}
							items={empleados}
							loadingMessage="Cargando empleados educativos…"
							emptyMessage="No hay empleados para el filtro seleccionado."
							getKey={(empleado) => empleado.id}
							renderItem={(empleado) => (
								<EmpleadoEducativoCard
									empleado={empleado}
									onVerDetalle={empleadoNav.verDetalle}
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
	);
}
