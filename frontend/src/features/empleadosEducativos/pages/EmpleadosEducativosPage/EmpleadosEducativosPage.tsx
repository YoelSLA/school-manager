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
import Button from "@/components/Button/Button";
import { RefreshCw } from "lucide-react";
import styles from "./EmpleadosEducativosPage.module.scss";


export default function EmpleadosEducativosPage() {
	const [filtro, setFiltro] =
		useState<EmpleadoEducativoFiltro>("TODOS");

	const [sort, setSort] = useState<SortState>({});

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();


	const { data, isLoading, refetch, isFetching } =
		useEmpleadosEducativos(
			filtro,
			page,
			pageSize,
			sort
		);

	const empleadoNav = useEmpleadoNavigation();

	const handleSortChange = (newSort: SortState) => {
		setSort(newSort);
		setPage(0);
	};

	const handleFiltroChange = (newFiltro: EmpleadoEducativoFiltro) => {
		setFiltro(newFiltro);
		setPage(0);
	};

	const handleRefresh = () => {
		setPage(0);
		refetch();
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
					extraActions={
						<Button
							variant="secondary"
							onClick={handleRefresh}
							disabled={isFetching}
						>
							<span className={styles.refreshContent}>
								<RefreshCw
									size={16}
									className={isFetching ? styles.spin : ""}
								/>
								<span>Actualizar</span>
							</span>
						</Button>
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
