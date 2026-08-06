import { useState } from "react";
import { usePagination } from "@/shared/hooks/usePagination";
import type { SortState } from "@/shared/types";
import type { EmpleadoEducativoFiltro } from "../../types";
import { useEmpleadoNavigation } from "../navigation";
import { useEmpleadosEducativos } from "../queries";

export function useEmpleadosEducativosPage() {
	/* =========================
     FILTROS
  ========================= */

	const [filtro, setFiltro] = useState<EmpleadoEducativoFiltro>("TODOS");

	const [sort, setSort] = useState<SortState>({});

	/* =========================
     PAGINACIÓN
  ========================= */

	const { page, setPage, pageSize } = usePagination([filtro, sort]);

	/* =========================
     QUERY
  ========================= */

	const query = useEmpleadosEducativos(filtro, page, pageSize, sort);

	const empleados = query.data?.content ?? [];
	const totalPages = query.data?.totalPages ?? 0;

	/* =========================
     NAVIGATION
  ========================= */

	const navigation = useEmpleadoNavigation();

	return {
		filters: {
			filtro,
			setFiltro,
			sort,
			setSort,
		},

		pagination: {
			page,
			setPage,
			totalPages,
		},

		query: {
			...query,
			empleados,
		},

		navigation,
	};
}
