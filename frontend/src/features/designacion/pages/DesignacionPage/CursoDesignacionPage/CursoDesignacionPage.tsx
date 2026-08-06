import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import ActiveFilters from "@/shared/components/filters/ActiveFilters";
import FilterMenu from "@/shared/components/filters/FilterMenu";
import FilterPillGroup from "@/shared/components/filters/FilterPillGroup";
import Toolbar from "@/shared/components/Toolbar";
import DesignacionCursoFilters from "../../../components/DesignacionCursoFilters";
import DesignacionCursoTable from "../../../components/DesignacionTable/DesignacionCursoTable";
import { FILTROS_DESIGNACIONES } from "../../../constants";
import type { useDesignacionesPage } from "../../../hooks/pages/useDesignacionPage";
import { useCursoActiveFilters } from "../../../hooks/useCursoActiveFilters";

type Props = {
  vm: ReturnType<typeof useDesignacionesPage>;
};

export default function CursoDesignacionPage({ vm }: Props) {
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
      <DesignacionCursoTable
        query={vm.cursoQuery}
        onVerDetalle={vm.navigation.verDetalle}
      />
    </ToolbarPageLayout>
  );
}