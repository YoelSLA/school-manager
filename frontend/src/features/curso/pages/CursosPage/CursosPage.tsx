import ToolbarPageLayout from "@/app/layouts/pages/ToolbarPageLayout";
import FilterPillGroup from "@/components/FilterPillGroup";
import Toolbar from "@/components/Toolbar";
import useCursosPage from "@/features/cursos/hooks/useCursosPage";
import CursosTable from "@/features/cursos/pages/CursosPage/CursosTable";
import CursoCreateModal from "../../components/CursoCreateModal";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";

export default function CursosPage() {
  const vm = useCursosPage();

  return (
    <>
      <ToolbarPageLayout
        toolbar={
          <Toolbar
            title="Cursos"
            headerCenter={
              <FilterPillGroup
                items={FILTROS_CURSOS}
                value={vm.filtro}
                onChange={vm.setFiltro}
              />
            }
            onRefresh={vm.query.refetch}
            isFetching={vm.query.isFetching}
            onCreate={vm.create.open}
            createLabel="Nuevo curso"
          />
        }
        page={vm.pagination.page}
        totalPages={vm.pagination.totalPages}
        onPageChange={vm.pagination.setPage}
      >
        <CursosTable
          query={vm.query}
          onVerDetalle={vm.navigation.verDetalle}
        />
      </ToolbarPageLayout>

      {vm.create.isOpen && (
        <CursoCreateModal
          onClose={vm.create.close}
          isSubmitting={vm.create.isPending}
          onSubmit={vm.create.submit}
        />
      )}
    </>
  );
}