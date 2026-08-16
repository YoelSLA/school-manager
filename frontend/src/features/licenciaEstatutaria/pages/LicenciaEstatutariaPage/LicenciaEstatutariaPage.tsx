import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import { ModalConfirm } from "@/shared/components/Modal";
import { LicenciaEstatutariaCreateModal, LicenciaEstatutariaTable, LicenciaEstatutariaUpdateModal } from "../../components";
import { useLicenciasEstatutariasPage } from "../../hooks/pages";

export default function LicenciaEstatutariaPage() {
  const vm = useLicenciasEstatutariasPage();

  return (
    <>
      <ToolbarPageLayout
        showBreadcrumbs={true}
        toolbar={
          <Toolbar
            title="Licencias estatutarias"
            createLabel="Nueva licencia"
            onRefresh={vm.query.refetch}
            isFetching={vm.query.isFetching}
            onCreate={vm.create.open}
          />
        }
        page={vm.pagination.page}
        totalPages={vm.pagination.totalPages}
        onPageChange={vm.pagination.setPage}
      >
        <LicenciaEstatutariaTable
          query={vm.query}
          onEdit={vm.edit.open}
          onDelete={vm.delete.open}
        />
      </ToolbarPageLayout>

      {/* =========================
          MODAL CREAR
          ========================= */}

      {vm.create.isOpen && (
        <LicenciaEstatutariaCreateModal
          onClose={vm.create.close}
          onSubmit={vm.create.submit}
          isSubmitting={vm.create.isPending}
        />
      )}

      {/* =========================
          MODAL EDITAR
          ========================= */}

      {vm.edit.licencia && (
        <LicenciaEstatutariaUpdateModal
          licencia={vm.edit.licencia}
          onClose={vm.edit.close}
          onSubmit={vm.edit.submit}
          isSubmitting={vm.edit.isPending}
        />
      )}


      {/* =========================
          MODAL ELIMINAR
          ========================= */}

      {vm.delete.licencia && (
        <ModalConfirm
          open
          title="Eliminar licencia estatutaria"
          description={`¿Seguro que querés eliminar "${vm.delete.licencia.nombre}"?`}
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