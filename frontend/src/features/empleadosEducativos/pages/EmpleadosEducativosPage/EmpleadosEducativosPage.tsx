import { useState, } from "react";
import FilteredSidebar from "@/components/FilteredSidebar/FilteredSidebar";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";

import { useEmpleadosEducativos } from "../../hooks/useEmpleadosEducativos";
import { useEmpleadoNavigation } from "../../hooks/useEmpleadoNavigation";

import type {
	EmpleadoEducativoFiltro,
} from "../../types/empleadosEducativos.types";
import { FILTROS_EMPLEADOS, } from "../../utils/empleadosEducativos.utils";
import EmpleadosEducativosList from "./EmpleadosEducativosList";
import Pagination from "@/layout/Pagination";
import type { SortState } from "@/utils/types";
import SortBuilder from "@/components/EmpleadoSortDropdown";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";



export default function EmpleadosEducativosPage() {
	const [filtro, setFiltro] =
		useState<EmpleadoEducativoFiltro>("TODOS");

	const [sort, setSort] = useState<SortState>({});

	const [page, setPage] = useState(1);
	const pageSize = useDynamicPageSize();

	const backendPage = page - 1;

	const { data, isLoading } =
		useEmpleadosEducativos(
			filtro,
			backendPage,
			pageSize,
			sort
		);

	const empleadoNav = useEmpleadoNavigation();

	/* Resetear página cuando cambia filtro o sort */
	const handleSortChange = (newSort: SortState) => {
		setSort(newSort);
		setPage(1);
	};

	const handleFiltroChange = (newFiltro: EmpleadoEducativoFiltro) => {
		setFiltro(newFiltro);
		setPage(1);
	};


	const empleados = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	return (
		<SidebarPageLayout
			sidebar={
				<FilteredSidebar
					title="Empleados educativos"
					subtitle="Listado del personal de la escuela"
					filtros={FILTROS_EMPLEADOS}
					value={filtro}
					onChange={handleFiltroChange}
					actionLabel="+ Nuevo empleado"
					onAction={empleadoNav.crear}
					controls={
						<SortBuilder
							value={sort}
							onChange={handleSortChange}
						/>
					}
				/>
			}
			pagination={
				< Pagination
					page={page}
					totalPages={totalPages}
					onChange={setPage}
				/>
			}
		>
			<EmpleadosEducativosList
				empleados={empleados}
				isLoading={isLoading}
				onVerDetalle={empleadoNav.verDetalle}
			/>
		</SidebarPageLayout >
	);
}
