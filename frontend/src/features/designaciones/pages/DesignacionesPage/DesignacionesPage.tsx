import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

import DesignacionesList from "./DesignacionesList";
import styles from "./DesignacionesPage.module.scss";

import {
	CursoFiltersState,
	DesignacionFiltro,
} from "@/utils/types";

type ActiveFilter = {
	key: keyof CursoFiltersState;
	label: string;
};

export default function DesignacionesPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigation = useDesignacionesNavigation();
	const pageSize = useDynamicPageSize();

	/* =========================
		 PARAMS FROM URL
	========================= */

	const filtro =
		(searchParams.get("tipo") as DesignacionFiltro) ?? "ADMIN";

	const page = Number(searchParams.get("page") ?? 0);

	const cursoFilters: CursoFiltersState = {
		cursoId: searchParams.get("cursoId") ?? undefined,
		materiaId: searchParams.get("materiaId") ?? undefined,
		orientacion: searchParams.get("orientacion") ?? undefined,
		estado: searchParams.get("estado") ?? undefined,
	};

	const [draftCursoFilters, setDraftCursoFilters] =
		useState<CursoFiltersState>(cursoFilters);

	const [openFilters, setOpenFilters] = useState(false);

	/* =========================
		 HELPERS
	========================= */

	const updateParams = (params: Record<string, string | undefined>) => {
		const newParams = new URLSearchParams(searchParams);

		Object.entries(params).forEach(([key, value]) => {
			if (value) {
				newParams.set(key, value);
			} else {
				newParams.delete(key);
			}
		});

		setSearchParams(newParams);
	};

	/* =========================
		 RESET PAGE WHEN FILTER CHANGES
	========================= */

	useEffect(() => {
		updateParams({
			tipo: filtro,
			page: "0",
		});
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
	} = useDesignacionesAdministrativas(
		escuelaActiva?.id,
		page,
		pageSize,
		{
			enabled: filtro === "ADMIN",
		}
	);

	const {
		data: cursoData,
		isLoading: isLoadingCursos,
		isError: isErrorCursos,
		refetch: refetchCursos,
		isFetching: isFetchingCursos,
	} = useDesignacionesCursos(
		escuelaActiva?.id,
		page,
		pageSize,
		cursoFilters,
		{
			enabled: filtro === "CURSO",
		}
	);

	/* =========================
		 DATA
	========================= */

	const data = filtro === "ADMIN" ? adminData : cursoData;
	const totalPages = data?.totalPages ?? 0;

	const adminDesignaciones = adminData?.content ?? [];
	const cursoDesignaciones = cursoData?.content ?? [];

	const isFetching =
		filtro === "ADMIN" ? isFetchingAdmin : isFetchingCursos;

	/* =========================
		 FIX PAGE OUT OF RANGE
	========================= */

	useEffect(() => {
		if (page >= totalPages && totalPages > 0) {
			updateParams({
				page: (totalPages - 1).toString(),
			});
		}
	}, [totalPages]);

	/* =========================
		 ACTIONS
	========================= */

	const handleRefresh = () => {
		updateParams({ page: "0" });

		if (filtro === "ADMIN") {
			refetchAdmin();
		} else {
			refetchCursos();
		}
	};

	const handlePageChange = (newPage: number) => {
		updateParams({
			page: newPage.toString(),
		});
	};

	/* =========================
		 APPLY FILTERS
	========================= */

	const applyFilters = () => {
		updateParams({
			tipo: "CURSO",
			page: "0",
			cursoId: draftCursoFilters.cursoId,
			materiaId: draftCursoFilters.materiaId,
			orientacion: draftCursoFilters.orientacion,
			estado: draftCursoFilters.estado,
		});

		setOpenFilters(false);
	};

	/* =========================
		 ACTIVE FILTERS
	========================= */

	const activeCursoFilters: ActiveFilter[] = [];

	if (cursoFilters.cursoId) {
		activeCursoFilters.push({
			key: "cursoId",
			label: `Curso ${cursoFilters.cursoId}`,
		});
	}

	if (cursoFilters.materiaId) {
		activeCursoFilters.push({
			key: "materiaId",
			label: `Materia ${cursoFilters.materiaId}`,
		});
	}

	if (cursoFilters.orientacion) {
		activeCursoFilters.push({
			key: "orientacion",
			label: `Orientación ${cursoFilters.orientacion}`,
		});
	}

	if (cursoFilters.estado) {
		activeCursoFilters.push({
			key: "estado",
			label: `Estado ${cursoFilters.estado}`,
		});
	}

	const removeFilter = (key: keyof CursoFiltersState) => {
		updateParams({
			[key]: undefined,
			page: "0",
		});
	};

	const clearFilters = () => {
		updateParams({
			cursoId: undefined,
			materiaId: undefined,
			orientacion: undefined,
			estado: undefined,
			page: "0",
		});
	};

	/* =========================
		 RENDER
	========================= */

	return (
		<SidebarPageLayout
			sidebar={
				<DesignacionesHeader
					filtro={filtro}
					updateParams={updateParams}
					setOpenFilters={setOpenFilters}
					handleRefresh={handleRefresh}
					isFetching={isFetching}
					navigation={navigation}
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
			{/* Active filters */}
			{filtro === "CURSO" && activeCursoFilters.length > 0 && (
				<div className={styles.activeFilters}>
					{activeCursoFilters.map((filter) => (
						<button
							key={filter.key}
							className={styles.filterChip}
							onClick={() => removeFilter(filter.key)}
						>
							{filter.label} ✕
						</button>
					))}

					<button
						className={styles.clearFilters}
						onClick={clearFilters}
					>
						Limpiar filtros
					</button>
				</div>
			)}

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
					onApply={applyFilters}
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

type DesignacionesHeaderProps = {
	filtro: DesignacionFiltro;
	updateParams: (params: Record<string, string | undefined>) => void;
	setOpenFilters: (value: boolean) => void;
	handleRefresh: () => void;
	isFetching: boolean;
	navigation: ReturnType<typeof useDesignacionesNavigation>;
};

function DesignacionesHeader({
	filtro,
	updateParams,
	setOpenFilters,
	handleRefresh,
	isFetching,
	navigation,
}: DesignacionesHeaderProps) {
	return (
		<SidebarSectionLayout
			title="Designaciones"
			subtitle="Listado de cargos de la escuela"
			filters={
				<FilterPillGroup
					items={FILTROS_DESIGNACIONES}
					value={filtro}
					onChange={(value) => {
						updateParams({
							tipo: value,
							page: "0",
						});
					}}
				/>
			}
			actions={
				<>
					<Button
						variant="secondary"
						onClick={() => setOpenFilters(true)}
					>
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

					<Button onClick={navigation.crear}>
						+ Nueva designación
					</Button>
				</>
			}
		/>
	);
}