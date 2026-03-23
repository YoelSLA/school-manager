import { useEffect, useState } from "react";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { useCrearCurso } from "../../hooks/useCrearCurso";
import { useCursos } from "../../hooks/useCursos";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";

import CursoCreateModal from "../../components/CursoCreateModal";

import type {
	CursoCreateDTO,
	CursoFiltro,
	CursoResponseDTO,
} from "@/utils/types";
import ListPageLayout from "@/layout/ListPageLayout";
import GridListState from "@/layout/GridListState";
import CursoCard from "../../components/CursoCard";
import FilterPillGroup from "@/components/FilterPillGroup";
import Sidebar from "@/layout/Sidebar";

export default function CursosPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	/* =========================
		 FILTRO
	========================= */

	const [filtro, setFiltro] = useState<CursoFiltro>("TODOS");

	/* =========================
		 PAGINACION
	========================= */

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	useEffect(() => {
		setPage(0);
	}, []);

	/* =========================
		 QUERY
	========================= */

	const { data, isLoading, isError, refetch, isFetching } = useCursos(
		escuelaActiva?.id,
		filtro,
		page,
		pageSize,
	);

	const cursos = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	/* =========================
		 CREAR CURSO
	========================= */

	const [isCrearOpen, setIsCrearOpen] = useState(false);

	const { mutate: crearCurso, isPending } = useCrearCurso();

	const handleSubmitCrear = (data: CursoCreateDTO) => {
		if (!escuelaActiva) return;

		crearCurso(
			{
				escuelaId: escuelaActiva.id,
				data,
			},
			{
				onSuccess: () => setIsCrearOpen(false),
			},
		);
	};

	/* =========================
		 DETALLE
	========================= */

	const handleVerDetalle = (_curso: CursoResponseDTO) => {
		// navegación futura
	};

	/* =========================
		 RENDER
	========================= */

	return (
		<>
			<SidebarPageLayout
				sidebar={
					<Sidebar
						title="Cursos"
						subtitle="Listado de cursos de la escuela"
						filters={
							<FilterPillGroup
								items={FILTROS_CURSOS}
								value={filtro}
								onChange={setFiltro}
							/>
						}
						onRefresh={refetch}
						isFetching={isFetching}
						onCreate={() => setIsCrearOpen(true)}
						createLabel="Nuevo curso"
					/>
				}
				content={
					<ListPageLayout
						content={
							<GridListState
								isLoading={isLoading}
								isError={isError}
								items={cursos}
								loadingMessage="Cargando cursos…"
								emptyMessage="No hay cursos para el filtro seleccionado"
								errorMessage="No se pudieron cargar los cursos"
								getKey={(c) => c.id}
								renderItem={(c) => (
									<CursoCard
										curso={c}
										onVerDetalle={handleVerDetalle}
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

			{/* MODAL CREAR */}
			{isCrearOpen && (
				<CursoCreateModal
					onClose={() => setIsCrearOpen(false)}
					isSubmitting={isPending}
					onSubmit={handleSubmitCrear}
				/>
			)}
		</>
	);
}