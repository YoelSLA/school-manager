import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import FilterMenu from "@/components/FilterMenu";
import FilterPillGroup from "@/components/FilterPillGroup";
import Toolbar from "@/components/Toolbar";
import type { useDesignacionesPage } from "@/features/designaciones/hooks/pages/useDesignacionesPage";
import AdministrativasDesignacionesTable from "@/features/designaciones/pages/DesignacionesPage/AdministrativasDesignacionesPage/AdministrativasDesignacionesTable";
import ActiveFilters from "@/shared/components/ActiveFilters";
import { FILTROS_DESIGNACIONES } from "@/shared/utils";

type Props = {
  vm: ReturnType<typeof useDesignacionesPage>;
};

export default function AdministrativasDesignacionesPage({
  vm,
}: Props) {
  return (
    <ToolbarPageLayout
      toolbar={
        <Toolbar
          title="Designaciones administrativas"
          headerCenter={
            <FilterPillGroup
              items={FILTROS_DESIGNACIONES}
              value={vm.filtro}
              onChange={(value) =>
                vm.updateParams({
                  tipo: value,
                  page: "0",
                })
              }
            />
          }
          headerActions={
            <FilterMenu activeCount={0}>
              <p>No hay filtros disponibles.</p>
            </FilterMenu>
          }
          footer={<ActiveFilters filters={[]} />}
          onRefresh={vm.handleRefresh}
          isFetching={vm.adminQuery.isFetching}
          onCreate={vm.navigation.crear}
          createLabel="Nueva designación"
        />
      }
      page={vm.page}
      totalPages={vm.totalPages}
      onPageChange={vm.handlePageChange}
    >
      <AdministrativasDesignacionesTable
        query={vm.adminQuery}
        onVerDetalle={vm.navigation.verDetalle}
      />
    </ToolbarPageLayout>
  );
}