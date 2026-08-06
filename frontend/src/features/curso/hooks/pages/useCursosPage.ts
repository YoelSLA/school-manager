import { useState } from "react";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import { usePagination } from "@/shared/hooks/usePagination";
import type { CursoCreateDTO, CursoDetalleDTO, CursoFiltro } from "../../types";
import { useCrearCurso } from "../mutations/useCrearCurso";
import { useListarCursos } from "../queries/useListarCursos";

export function useCursosPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [filtro, setFiltro] = useState<CursoFiltro>("TODOS");

	const { page, setPage, pageSize } = usePagination([filtro]);

	/* =========================
     QUERY
  ========================= */

	const query = useListarCursos(escuelaActiva?.id, filtro, page, pageSize);

	const cursos = query.data?.content ?? [];
	const totalPages = query.data?.totalPages ?? 0;

	/* =========================
     CREATE
  ========================= */

	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const create = useCrearCurso();

	const submit = (data: CursoCreateDTO) => {
		if (!escuelaActiva) return;

		create.mutate(
			{
				escuelaId: escuelaActiva.id,
				data,
			},
			{
				onSuccess: () => setIsCreateOpen(false),
			},
		);
	};

	/* =========================
     NAVIGATION
  ========================= */

	const verDetalle = (_curso: CursoDetalleDTO) => {
		// TODO
	};

	return {
		filtro,
		setFiltro,

		pagination: {
			page,
			setPage,
			totalPages,
		},

		query: {
			...query,
			cursos,
		},

		create: {
			isOpen: isCreateOpen,
			open: () => setIsCreateOpen(true),
			close: () => setIsCreateOpen(false),
			submit,
			isPending: create.isPending,
		},

		navigation: {
			verDetalle,
		},
	};
}
