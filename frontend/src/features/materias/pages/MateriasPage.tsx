import { useEffect, useState } from "react";
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import ListState from "@/components/ListState";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";
import Pagination from "@/layout/Pagination";
import ScrollableGridListLayout from "@/layout/ScrollableGridListLayout/ScrollableGridListLayout";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";

import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";

import CrearMateriaModal from "../components/MateriaCreateModal";
import MateriaEditModal from "../components/MateriaEditModal/MateriaEditModal";
import MateriaCard from "../components/MateriaCard";

import { useCrearMateria } from "../hooks/useCreateMateria";
import { useMaterias } from "../hooks/useMaterias";
import { useEditMateria } from "../hooks/useUpdateMateria";

import type {
	MateriaCreateDTO,
	MateriaResponseDTO,
	MateriaUpdateDTO,
} from "@/utils/types";
import useDeleteMateria from "../hooks/useDeleteMateria";

export default function MateriasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [materiaAEditar, setMateriaAEditar] =
		useState<MateriaResponseDTO | null>(null);
	const [materiaAEliminar, setMateriaAEliminar] =
		useState<MateriaResponseDTO | null>(null);

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	useEffect(() => {
		setPage(0);
	}, []);

	/* =========================
		 QUERIES
	========================= */

	const { data, isLoading } = useMaterias(escuelaActiva?.id, page, pageSize);

	const materias = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	/* =========================
		 CREATE
	========================= */

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
					<SidebarSectionLayout
						title="Materias"
						subtitle="Listado de materias de la escuela"
						actions={
							<Button onClick={() => setIsModalOpen(true)}>
								+ Nueva materia
							</Button>
						}
					/>
				}
				pagination={
					totalPages > 1 ? (
						<Pagination page={page} totalPages={totalPages} onChange={setPage} />
					) : undefined
				}
			>
				{isLoading ? (
					<ListState>Cargando materias…</ListState>
				) : materias.length === 0 ? (
					<ListState>No hay materias cargadas.</ListState>
				) : (
					<ScrollableGridListLayout>
						{materias.map((materia) => (
							<MateriaCard
								key={materia.id}
								materia={materia}
								onEdit={() => setMateriaAEditar(materia)}
								onDelete={() => setMateriaAEliminar(materia)}
							/>
						))}
					</ScrollableGridListLayout>
				)}
			</SidebarPageLayout>

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