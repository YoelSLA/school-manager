import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import { ModalConfirm } from "@/shared/components/Modal"
import { MateriaCreateModal, MateriaTable, MateriaUpdateModal } from "../../components";
import { useMateriasPage } from "../../hooks/pages";

export default function MateriaPage() {
  const vm = useMateriasPage();

  return (
    <>
      <ToolbarPageLayout
        toolbar={
          <Toolbar
            title="Materias"
            onRefresh={vm.query.refetch}
            isFetching={vm.query.isFetching}
            onCreate={vm.create.open}
            createLabel="Nueva materia"
          />
        }
        page={vm.pagination.page}
        totalPages={vm.pagination.totalPages}
        onPageChange={vm.pagination.setPage}
      >
        <MateriaTable
          query={vm.query}
          onEdit={vm.edit.open}
          onDelete={vm.delete.open}
        />
      </ToolbarPageLayout>

      {vm.create.isOpen && (
        <MateriaCreateModal
          onClose={vm.create.close}
          onSubmit={vm.create.submit}
          isSubmitting={vm.create.isPending}
        />
      )}

      {vm.edit.materia && (
        <MateriaUpdateModal
          materia={vm.edit.materia}
          onClose={vm.edit.close}
          onSubmit={vm.edit.submit}
          isSubmitting={vm.edit.isPending}
        />
      )}

      {vm.delete.materia && (
        <ModalConfirm
          open
          title="Eliminar materia"
          description={`¿Seguro que querés eliminar "${vm.delete.materia.nombre}"?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={vm.delete.submit}
          onCancel={vm.delete.close}
          loading={vm.delete.isPending}
        />
      )}
    </>
  );
}