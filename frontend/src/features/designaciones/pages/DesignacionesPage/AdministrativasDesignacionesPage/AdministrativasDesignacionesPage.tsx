import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import ActiveFilters from "@/components/ActiveFilters";
import FilterMenu from "@/components/FilterMenu";
import FilterPillGroup from "@/components/FilterPillGroup";
import Toolbar from "@/components/Toolbar";
import type { useDesignacionesPage } from "@/features/designaciones/hooks/pages/useDesignacionesPage";
import { FILTROS_DESIGNACIONES } from "@/shared/utils";
import DesignacionesView from "../DesignacionesView";

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
      <DesignacionesView
        isAdmin
        adminQuery={vm.adminQuery}
        cursoQuery={vm.cursoQuery}
        onVerDetalle={vm.navigation.verDetalle}
      />
    </ToolbarPageLayout>
  );
}