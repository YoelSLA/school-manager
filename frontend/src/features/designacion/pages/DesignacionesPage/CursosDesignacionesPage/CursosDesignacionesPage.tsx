import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import FilterMenu from "@/components/FilterMenu";
import FilterPillGroup from "@/components/FilterPillGroup";
import Toolbar from "@/components/Toolbar";
import type { useDesignacionesPage } from "@/features/designaciones/hooks/pages/useDesignacionesPage";
import { useCursoActiveFilters } from "@/features/designaciones/hooks/useCursoActiveFilters";
import CursosDesignacionesTable from "@/features/designaciones/pages/DesignacionesPage/CursosDesignacionesPage/CursosDesignacionesTable";
import ActiveFilters from "@/shared/components/ActiveFilters";
import { FILTROS_DESIGNACIONES } from "@/shared/utils";
import DesignacionCursoFilters from "./DesignacionCursoFilters/DesignacionCursoFilters";

type Props = {
  vm: ReturnType<typeof useDesignacionesPage>;
};

export default function CursosDesignacionesPage({ vm }: Props) {
  const activeFilters = useCursoActiveFilters({
    escuelaId: vm.escuelaId,
    filters: vm.cursoFilters,
    updateParams: vm.updateParams,
  });

  const activeCount = activeFilters.length;

  return (
    <ToolbarPageLayout
      toolbar={
        <Toolbar
          title="Designaciones de cursos"
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
            <FilterMenu activeCount={activeCount}>
              <DesignacionCursoFilters
                escuelaId={vm.escuelaId}
                filters={vm.cursoFilters}
                updateParams={vm.updateParams}
              />
            </FilterMenu>
          }
          footer={<ActiveFilters filters={activeFilters} />}
          onRefresh={vm.handleRefresh}
          isFetching={vm.query.isFetching}
          onCreate={vm.navigation.crear}
          createLabel="Nueva designación"
        />
      }
      page={vm.page}
      totalPages={vm.totalPages}
      onPageChange={vm.handlePageChange}
    >
      <CursosDesignacionesTable
        query={vm.cursoQuery}
        onVerDetalle={vm.navigation.verDetalle}
      />
    </ToolbarPageLayout>
  );
}