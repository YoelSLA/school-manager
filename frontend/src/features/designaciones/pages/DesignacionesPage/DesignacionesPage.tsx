import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import FilterPillGroup from "@/components/FilterPillGroup/FilterPillGroup";
import FiltersModal from "@/components/FiltersModal";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { FILTROS_DESIGNACIONES } from "@/utils";
import AdminFilters from "../../components/AdminFilters";
import CursoFilters from "../../components/CursoFilters";
import { useDesignacionesAdministrativas } from "../../hooks/useDesignacionesAdministrativas";
import { useDesignacionesCursos } from "../../hooks/useDesignacionesCursos";
import { useDesignacionesNavigation } from "../../hooks/useDesignacionesNavigation";
import type {
	CursoFiltersState,
	DesignacionFiltro,
} from "../../types/designacion.types";
import DesignacionesList from "./DesignacionesList";
import styles from "./DesignacionesPage.module.scss";

export default function DesignacionesPage() {
	const [cursoFilters, setCursoFilters] = useState<CursoFiltersState>({});
	const [draftCursoFilters, setDraftCursoFilters] = useState<CursoFiltersState>(
		{},
	);

	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigation = useDesignacionesNavigation();

	const [filtro, setFiltro] = useState<DesignacionFiltro>("ADMIN");
	const [page, setPage] = useState(0);
	const [openFilters, setOpenFilters] = useState(false);

	const pageSize = useDynamicPageSize();

	/* =========================
		 RESET PAGE
	========================= */

	useEffect(() => {
		setPage(0);
	}, [filtro, pageSize]);

	/* =========================
		 QUERIES
	========================= */

	const {
		data: adminData,
		isLoading: isLoadingAdmin,
		isError: isErrorAdmin,
		refetch: refetchAdmin,
		isFetching: isFetchingAdmin,
	} = useDesignacionesAdministrativas(escuelaActiva?.id, page, pageSize, {
		enabled: filtro === "ADMIN",
	});

	const {
		data: cursoData,
		isLoading: isLoadingCursos,
		isError: isErrorCursos,
		refetch: refetchCursos,
		isFetching: isFetchingCursos,
	} = useDesignacionesCursos(escuelaActiva?.id, page, pageSize, cursoFilters, {
		enabled: filtro === "CURSO",
	});

	/* =========================
		 DATA
	========================= */

	const data = filtro === "ADMIN" ? adminData : cursoData;
	const totalPages = data?.totalPages ?? 0;

	const adminDesignaciones = adminData?.content ?? [];
	const cursoDesignaciones = cursoData?.content ?? [];

	const isFetching = filtro === "ADMIN" ? isFetchingAdmin : isFetchingCursos;

	/* =========================
		 FIX PAGE OUT OF RANGE
	========================= */

	useEffect(() => {
		if (page >= totalPages && totalPages > 0) {
			setPage(totalPages - 1);
		}
	}, [totalPages]);

	/* =========================
		 ACTIONS
	========================= */

	const handleRefresh = () => {
		setPage(0);

		if (filtro === "ADMIN") {
			refetchAdmin();
		} else {
			refetchCursos();
		}
	};

	/* =========================
		 PAGE CHANGE
	========================= */

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	/* =========================
		 RENDER
	========================= */

	return (
		<SidebarPageLayout
			sidebar={
				<SidebarSectionLayout
					title="Designaciones"
					subtitle="Listado de cargos de la escuela"
					filters={
						<FilterPillGroup
							items={FILTROS_DESIGNACIONES}
							value={filtro}
							onChange={(value) => {
								setFiltro(value);
							}}
						/>
					}
					actions={
						<>
							<Button variant="secondary" onClick={() => setOpenFilters(true)}>
								Filtros
							</Button>

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

							<Button onClick={navigation.crear}>+ Nueva designación</Button>
						</>
					}
				/>
			}
			pagination={
				<Pagination
					page={page}
					totalPages={totalPages}
					onChange={handlePageChange}
				/>
			}
		>
			{filtro === "ADMIN" ? (
				<DesignacionesList
					filtro="ADMIN"
					designaciones={adminDesignaciones}
					isLoading={isLoadingAdmin}
					isError={isErrorAdmin}
					onVerDetalle={navigation.verDetalle}
				/>
			) : (
				<DesignacionesList
					filtro="CURSO"
					designaciones={cursoDesignaciones}
					isLoading={isLoadingCursos}
					isError={isErrorCursos}
					onVerDetalle={navigation.verDetalle}
				/>
			)}

			{openFilters && (
				<FiltersModal
					open={openFilters}
					onClose={() => setOpenFilters(false)}
					onClear={() => setDraftCursoFilters({})}
					onApply={() => {
						setCursoFilters(draftCursoFilters);
						setPage(0);
						setOpenFilters(false);
					}}
				>
					{filtro === "CURSO" ? (
						<CursoFilters
							escuelaId={escuelaActiva?.id}
							filters={draftCursoFilters}
							onChange={setDraftCursoFilters}
						/>
					) : (
						<AdminFilters />
					)}
				</FiltersModal>
			)}
		</SidebarPageLayout>
	);
}
