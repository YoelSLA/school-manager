import { useState } from "react";
import ListPageLayout from "@/app/layouts/ListPageLayout";
import SidebarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import { selectEscuelaActiva } from "@/app/store/escuela/escuelaSelectors";
import { useAppSelector } from "@/app/store/hooks";
import GridListState from "@/components/GridListState";
import ConfirmModal from "@/components/Modal/ModalConfirm";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Toolbar";
import { useCreateMateria } from "@/features/materias/hooks/useCreateMateria";
import { useListMaterias } from "@/features/materias/hooks/useListMaterias";
import type {
  MateriaCreateDTO,
  MateriaDetalleDTO,
  MateriaUpdateDTO,
} from "@/shared/types";
import { usePagination } from "@/shared/utils/hooks/usePagination";
import MateriaCard from "../components/MateriaCard";
import CrearMateriaModal from "../components/MateriaCreateModal";
import MateriaEditModal from "../components/MateriaUpdateModal/MateriaEditModal";
import useDeleteMateria from "../hooks/useDeleteMateria";
import { useUpdateMateria } from "../hooks/useUpdateMateria";

export default function MateriasPage() {
  const escuelaActiva = useAppSelector(selectEscuelaActiva);

  const { page, setPage, pageSize } = usePagination([escuelaActiva?.id]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [materiaAEditar, setMateriaAEditar] =
    useState<MateriaDetalleDTO | null>(null);
  const [materiaAEliminar, setMateriaAEliminar] =
    useState<MateriaDetalleDTO | null>(null);

  /* =========================
       QUERY
  ========================= */

  const { data, isLoading, isError, refetch, isFetching } = useListMaterias(
    escuelaActiva?.id,
    page,
    pageSize,
  );

  const materias = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;

  const { mutate: createMateria, isPending } = useCreateMateria(
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

  const { mutate: editMateria, isPending: isEditing } = useUpdateMateria(
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
