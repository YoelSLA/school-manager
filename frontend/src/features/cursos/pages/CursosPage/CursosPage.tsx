import { useEffect, useState } from "react";
import FilteredSidebar from "@/components/FilteredSidebar/FilteredSidebar";
import ListState from "@/components/ListState";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout/ScrollableGridListLayout";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import { useCrearCurso } from "../../hooks/useCrearCurso";
import { useCursos } from "../../hooks/useCursos";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";

import CursoCard from "../../components/CursoCard/CursoCard";
import CursoCreateModal from "../../components/CursoCreateModal";

import type {
	CursoCreateDTO,
	CursoFiltro,
	CursoResponseDTO,
} from "@/utils/types";

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

	const { data, isLoading } = useCursos(
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
					<FilteredSidebar
						title="Cursos"
						subtitle="Listado de cursos de la escuela"
						filtros={FILTROS_CURSOS}
						value={filtro}
						onChange={setFiltro}
						actionLabel="+ Nuevo curso"
						onAction={() => setIsCrearOpen(true)}
					/>
				}
				pagination={
					<Pagination
						page={page}
						totalPages={totalPages}
						onChange={setPage}
					/>
				}
			>
				{isLoading ? (
					<ListState>Cargando cursos…</ListState>
				) : cursos.length === 0 ? (
					<ListState>No hay cursos para el filtro seleccionado.</ListState>
				) : (
					<ScrollableGridListLayout>
						{cursos.map((curso) => (
							<CursoCard
								key={curso.id}
								curso={curso}
								onVerDetalle={handleVerDetalle}
							/>
						))}
					</ScrollableGridListLayout>
				)}
			</SidebarPageLayout>

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