
import { useState } from "react";
import SortBuilder from "@/components/EmpleadoSortDropdown";
import Pagination from "@/layout/Pagination";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import GridListState from "@/layout/GridListState";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";
import { useEmpleadosEducativos } from "../../hooks/useEmpleadosEducativos";

import { FILTROS_EMPLEADOS } from "../../utils/empleadosEducativos.utils";
import EmpleadoEducativoCard from "../../components/EmpleadoEducativoCard";
import { usePagination } from "@/hooks/usePagination";
import type {
	EmpleadoEducativoFiltro,
	SortState,
} from "@/utils/types";
import Sidebar from "@/layout/Sidebar";
import FilterPillGroup from "@/components/FilterPillGroup";
import ListPageLayout from "@/layout/ListPageLayout";

export default function EmpleadosEducativosPage() {
	const [filtro, setFiltro] =
		useState<EmpleadoEducativoFiltro>("TODOS");
	const [sort, setSort] = useState<SortState>({});

	const { page, setPage, pageSize } = usePagination([
		filtro,
		sort,
	]);

	const { data, isLoading, refetch, isFetching } =
		useEmpleadosEducativos(filtro, page, pageSize, sort);

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
						<SortBuilder value={sort} onChange={handleSortChange} />
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