import { ToolbarPageLayout } from "@/app/layouts/pages";
import { FilterPillGroup } from "@/shared/components/filters";
import Toolbar from "@/shared/components/Toolbar";
import CursoCreateModal from "../../components/CursoCreateModal";
import CursoTable from "../../components/CursoTable";
import { useCursosPage } from "../../hooks/pages";
import { FILTROS_CURSOS } from "../../utils/cursos.utils";

export default function CursoPage() {
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
        <CursoTable
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