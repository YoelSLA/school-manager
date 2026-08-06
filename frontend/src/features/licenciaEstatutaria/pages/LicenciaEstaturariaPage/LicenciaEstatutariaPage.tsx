import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import LicenciaEstatutariaTable from "../../components/LicenciaEstatutariaTable";
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
            onRefresh={vm.query.refetch}
            isFetching={vm.query.isFetching}
            onCreate={vm.create.open}
            createLabel="Nueva licencia"
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

      {/* Modales */}
    </>
  );
}