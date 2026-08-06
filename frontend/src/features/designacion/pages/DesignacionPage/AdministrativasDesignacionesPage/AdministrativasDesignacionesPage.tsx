import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import ActiveFilters from "@/shared/components/filters/ActiveFilters";
import FilterMenu from "@/shared/components/filters/FilterMenu";
import FilterPillGroup from "@/shared/components/filters/FilterPillGroup";
import Toolbar from "@/shared/components/Toolbar";
import DesignacionAdministrativaTable from "../../../components/DesignacionTable/DesignacionAdministrativaTable";
import { FILTROS_DESIGNACIONES } from "../../../constants";
import type { useDesignacionesPage } from "../../../hooks/pages/useDesignacionPage";

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
      <DesignacionAdministrativaTable
        query={vm.adminQuery}
        onVerDetalle={vm.navigation.verDetalle}
      />
    </ToolbarPageLayout>
  );
}