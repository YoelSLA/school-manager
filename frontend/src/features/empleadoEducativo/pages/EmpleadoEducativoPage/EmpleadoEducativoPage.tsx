import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import { FilterPillGroup } from "@/shared/components/filters";
import { EmpleadoSortDropdown } from "../../components";
import EmpleadoEducativoTable from "../../components/EmpleadoEducativoTable";
import { useEmpleadosEducativosPage } from "../../hooks/pages";
import { FILTROS_EMPLEADOS } from "../../utils/empleadosEducativos.utils";

export default function EmpleadoEducativoPage() {
  const vm = useEmpleadosEducativosPage();

  return (
    <ToolbarPageLayout
      toolbar={
        <Toolbar
          title="Empleados educativos"
          headerCenter={
            <FilterPillGroup
              items={FILTROS_EMPLEADOS}
              value={vm.filters.filtro}
              onChange={vm.filters.setFiltro}
            />
          }
          headerActions={
            <EmpleadoSortDropdown
              value={vm.filters.sort}
              onChange={vm.filters.setSort}
            />
          }
          onRefresh={vm.query.refetch}
          isFetching={vm.query.isFetching}
          onCreate={vm.navigation.crear}
          createLabel="Nuevo empleado"
        />
      }
      page={vm.pagination.page}
      totalPages={vm.pagination.totalPages}
      onPageChange={vm.pagination.setPage}
    >
      <EmpleadoEducativoTable
        query={vm.query}
        onVerDetalle={vm.navigation.verDetalle}
      />
    </ToolbarPageLayout>
  );
}