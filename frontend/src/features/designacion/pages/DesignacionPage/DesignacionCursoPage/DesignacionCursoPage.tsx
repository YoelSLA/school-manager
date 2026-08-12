import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import { ActiveFilters, FilterMenu, FilterPillGroup } from "@/shared/components/Filter";
import { DesignacionCursoFilters, DesignacionCursoTable } from "../../../components/DesignacionPage";
import { FILTROS_DESIGNACIONES } from "../../../constants";
import { useCursoActiveFilters } from "../../../hooks";
import type { useDesignacionPage } from "../../../hooks/pages";

type Props = {
  vm: ReturnType<typeof useDesignacionPage>;
};

export default function DesignacionCursoPage({ vm }: Props) {
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