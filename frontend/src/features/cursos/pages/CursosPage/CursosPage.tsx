import { useEffect, useState } from "react";
import GridListState from "@/app/layouts/GridListState";
import ListPageLayout from "@/app/layouts/ListPageLayout";
import Pagination from "@/app/layouts/Pagination";
import Sidebar from "@/app/layouts/Sidebar";
import SidebarPageLayout from "@/app/layouts/SidebarPageLayout/SidebarPageLayout";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import FilterPillGroup from "@/components/FilterPillGroup";
import type {
	CursoCreateDTO,
	CursoDetalleDTO,
	CursoFiltro,
} from "@/shared/types";
import { useDynamicPageSize } from "@/shared/utils/hooks/useDynamicPageSize";
import CursoCard from "../../components/CursoCard";
import CursoCreateModal from "../../components/CursoCreateModal";
import { useCrearCurso } from "../../hooks/useCrearCurso";
import { useListarCursos } from "../../hooks/useListarCursos";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";

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

	const { data, isLoading, isError, refetch, isFetching } = useListarCursos(
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

	const handleVerDetalle = (_curso: CursoDetalleDTO) => {
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
									<CursoCard curso={c} onVerDetalle={handleVerDetalle} />
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
