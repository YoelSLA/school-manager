import { useState } from "react";
import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import FilterPillGroup from "@/components/FilterPillGroup";
import Toolbar from "@/components/Toolbar";
import EmpleadosEducativosTable from "@/features/empleadosEducativos/pages/EmpleadosEducativosPage/EmpleadosEducativosTable";
import type { EmpleadoEducativoFiltro, SortState } from "@/shared/types";
import { usePagination } from "@/shared/utils/hooks/usePagination";
import EmpleadoSortDropdown from "../../components/EmpleadoSortDropdown";
import { useEmpleadoNavigation } from "../../hooks/navigation/useEmpleadoNavigation";
import { useEmpleadosEducativos } from "../../hooks/useEmpleadosEducativos";
import { FILTROS_EMPLEADOS } from "../../utils/empleadosEducativos.utils";

export default function EmpleadosEducativosPage() {
  const [filtro, setFiltro] = useState<EmpleadoEducativoFiltro>("TODOS");
  const [sort, setSort] = useState<SortState>({});

  const { page, setPage, pageSize } = usePagination([filtro, sort]);

  const query = useEmpleadosEducativos(
    filtro,
    page,
    pageSize,
    sort,
  );

  const empleadoNav = useEmpleadoNavigation();

  return (
    <ToolbarPageLayout
      toolbar={
        <Toolbar
          title="Empleados educativos"
          headerCenter={
            <FilterPillGroup
              items={FILTROS_EMPLEADOS}
              value={filtro}
              onChange={setFiltro}
            />
          }
          headerActions={
            <EmpleadoSortDropdown
              value={sort}
              onChange={setSort}
            />
          }
          onRefresh={query.refetch}
          isFetching={query.isFetching}
          onCreate={empleadoNav.crear}
          createLabel="Nuevo empleado"
        />
      }
      page={page}
      totalPages={query.data?.totalPages ?? 0}
      onPageChange={setPage}
    >
      <EmpleadosEducativosTable
        query={query}
        onVerDetalle={empleadoNav.verDetalle}
      />
    </ToolbarPageLayout>
  );
}