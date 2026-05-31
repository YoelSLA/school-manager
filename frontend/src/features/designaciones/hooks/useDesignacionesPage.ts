import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { useDynamicPageSize } from "@/shared/utils/hooks/useDynamicPageSize";
import type {
	CursoFiltersState,
	DesignacionFiltro,
} from "@/shared/utils/types";
import { useDesignacionesAdministrativas } from "./useDesignacionesAdministrativas";
import { useDesignacionesCursos } from "./useDesignacionesCursos";
import { useDesignacionesNavigation } from "./useDesignacionesNavigation";

export function useDesignacionesPage() {
	const [searchParams, setSearchParams] = useSearchParams();
	const escuelaActiva = useAppSelector(selectEscuelaActiva);
	const navigation = useDesignacionesNavigation();
	const pageSize = useDynamicPageSize();

	/* =========================
			 URL STATE
	========================= */

	const filtro = parseFiltro(searchParams);
	const page = parsePage(searchParams);
	const cursoFilters = parseCursoFilters(searchParams);
	const isAdmin = filtro === "ADMIN";

	/* =========================
			 URL ACTIONS
	========================= */

	const updateParams = useCallback(
		(params: Record<string, string | undefined>) => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);

				Object.entries(params).forEach(([key, value]) => {
					if (value) {
						next.set(key, value);
					} else {
						next.delete(key);
					}
				});

				return next;
			});
		},
		[setSearchParams],
	);

	/* =========================
			 QUERIES
	========================= */

	const adminQuery = useDesignacionesAdministrativas(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const cursoQuery = useDesignacionesCursos(
		escuelaActiva?.id,
		page,
		pageSize,
		cursoFilters,
	);

	const query = useMemo(
		() => (isAdmin ? adminQuery : cursoQuery),
		[isAdmin, adminQuery, cursoQuery],
	);

	/* =========================
			 PAGINATION FIX
	========================= */

	const totalPages = query.data?.totalPages ?? 0;

	useEffect(() => {
		if (page >= totalPages && totalPages > 0) {
			updateParams({
				page: String(totalPages - 1),
			});
		}
	}, [page, totalPages, updateParams]);

	/* =========================
			 ACTIONS
	========================= */

	const handleRefresh = () => {
		updateParams({ page: "0" });

		query.refetch();
	};

	const handlePageChange = (newPage: number) => {
		updateParams({
			page: String(newPage),
		});
	};

	return {
		escuelaId: escuelaActiva?.id,
		navigation,
		filtro,
		isAdmin,
		page,
		totalPages,
		cursoFilters,
		adminQuery,
		cursoQuery,
		query,
		updateParams,
		handleRefresh,
		handlePageChange,
	};
}

/* =========================
		 HELPERS
========================= */
function parseFiltro(searchParams: URLSearchParams): DesignacionFiltro {
	const tipo = searchParams.get("tipo");

	return tipo === "CURSO" ? "CURSO" : "ADMIN";
}

function parsePage(searchParams: URLSearchParams): number {
	const rawPage = Number(searchParams.get("page"));

	if (Number.isNaN(rawPage) || rawPage < 0) {
		return 0;
	}

	return rawPage;
}

function parseCursoFilters(searchParams: URLSearchParams): CursoFiltersState {
	return {
		cursoId: searchParams.get("cursoId") ?? undefined,
		materiaId: searchParams.get("materiaId") ?? undefined,
		orientacion: searchParams.get("orientacion") ?? undefined,
		estado: searchParams.get("estado") ?? undefined,
	};
}
