import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal"; "@/layout/SidebarSectate";
import CrearMateriaModal from "../components/MateriaCreateModal";
import MateriaEditModal from "../components/MateriaEditModal/MateriaEditModal";
import { useCrearMateria } from "../hooks/useCreateMateria";
import useDeleteMateria from "../hooks/useDeleteMateria";

import { usePagination } from "@/hooks/usePagination";

import type {
	MateriaCreateDTO,
	MateriaResponseDTO,
	MateriaUpdateDTO,
} from "@/utils/types";
import SidebarPageLayout from "@/layout/SidebarPageLayout";
import ListPageLayout from "@/layout/ListPageLayout";
import GridListState from "@/layout/GridListState";
import { useMaterias } from "../hooks/useMaterias";
import { useAppSelector } from "@/store/hooks";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useEditMateria } from "../hooks/useUpdateMateria";
import MateriaCard from "../components/MateriaCard";
import Pagination from "@/layout/Pagination";
import Sidebar from "@/layout/Sidebar";

export default function MateriasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const { page, setPage, pageSize } = usePagination([
		escuelaActiva?.id,
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [materiaAEditar, setMateriaAEditar] =
		useState<MateriaResponseDTO | null>(null);
	const [materiaAEliminar, setMateriaAEliminar] =
		useState<MateriaResponseDTO | null>(null);

	/* =========================
			 QUERY
	========================= */

	const { data, isLoading, isError, refetch, isFetching } = useMaterias(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const materias = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	const { mutate: createMateria, isPending } = useCrearMateria(
		escuelaActiva?.id,
	);

	const handleCreateMateria = (data: MateriaCreateDTO) => {
		if (!escuelaActiva) return;

		createMateria(data, {
			onSuccess: () => setIsModalOpen(false),
		});
	};

	/* =========================
			 EDIT
	========================= */

	const { mutate: editMateria, isPending: isEditing } = useEditMateria(
		escuelaActiva?.id,
	);

	const handleEditMateria = (data: MateriaUpdateDTO) => {
		if (!escuelaActiva || !materiaAEditar) return;

		editMateria(
			{ id: materiaAEditar.id, data },
			{ onSuccess: () => setMateriaAEditar(null) },
		);
	};

	/* =========================
			 DELETE
	========================= */

	const { mutate: deleteMateria, isPending: isDeleting } = useDeleteMateria(
		escuelaActiva?.id,
	);

	const handleConfirmDelete = () => {
		if (!materiaAEliminar) return;

		deleteMateria(materiaAEliminar.id, {
			onSuccess: () => setMateriaAEliminar(null),
		});
	};

	return (
		<>
			<SidebarPageLayout
				sidebar={
					<Sidebar
						title="Materias"
						subtitle="Listado de materias de la escuela"
						onRefresh={refetch}
						isFetching={isFetching}
						onCreate={() => setIsModalOpen(true)}
						createLabel="Nueva materia"
					/>
				}
				content={
					<ListPageLayout
						content={
							<GridListState
								isLoading={isLoading}
								isError={isError}
								items={materias}
								loadingMessage="Cargando materias…"
								emptyMessage="No hay materias para el filtro seleccionado"
								errorMessage="No se pudieron cargar las materias"
								getKey={(m) => m.id}
								renderItem={(m) => (
									<MateriaCard
										materia={m}
										onEdit={() => setMateriaAEditar(m)}
										onDelete={() => setMateriaAEliminar(m)}
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

			{/* CREATE */}
			{isModalOpen && escuelaActiva && (
				<CrearMateriaModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleCreateMateria}
					isSubmitting={isPending}
				/>
			)}

			{/* EDIT */}
			{materiaAEditar && escuelaActiva && (
				<MateriaEditModal
					materia={materiaAEditar}
					onClose={() => setMateriaAEditar(null)}
					onSubmit={handleEditMateria}
					isSubmitting={isEditing}
				/>
			)}

			{/* DELETE */}
			{materiaAEliminar && (
				<ConfirmModal
					open
					title="Eliminar materia"
					description={`¿Seguro que querés eliminar "${materiaAEliminar.nombre}"?`}
					confirmText="Eliminar"
					cancelText="Cancelar"
					onConfirm={handleConfirmDelete}
					onCancel={() => setMateriaAEliminar(null)}
					loading={isDeleting}
				/>
			)}
		</>
	);
}