import { ToolbarPageLayout } from "@/app/layouts/pages";
import { Toolbar } from "@/shared/components";
import {
  ActiveFilters,
  FilterMenu,
} from "@/shared/components/Filter";

import {
  AsistenciaFilters,
  AsistenciaTable,
  EmpleadoSearchBar,
} from "../../components";

import { useAsistenciaPage } from "../../hooks/pages";

import styles from "./AsistenciaPage.module.scss";

export default function AsistenciasPage() {
  const vm = useAsistenciaPage();

  const activeFilters = vm.roles
    .filter((rol) => rol.checked)
    .map((rol) => ({
      key: rol.id,
      label: rol.label,
      onRemove: () => vm.handleToggleRol(rol.id),
    }));

  const activeCount = activeFilters.length;

  return (
    <ToolbarPageLayout
      toolbar={
        <Toolbar
          title="Asistencias"
          headerCenter={
            <EmpleadoSearchBar
              value={vm.query}
              onChange={vm.setQuery}
            />
          }
          headerActions={
            <FilterMenu activeCount={activeCount}>
              <AsistenciaFilters
                roles={vm.roles}
                onToggle={vm.handleToggleRol}
                onClear={vm.handleClearFilters}
              />
            </FilterMenu>
          }
          footer={<ActiveFilters filters={activeFilters} />}
        />
      }
      page={vm.page}
      totalPages={vm.totalPages}
      onPageChange={vm.setPage}
    >
      <main className={styles.content}>
        <AsistenciaTable
          empleados={vm.hayRolesSeleccionados ? vm.empleados : []}
          isLoading={vm.isLoading}
          isError={vm.isError}
          onSelect={vm.handleSelectEmpleado}
        />
      </main>
    </ToolbarPageLayout>
  );
}