import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import ConfirmModal from "@/components/Modal/ModalConfirm";
import Toolbar from "@/components/Toolbar";
import LicenciaTable from "../../components/LicenciaTable";
import useLicenciasPage from "../../hooks/pages/useLicenciasPage";

export default function LicenciasPage() {
  const vm = useLicenciasPage();

  return (
    <>
      <ToolbarPageLayout
        toolbar={
          <Toolbar
            title="Licencias"
            onRefresh={vm.query.refetch}
            isFetching={vm.query.isFetching}
            onCreate={vm.navigation.crear}
            createLabel="Nueva licencia"
          />
        }
        page={vm.pagination.page}
        totalPages={vm.pagination.totalPages}
        onPageChange={vm.pagination.setPage}
      >
        <LicenciaTable
          query={vm.query}
          onVerDetalle={(licenciaId) => vm.navigation.verDetalle(licenciaId)}
          onDelete={vm.delete.open}
        />
      </ToolbarPageLayout>

      {vm.delete.licencia && (
        <ConfirmModal
          open
          title="Eliminar licencia"
          description={`¿Seguro que querés eliminar la licencia ${vm.delete.licencia.licenciaEstatutaria.codigo}?`}
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