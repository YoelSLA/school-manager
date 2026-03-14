import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Pagination from "@/layout/Pagination";
import SidebarPageLayout from "@/layout/SidebarPageLayout/SidebarPageLayout";
import SidebarSectionLayout from "@/layout/SidebarSectionLayout/SidebarSectionLayout";
import { selectEscuelaActiva } from "@/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/store/hooks";
import { useDynamicPageSize } from "@/hooks/useDynamicPageSize";

import CrearMateriaModal from "../../components/MateriaCreateModal";
import type { CrearMateriaFormValues } from "../../form/materias.form.types";
import { useCrearMateria } from "../../hooks/useCreateMateria";
import { useMaterias } from "../../hooks/useMaterias";
import MateriasList from "./MateriasList";
import MateriaEditModal from "../../components/MateriaEditModal/MateriaEditModal";
import { useEditMateria } from "../../hooks/useUpdateMateria";
import { useDeleteMateria } from "../../hooks/useDeleteMateria";
import type { MateriaResponseDTO } from "../../types/materias.types";
import ConfirmModal from "@/components/ConfirmModal";

export default function MateriasPage() {
	const escuelaActiva = useAppSelector(selectEscuelaActiva);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [materiaAEditar, setMateriaAEditar] = useState<typeof materias[number] | null>(null);
	const [materiaAEliminar, setMateriaAEliminar] = useState<MateriaResponseDTO | null>(null);

	const { mutate: createMateria, isPending } =
		useCrearMateria(escuelaActiva?.id);

	const handleCreateMateria = (data: CrearMateriaFormValues) => {
		if (!escuelaActiva) return;

		createMateria(data, {
			onSuccess: () => {
				setIsModalOpen(false);
			},
		});
	};

	const handleCrearMateriaClick = () => {
		setIsModalOpen(true);
	};

	const { mutate: editMateria, isPending: isEditing } =
		useEditMateria(escuelaActiva?.id);

	const handleEditMateria = (data: CrearMateriaFormValues) => {
		if (!escuelaActiva || !materiaAEditar) return;

		editMateria(
			{ id: materiaAEditar.id, data },
			{
				onSuccess: () => {
					setMateriaAEditar(null);
				},
			}
		);
	};

	const handleEditarMateriaClick = (materia: typeof materias[number]) => {
		setMateriaAEditar(materia);
	};

	const { mutate: deleteMateria, isPending: isDeleting } =
		useDeleteMateria(escuelaActiva?.id);


	const handleDeleteMateria = (materia: MateriaResponseDTO) => {
		setMateriaAEliminar(materia);
	};

	const handleConfirmDelete = () => {
		if (!materiaAEliminar) return;

		deleteMateria(materiaAEliminar.id, {
			onSuccess: () => {
				setMateriaAEliminar(null);
			},
		});
	};

	const handleCancelDelete = () => {
		setMateriaAEliminar(null);
	};

	const [page, setPage] = useState(0);
	const pageSize = useDynamicPageSize();

	useEffect(() => {
		setPage(0);
	}, []);

	const { data, isLoading } = useMaterias(
		escuelaActiva?.id,
		page,
		pageSize,
	);

	const materias = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;

	return (
		<>
			<SidebarPageLayout
				sidebar={
					<SidebarSectionLayout
						title="Materias"
						subtitle="Listado de materias de la escuela"
						actions={
							<Button onClick={handleCrearMateriaClick}>
								+ Nueva materia
							</Button>
						}
					/>
				}
				pagination={
					totalPages > 1 ? (
						<Pagination
							page={page}
							totalPages={totalPages}
							onChange={setPage}
						/>
					) : undefined
				}
			>
				<MateriasList
					materias={materias}
					isLoading={isLoading}
					onEdit={handleEditarMateriaClick}
					onDelete={handleDeleteMateria}
				/>
			</SidebarPageLayout>

			{isModalOpen && escuelaActiva && (
				<CrearMateriaModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleCreateMateria}
					isSubmitting={isPending}
				/>
			)}
			{materiaAEditar && escuelaActiva && (
				<MateriaEditModal
					materia={materiaAEditar}
					onClose={() => setMateriaAEditar(null)}
					onSubmit={handleEditMateria}
					isSubmitting={isEditing}
				/>
			)}
			{materiaAEliminar && (
				<ConfirmModal
					open={true}
					title="Eliminar materia"
					description={`¿Seguro que querés eliminar "${materiaAEliminar.nombre}"?`}
					confirmText="Eliminar"
					cancelText="Cancelar"
					onConfirm={handleConfirmDelete}
					onCancel={handleCancelDelete}
					loading={isDeleting}
				/>
			)}
		</>
	);
}
