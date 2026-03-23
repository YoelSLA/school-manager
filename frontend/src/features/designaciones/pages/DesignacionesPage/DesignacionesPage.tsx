import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useDesignacionesAdministrativas } from "../../hooks/useDesignacionesAdministrativas";
import { useDesignacionesCursos } from "../../hooks/useDesignacionesCursos";
import DesignacionesFilters from "./DesignacionesFilters";
import SidebarPageLayout from "@/layout/SidebarPageLayout";
import Pagination from "@/layout/Pagination";
import DesignacionesContent from "./DesignacionesContent";
import ListPageLayout from "@/layout/ListPageLayout";
import DesignacionesHeader from "./DesignacionesHeader";
import { useDesignacionesNavigation } from "../../hooks/useDesignacionesNavigation";
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

	const isAdmin = filtro === "ADMIN";

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

	const adminQuery = useDesignacionesAdministrativas(
		escuelaActiva?.id,
		page,
		pageSize,
		{ enabled: isAdmin }
	);

	const cursoQuery = useDesignacionesCursos(
		escuelaActiva?.id,
		page,
		pageSize,
		cursoFilters,
		{ enabled: !isAdmin }
	);

	/* =========================
			 FIX PAGE
	========================= */

	const totalPages = isAdmin
		? adminQuery.data?.totalPages ?? 0
		: cursoQuery.data?.totalPages ?? 0;

	useEffect(() => {
		if (page >= totalPages && totalPages > 0) {
			updateParams({ page: String(totalPages - 1) });
		}
	}, [page, totalPages, updateParams]);

	/* =========================
			 ACTIONS
	========================= */

	const handleRefresh = () => {
		updateParams({ page: "0" });
		if (isAdmin) adminQuery.refetch();
		else cursoQuery.refetch();
	};

	const handlePageChange = (newPage: number) =>
		updateParams({ page: String(newPage) });

	/* =========================
			 RENDER
	========================= */

	return (
		<SidebarPageLayout
			sidebar={
				<DesignacionesHeader
					filtro={filtro}
					updateParams={updateParams}
					handleRefresh={handleRefresh}
					isFetching={
						isAdmin
							? adminQuery.isFetching
							: cursoQuery.isFetching
					}
					navigation={navigation}
				/>
			}
			content={
				<ListPageLayout
					filters={
						<DesignacionesFilters
							isAdmin={isAdmin}
							escuelaId={escuelaActiva?.id}
							filters={cursoFilters}
							updateParams={updateParams}
						/>
					}
					content={
						<DesignacionesContent
							isAdmin={isAdmin}
							adminQuery={adminQuery}
							cursoQuery={cursoQuery}
							onVerDetalle={navigation.verDetalle}
						/>
					}
					pagination={
						<Pagination
							page={page}
							totalPages={totalPages}
							onChange={handlePageChange}
						/>
					}
				/>
			}
		/>
	);
}