import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
import type { CursoFiltersState, DesignacionFiltro } from "@/utils/types";


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
		 URL PARAM HELPER
	========================= */

	const updateParams = useCallback(
		(params: Record<string, string | undefined>) => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);

				Object.entries(params).forEach(([key, value]) => {
					if (value) next.set(key, value);
					else next.delete(key);
				});

				return next;
			});
		},
		[setSearchParams]
	);

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
		if (totalPages === 0) return;
		if (page < totalPages) return;

		updateParams({
			page: String(totalPages - 1),
		});
	}, [page, totalPages, updateParams]);

	/* =========================
		 ACTIONS
	========================= */

	const handleRefresh = () => {
		updateParams({ page: "0" });

		if (filtro === "ADMIN") refetchAdmin();
		else refetchCursos();
	};

	const handlePageChange = (newPage: number) =>
		updateParams({ page: String(newPage) });

	/* =========================
		 APPLY FILTERS
	========================= */

	const applyFilters = () => {
		updateParams({
			tipo: "CURSO",
			page: "0",
			...draftCursoFilters,
		});

		setOpenFilters(false);
	};

	const clearFilters = () =>
		updateParams({
			cursoId: undefined,
			materiaId: undefined,
			orientacion: undefined,
			estado: undefined,
			page: "0",
		});

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
			filters={
				filtro === "CURSO" ? (
					<div className={styles.filtersContainer}>
						<CursoFilters
							escuelaId={escuelaActiva?.id}
							filters={cursoFilters}
							onChange={(newFilters) =>
								updateParams({
									...newFilters,
									page: "0",
								})
							}
						/>

						<Button variant="ghost" onClick={clearFilters}>
							Limpiar
						</Button>
					</div>
				) : undefined
			}
			pagination={
				< Pagination
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

			{
				openFilters && (
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
				)
			}
		</SidebarPageLayout >
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
					onChange={(value) =>
						updateParams({
							tipo: value,
							page: "0",
						})
					}
				/>
			}
			actions={
				<>
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