import { useEffect, useState } from "react";
import FilteredSidebar from "@/components/FilteredSidebar/FilteredSidebar";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import CrearCursoModal from "../../components/CrearCursoModal";
import type { CrearCursoFormOutput } from "../../form/curso.form.types";
import { useCrearCurso } from "../../hooks/useCrearCurso";
import { useCursos } from "../../hooks/useCursos";
import type { CursoFiltro, CursoResponseDTO } from "../../types/cursos.types";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";
import CursosList from "./CursosList";

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

	// Reset cuando cambia filtro o tamaño
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

	const handleCrearCurso = () => {
		setIsCrearOpen(true);
	};

	const handleSubmitCrear = (data: CrearCursoFormOutput) => {
		if (!escuelaActiva) return;

		crearCurso(
			{
				escuelaId: escuelaActiva.id,
				data,
			},
			{
				onSuccess: () => {
					setIsCrearOpen(false); // 👈 cerrar modal acá
				},
			},
		);
	};

	/* =========================
		 DETALLE
	========================= */

	const handleVerDetalle = (curso: CursoResponseDTO) => {
		// si querés mantener navegación futura
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
						onAction={handleCrearCurso}
					/>
				}
				pagination={
					<Pagination page={page} totalPages={totalPages} onChange={setPage} />
				}
			>
				<CursosList
					cursos={cursos}
					isLoading={isLoading}
					onVerDetalle={handleVerDetalle}
				/>
			</SidebarPageLayout>

			{/* =========================
			    MODAL
			========================= */}

			{isCrearOpen && (
				<CrearCursoModal
					onClose={() => setIsCrearOpen(false)}
					isSubmitting={isPending}
					onSubmit={handleSubmitCrear}
				/>
			)}
		</>
	);
}
